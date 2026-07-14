/**
 * Guards the real content/ directory. These tests are what make it safe to hand-edit
 * markdown as a database: a typo fails here rather than silently vanishing a problem.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadContent } from '../scripts/parse-content.mjs';
import { validateData } from '../scripts/validate.mjs';

const CONTENT = new URL('../content/', import.meta.url);
const { topics, problems } = await loadContent(CONTENT);

test('content/ parses and passes every validation rule', () => {
  const { errors } = validateData(topics, problems, { checkSheetCounts: true });
  assert.deepEqual(errors, [], errors.join('\n'));
});

test('Blind 75 contains exactly 75 problems', () => {
  const blind = problems.filter((p) => p.sheets.includes('blind75'));
  assert.equal(blind.length, 75);
});

test('every problem id is unique', () => {
  const ids = problems.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every topic has at least one problem', () => {
  for (const t of topics) {
    const count = problems.filter((p) => p.topic === t.id).length;
    assert.ok(count > 0, `topic "${t.id}" has no problems`);
  }
});

test('topics form a contiguous roadmap ordering', () => {
  const orders = topics.map((t) => t.order);
  assert.deepEqual(orders, [...orders].sort((a, b) => a - b), 'topics must load in roadmap order');
  assert.equal(new Set(orders).size, orders.length, 'two topics share an order number');
});

test('within each topic, difficulty never goes backwards', () => {
  const RANK = { Easy: 0, Medium: 1, Hard: 2 };
  for (const t of topics) {
    const inTopic = problems.filter((p) => p.topic === t.id);
    for (let i = 1; i < inTopic.length; i++) {
      assert.ok(
        RANK[inTopic[i].difficulty] >= RANK[inTopic[i - 1].difficulty],
        `${t.id}: "${inTopic[i].title}" (${inTopic[i].difficulty}) comes after ` +
          `"${inTopic[i - 1].title}" (${inTopic[i - 1].difficulty}) — order must be Easy → Medium → Hard`,
      );
    }
  }
});

test('every problem links to LeetCode or GeeksforGeeks, matching its source', () => {
  for (const p of problems) {
    if (p.source === 'leetcode') {
      assert.match(p.url, /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/, `${p.id} has a bad LeetCode url`);
    } else if (p.source === 'gfg') {
      assert.match(p.url, /^https:\/\/(?:www\.)?geeksforgeeks\.org\//, `${p.id} has a bad GFG url`);
    } else {
      assert.fail(`${p.id} has an unknown source "${p.source}"`);
    }
  }
});

test('GFG problem ids are namespaced so they can never collide with a LeetCode slug', () => {
  for (const p of problems) {
    if (p.source === 'gfg') assert.match(p.id, /^gfg-/, `${p.id} should start with gfg-`);
    if (p.source === 'leetcode') assert.doesNotMatch(p.id, /^gfg-/);
  }
});
