import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  groupByTopic,
  trackProblems,
  sheetTracks,
  isEssential,
  SHEETS,
  ESSENTIAL_ID,
  MIX_ID,
} from '../src/data.js';

const topics = [
  { id: 'graphs', name: 'Graphs', tier: 3, order: 12 },
  { id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1 },
  { id: 'tries', name: 'Tries', tier: 2, order: 9 },
];

const problems = [
  { id: 'num-islands', difficulty: 'Medium', topic: 'graphs', sheets: ['blind75', 'neetcode-150', 'striver-sde'] },
  { id: 'group-anagrams', difficulty: 'Medium', topic: 'arrays-hashing', sheets: ['blind75', 'neetcode-150'] },
  { id: 'two-sum', difficulty: 'Easy', topic: 'arrays-hashing', sheets: ['love-babbar'] },
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
  assert.equal(groups[1].solvedCount, 0);
});

test('the Mix track is every problem', () => {
  assert.equal(trackProblems(problems, MIX_ID).length, 3);
});

test('a sheet track is only that sheet', () => {
  assert.deepEqual(trackProblems(problems, 'blind75').map((p) => p.id), ['num-islands', 'group-anagrams']);
  assert.deepEqual(trackProblems(problems, 'love-babbar').map((p) => p.id), ['two-sum']);
});

test('Essential = on three or more sheets', () => {
  assert.equal(isEssential(problems[0]), true, 'num-islands is on 3 sheets');
  assert.equal(isEssential(problems[1]), false, 'group-anagrams is on 2');
  assert.deepEqual(trackProblems(problems, ESSENTIAL_ID).map((p) => p.id), ['num-islands']);
});

test('sheetTracks lists Essential first, then every sheet, each with live counts', () => {
  const tracks = sheetTracks(problems, progress);
  assert.equal(tracks[0].id, ESSENTIAL_ID);
  assert.deepEqual(tracks.map((t) => t.id), [
    'essential',
    'blind75',
    'neetcode-150',
    'striver-sde',
    'love-babbar',
  ]);
  const babbar = tracks.find((t) => t.id === 'love-babbar');
  assert.equal(babbar.total, 1);
  assert.equal(babbar.solvedCount, 1);
});

test('every sheet has a label, a short monogram, and a blurb', () => {
  for (const [id, meta] of Object.entries(SHEETS)) {
    assert.ok(meta.label, `${id} needs a label`);
    assert.ok(meta.short, `${id} needs a short monogram`);
    assert.ok(meta.blurb, `${id} needs a blurb`);
  }
  assert.equal(SHEETS.blind75.label, 'Blind 75');
  assert.equal(SHEETS['neetcode-150'].short, 'N150');
});
