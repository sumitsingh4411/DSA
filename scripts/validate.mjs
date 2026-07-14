#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);
const REQUIRED = ['id', 'title', 'difficulty', 'topic', 'patterns', 'sheets', 'url'];

// A sheet with a canonical, fixed size. Guards against silent omissions.
const SHEET_SIZES = { blind75: 75 };

export function validateData(topics, problems, { checkSheetCounts = false } = {}) {
  const errors = [];
  const topicIds = new Set(topics.map((t) => t.id));
  const seen = new Set();

  for (const p of problems) {
    const where = p.id ?? p.title ?? '<unnamed>';

    for (const field of REQUIRED) {
      if (p[field] === undefined) errors.push(`${where}: missing required field "${field}"`);
    }
    if (p.id !== undefined) {
      if (seen.has(p.id)) errors.push(`duplicate id "${p.id}"`);
      seen.add(p.id);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${where}: id must be kebab-case`);
    }
    if (p.topic !== undefined && !topicIds.has(p.topic)) {
      errors.push(`${where}: unknown topic "${p.topic}"`);
    }
    if (p.difficulty !== undefined && !DIFFICULTIES.has(p.difficulty)) {
      errors.push(`${where}: difficulty must be Easy, Medium or Hard (got "${p.difficulty}")`);
    }
    if (p.url !== undefined && !/^https:\/\/\S+$/.test(p.url)) {
      errors.push(`${where}: url must be an https URL (got "${p.url}")`);
    }
    if (p.patterns !== undefined && !Array.isArray(p.patterns)) {
      errors.push(`${where}: patterns must be an array`);
    }
    if (p.sheets !== undefined && !Array.isArray(p.sheets)) {
      errors.push(`${where}: sheets must be an array`);
    }
  }

  if (checkSheetCounts) {
    for (const [sheet, expected] of Object.entries(SHEET_SIZES)) {
      const got = problems.filter((p) => p.sheets?.includes(sheet)).length;
      if (got !== expected) {
        errors.push(`sheet "${sheet}": expected ${expected} problems, got ${got}`);
      }
    }
  }

  return { errors };
}

const LEETCODE_INDEX = 'https://leetcode.com/api/problems/all/';
const LEVEL = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

// Fetching each problem page directly returns 403 — LeetCode blocks non-browser
// agents, which makes "did it 200?" useless as a signal. The public problem index
// is the actual ground truth: it tells us whether a slug exists at all, and what
// its real title and difficulty are.
async function checkAgainstLeetCode(problems) {
  const errors = [];
  const res = await fetch(LEETCODE_INDEX);
  if (!res.ok) {
    return [`could not reach the LeetCode problem index (HTTP ${res.status}) — cannot verify links`];
  }

  const body = await res.json();
  const canonical = new Map(
    body.stat_status_pairs.map((p) => [
      p.stat.question__title_slug,
      { difficulty: LEVEL[p.difficulty.level], premium: p.paid_only },
    ]),
  );

  for (const p of problems) {
    const real = canonical.get(p.id);
    if (!real) {
      errors.push(`${p.id}: no such problem on LeetCode — ${p.url}`);
      continue;
    }
    if (real.difficulty !== p.difficulty) {
      errors.push(`${p.id}: difficulty is ${real.difficulty} on LeetCode, we say ${p.difficulty}`);
    }
    if (real.premium !== Boolean(p.premium)) {
      errors.push(
        `${p.id}: premium flag is wrong (LeetCode says premium=${real.premium}, we say ${Boolean(p.premium)})`,
      );
    }
  }
  return errors;
}

async function main() {
  const root = new URL('../', import.meta.url);
  const topics = JSON.parse(await readFile(new URL('data/topics.json', root), 'utf8'));
  const problems = JSON.parse(await readFile(new URL('data/problems.json', root), 'utf8'));

  const { errors } = validateData(topics, problems, { checkSheetCounts: true });
  if (process.argv.includes('--check-links')) {
    errors.push(...(await checkAgainstLeetCode(problems)));
  }

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) found:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log(`✓ ${problems.length} problems across ${topics.length} topics — all valid`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
