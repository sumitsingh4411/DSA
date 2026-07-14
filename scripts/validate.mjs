#!/usr/bin/env node
/**
 * The gate. content/*.md is hand-edited, so this is what stops a typo there
 * from reaching the site.
 */
import { loadContent } from './parse-content.mjs';

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);
const SHEET_SIZES = { blind75: 75 };

const LEETCODE_INDEX = 'https://leetcode.com/api/problems/all/';
const LEVEL = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

export function validateData(topics, problems, { checkSheetCounts = false } = {}) {
  const errors = [];
  const topicIds = new Set(topics.map((t) => t.id));
  const seen = new Set();

  for (const p of problems) {
    const where = p.id ?? p.title ?? '<unnamed>';

    if (seen.has(p.id)) errors.push(`duplicate id "${p.id}"`);
    seen.add(p.id);

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${where}: id must be kebab-case`);
    if (!topicIds.has(p.topic)) errors.push(`${where}: unknown topic "${p.topic}"`);
    if (!DIFFICULTIES.has(p.difficulty)) errors.push(`${where}: bad difficulty "${p.difficulty}"`);
    if (!/^https:\/\/\S+$/.test(p.url)) errors.push(`${where}: url must be https (got "${p.url}")`);
    if (!['leetcode', 'gfg'].includes(p.source)) errors.push(`${where}: unknown source "${p.source}"`);
    if (p.source === 'gfg' && p.premium) errors.push(`${where}: GFG problems are free — the 🔒 marker is wrong`);
  }

  for (const t of topics) {
    if (!t.insight || t.insight.length < 20) {
      errors.push(`topic "${t.id}": the insight blockquote is missing or too short to be useful`);
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

// LeetCode problems: fetching each page returns 403 — LeetCode blocks non-browser
// agents, which makes "did it 200?" useless. The public index is the real ground
// truth: whether a slug exists, and its true difficulty and paywall. GFG problems:
// the opposite — no bot-blocking, so a plain HTTP request is the honest check.
async function checkLinks(problems) {
  const errors = [];
  const leet = problems.filter((p) => p.source === 'leetcode');
  const gfg = problems.filter((p) => p.source === 'gfg');

  const res = await fetch(LEETCODE_INDEX);
  if (!res.ok) return [`could not reach the LeetCode index (HTTP ${res.status}) — cannot verify`];
  const body = await res.json();
  const canonical = new Map(
    body.stat_status_pairs.map((p) => [
      p.stat.question__title_slug,
      { difficulty: LEVEL[p.difficulty.level], premium: p.paid_only },
    ]),
  );

  for (const p of leet) {
    const real = canonical.get(p.id);
    if (!real) {
      errors.push(`${p.id}: no such problem on LeetCode — ${p.url}`);
      continue;
    }
    if (real.difficulty !== p.difficulty) {
      errors.push(`${p.id}: LeetCode says ${real.difficulty}, content/ says ${p.difficulty}`);
    }
    if (real.premium !== Boolean(p.premium)) {
      errors.push(`${p.id}: LeetCode says premium=${real.premium}, content/ says ${Boolean(p.premium)}`);
    }
  }

  // GFG in parallel, capped, so hundreds of links do not take minutes.
  const CONCURRENCY = 12;
  for (let i = 0; i < gfg.length; i += CONCURRENCY) {
    const batch = gfg.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (p) => {
        try {
          const r = await fetch(p.url, { method: 'GET', redirect: 'follow' });
          return r.ok ? null : `${p.id}: link returned HTTP ${r.status} — ${p.url}`;
        } catch (err) {
          return `${p.id}: link unreachable (${err.message}) — ${p.url}`;
        }
      }),
    );
    errors.push(...results.filter(Boolean));
  }

  return errors;
}

async function main() {
  const root = new URL('../', import.meta.url);
  const { topics, problems } = await loadContent(new URL('content/', root));

  const { errors } = validateData(topics, problems, { checkSheetCounts: true });
  if (process.argv.includes('--check-links')) {
    errors.push(...(await checkLinks(problems)));
  }

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) in content/:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log(`✓ ${problems.length} problems across ${topics.length} topics — content/ is valid`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
