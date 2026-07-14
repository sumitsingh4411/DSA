#!/usr/bin/env node
/**
 * content/*.md is the source of truth. This turns it into data.
 *
 * Markdown is a fragile thing to use as a database — a stray pipe or a typo in
 * a sheet name would otherwise vanish a problem without a word. So every parse
 * failure here throws, loudly, naming the file and the row. Nothing is skipped.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';

export const SHEET_IDS = {
  'Blind 75': 'blind75',
  'Striver SDE': 'striver-sde',
  'Love Babbar': 'love-babbar',
};

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);
const PREMIUM_MARK = '🔒';
const COLUMNS = 4; // Problem | Difficulty | Patterns | Sheets

// A problem links to LeetCode or to GeeksforGeeks — Striver and Love Babbar both
// draw heavily on GFG, so LeetCode-only would silently drop most of those sheets.
const LEETCODE = /^https:\/\/leetcode\.com\/problems\/([a-z0-9-]+)\/?$/;
const GFG = /^https:\/\/(?:www\.|practice\.)?geeksforgeeks\.org\/[^\s)]+$/;
const MD_LINK = /^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/;

// The id is the problem's identity across sheets, so it must be stable and it must
// not collide. LeetCode problems key on their slug (unchanged since v1, so existing
// progress survives). GFG problems key on a slug derived from their URL, namespaced
// with a gfg- prefix so a LeetCode and a GFG problem can never clash.
function identify(url, file, rowNumber, fail) {
  const lc = LEETCODE.exec(url);
  if (lc) return { id: lc[1], source: 'leetcode', url: url.replace(/\/?$/, '/') };

  if (GFG.test(url)) {
    // Practice URLs look like .../problems/<slug>/1 — the trailing "1" is the
    // difficulty tier, not part of the identity. Take the last segment that
    // isn't a bare number, then strip GFG's trailing numeric id noise.
    const segments = url
      .replace(/^https:\/\/(?:www\.|practice\.)?geeksforgeeks\.org\//, '')
      .replace(/\/+$/, '')
      .split('/')
      .filter((s) => s && !/^\d+$/.test(s));
    const tail = segments.pop() ?? 'unknown';
    const slug = tail
      .replace(/\d+$/, '') // drop GFG's numeric suffix (e.g. chocolate-distribution-problem3825)
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
    return { id: `gfg-${slug}`, source: 'gfg', url };
  }

  fail(file, rowNumber, `link must be a LeetCode or GeeksforGeeks URL — got "${url}"`);
}

class ContentError extends Error {}

function fail(file, row, message) {
  const where = row === null ? file : `${file}, row ${row}`;
  throw new ContentError(`${where}: ${message}`);
}

function parseFrontmatter(text, file) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) fail(file, null, 'missing the --- frontmatter block at the top of the file');

  const fields = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }

  for (const key of ['id', 'name', 'tier', 'order']) {
    if (!fields[key]) fail(file, null, `frontmatter is missing "${key}"`);
  }

  return {
    id: fields.id,
    name: fields.name,
    tier: Number(fields.tier),
    order: Number(fields.order),
    rest: text.slice(match[0].length),
  };
}

function parseInsight(body, file) {
  const match = /^>\s*(.+(?:\n>\s*.+)*)/m.exec(body);
  if (!match) fail(file, null, 'missing the "> ..." blockquote holding the topic insight');
  return match[1]
    .split('\n')
    .map((l) => l.replace(/^>\s*/, '').trim())
    .join(' ')
    .trim();
}

function splitRow(line) {
  // Drop the leading and trailing pipe, then split. Cells cannot contain a
  // literal pipe — markdown tables cannot represent one without escaping, and
  // no problem title needs it.
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

function parseProblemRow(line, topicId, file, rowNumber) {
  const cells = splitRow(line);
  if (cells.length !== COLUMNS) {
    fail(file, rowNumber, `expected ${COLUMNS} columns, found ${cells.length} — "${line.trim()}"`);
  }

  let [problemCell, difficulty, patternCell, sheetCell] = cells;

  const premium = problemCell.includes(PREMIUM_MARK);
  problemCell = problemCell.replaceAll(PREMIUM_MARK, '').trim();

  const link = MD_LINK.exec(problemCell);
  if (!link) {
    fail(file, rowNumber, `the Problem cell must be a markdown link [title](url) — got "${problemCell}"`);
  }
  const [, title, rawUrl] = link;
  const { id, source, url } = identify(rawUrl, file, rowNumber, fail);

  if (!DIFFICULTIES.has(difficulty)) {
    fail(file, rowNumber, `difficulty must be Easy, Medium or Hard — got "${difficulty}"`);
  }

  const patterns = patternCell
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const sheets = sheetCell
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((label) => {
      const id = SHEET_IDS[label];
      if (!id) {
        fail(file, rowNumber, `unknown sheet "${label}" — expected one of ${Object.keys(SHEET_IDS).join(', ')}`);
      }
      return id;
    });

  return { id, title, difficulty, topic: topicId, patterns, sheets, source, premium, url };
}

export function parseTopicFile(text, file) {
  const { id, name, tier, order, rest } = parseFrontmatter(text, file);
  const insight = parseInsight(rest, file);

  const lines = rest.split('\n');
  const problems = [];
  let inTable = false;

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      inTable = false;
      return;
    }
    // The header row and its |---|---| separator are structure, not data.
    if (/^\|[\s|:-]+\|$/.test(trimmed)) {
      inTable = true;
      return;
    }
    if (!inTable) return; // this is the header row itself
    problems.push(parseProblemRow(trimmed, id, file, i + 1));
  });

  return { topic: { id, name, tier, order, insight }, problems };
}

export async function loadContent(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();

  const topics = [];
  const problems = [];

  for (const file of files) {
    const text = await readFile(new URL(file, dir), 'utf8');
    const parsed = parseTopicFile(text, file);
    topics.push(parsed.topic);
    problems.push(...parsed.problems);
  }

  const seen = new Map();
  for (const p of problems) {
    if (seen.has(p.id)) {
      throw new ContentError(`"${p.id}" appears in both ${seen.get(p.id)} and ${p.topic} — a problem belongs to exactly one topic`);
    }
    seen.set(p.id, p.topic);
  }

  topics.sort((a, b) => a.tier - b.tier || a.order - b.order);
  return { topics, problems };
}

async function main() {
  const root = new URL('../', import.meta.url);
  const { topics, problems } = await loadContent(new URL('content/', root));

  const banner = `// GENERATED from content/*.md by scripts/parse-content.mjs — do not edit.\n// Run \`npm run build:data\` after changing any file in content/.\n`;
  const body =
    `${banner}\nexport const topics = ${JSON.stringify(topics, null, 2)};\n\n` +
    `export const problems = ${JSON.stringify(problems, null, 2)};\n`;

  await writeFile(new URL('src/content.generated.js', root), body);
  console.log(`✓ src/content.generated.js — ${problems.length} problems across ${topics.length} topics`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
