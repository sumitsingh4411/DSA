import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByTopic, groupBySheet, SHEETS } from '../src/data.js';

const topics = [
  { id: 'graphs', name: 'Graphs', tier: 3, order: 12 },
  { id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1 },
  { id: 'tries', name: 'Tries', tier: 2, order: 9 },
];

const problems = [
  { id: 'num-islands', difficulty: 'Medium', topic: 'graphs', sheets: ['blind75'] },
  { id: 'group-anagrams', difficulty: 'Medium', topic: 'arrays-hashing', sheets: ['blind75'] },
  { id: 'two-sum', difficulty: 'Easy', topic: 'arrays-hashing', sheets: [] },
];

const progress = { isSolved: (id) => id === 'two-sum', isStarred: () => false };

test('topics come back in roadmap order, not input order', () => {
  const groups = groupByTopic(problems, topics, progress);
  assert.deepEqual(groups.map((g) => g.topic.id), ['arrays-hashing', 'graphs']);
});

test('a topic with no problems is omitted', () => {
  const groups = groupByTopic(problems, topics, progress);
  assert.equal(groups.find((g) => g.topic.id === 'tries'), undefined);
});

test('problems within a topic are Easy-first', () => {
  const groups = groupByTopic(problems, topics, progress);
  assert.deepEqual(groups[0].problems.map((p) => p.id), ['two-sum', 'group-anagrams']);
});

test('each group reports how many of its problems are solved', () => {
  const groups = groupByTopic(problems, topics, progress);
  assert.equal(groups[0].solvedCount, 1);
  assert.equal(groups[0].problems.length, 2);
  assert.equal(groups[1].solvedCount, 0);
});

test('groupBySheet only returns sheets that have problems', () => {
  const groups = groupBySheet(problems, topics, progress);
  assert.deepEqual(groups.map((g) => g.id), ['blind75']);
  assert.equal(groups[0].label, 'Blind 75');
  assert.equal(groups[0].problems.length, 2);
  assert.equal(groups[0].solvedCount, 0);
});

test('SHEETS maps every sheet id to a human label', () => {
  assert.equal(SHEETS.blind75, 'Blind 75');
  assert.equal(SHEETS['striver-sde'], 'Striver SDE');
  assert.equal(SHEETS['love-babbar'], 'Love Babbar');
});
