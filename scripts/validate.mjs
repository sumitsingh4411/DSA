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

async function checkLinks(problems) {
  const errors = [];
  // Sequential and deliberate: LeetCode rate-limits, and a false 429 would be
  // indistinguishable from a genuinely dead link.
  for (const p of problems) {
    try {
      const res = await fetch(p.url, { method: 'GET', redirect: 'follow' });
      if (!res.ok) errors.push(`${p.id}: link returned HTTP ${res.status} — ${p.url}`);
    } catch (err) {
      errors.push(`${p.id}: link unreachable (${err.message}) — ${p.url}`);
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
    errors.push(...(await checkLinks(problems)));
  }

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) found:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log(`✓ ${problems.length} problems across ${topics.length} topics — all valid`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
