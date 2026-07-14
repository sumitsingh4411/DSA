import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextProblems, roadmapOrder } from '../assets/recommend.js';

const topics = [
  { id: 'arrays-hashing', tier: 1, order: 1 },
  { id: 'binary-search', tier: 1, order: 5 },
  { id: 'graphs', tier: 3, order: 12 },
];

const problems = [
  { id: 'num-islands', difficulty: 'Medium', topic: 'graphs', sheets: ['blind75'] },
  { id: 'binary-search', difficulty: 'Easy', topic: 'binary-search', sheets: [] },
  { id: 'contains-duplicate', difficulty: 'Easy', topic: 'arrays-hashing', sheets: [] },
  { id: 'two-sum', difficulty: 'Easy', topic: 'arrays-hashing', sheets: ['blind75'] },
  { id: 'group-anagrams', difficulty: 'Medium', topic: 'arrays-hashing', sheets: ['blind75'] },
];

function stubProgress({ solved = {}, starred = [] } = {}) {
  return {
    isSolved: (id) => id in solved,
    isStarred: (id) => starred.includes(id),
    solvedAt: (id) => solved[id] ?? null,
  };
}

const ids = (list) => list.map((p) => p.id);

test('roadmapOrder sorts by tier, then topic order, then difficulty', () => {
  assert.deepEqual(ids(roadmapOrder(problems, topics)), [
    'two-sum',
    'contains-duplicate',
    'group-anagrams',
    'binary-search',
    'num-islands',
  ]);
});

test('a Blind 75 problem wins a tie at the same topic and difficulty', () => {
  const ordered = roadmapOrder(problems, topics);
  assert.equal(ordered[0].id, 'two-sum', 'two-sum is on Blind 75, contains-duplicate is not');
});

test('a beginner is pointed at the very first roadmap problem', () => {
  const result = nextProblems(problems, topics, stubProgress());
  assert.equal(result[0].id, 'two-sum');
});

test('returns exactly `count` problems, in roadmap order', () => {
  const result = nextProblems(problems, topics, stubProgress(), 3);
  assert.deepEqual(ids(result), ['two-sum', 'contains-duplicate', 'group-anagrams']);
});

test('solved problems are skipped', () => {
  const progress = stubProgress({
    solved: { 'two-sum': '2026-01-01T00:00:00Z', 'contains-duplicate': '2026-01-02T00:00:00Z' },
  });
  assert.deepEqual(ids(nextProblems(problems, topics, progress, 2)), ['group-anagrams', 'binary-search']);
});

test('later tiers come after earlier tiers', () => {
  const result = nextProblems(problems, topics, stubProgress(), 5);
  assert.equal(result.at(-1).id, 'num-islands', 'the tier-3 graph problem is last');
});

test('when everything is solved, starred problems come back for revision, least recent first', () => {
  const solved = {
    'num-islands': '2026-01-01T00:00:00Z',
    'binary-search': '2026-01-02T00:00:00Z',
    'contains-duplicate': '2026-01-03T00:00:00Z',
    'two-sum': '2026-01-04T00:00:00Z',
    'group-anagrams': '2026-01-05T00:00:00Z',
  };
  const progress = stubProgress({ solved, starred: ['group-anagrams', 'two-sum'] });
  assert.deepEqual(ids(nextProblems(problems, topics, progress, 3)), ['two-sum', 'group-anagrams']);
});

test('everything solved and nothing starred returns an empty list', () => {
  const solved = Object.fromEntries(problems.map((p) => [p.id, '2026-01-01T00:00:00Z']));
  assert.deepEqual(nextProblems(problems, topics, stubProgress({ solved }), 3), []);
});

test('a problem in an unknown topic sinks to the end rather than throwing', () => {
  const orphan = { id: 'orphan', difficulty: 'Easy', topic: 'nonexistent', sheets: [] };
  const ordered = roadmapOrder([...problems, orphan], topics);
  assert.equal(ordered.at(-1).id, 'orphan');
});
