import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSheetMarkdown, renderTopicMarkdown } from '../scripts/build-sheets.mjs';

const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'arrays-hashing',
    patterns: ['hash-map'],
    sheets: ['blind75'],
    premium: false,
    url: 'https://leetcode.com/problems/two-sum/',
  },
  {
    id: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    topic: 'arrays-hashing',
    patterns: ['sorting'],
    sheets: ['blind75'],
    premium: true,
    url: 'https://leetcode.com/problems/meeting-rooms/',
  },
];

const topics = [
  { id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1, insight: 'Reach for a hash map.' },
];

test('renders a GitHub checkbox row with a working link', () => {
  const md = renderSheetMarkdown('Blind 75', problems);
  assert.match(md, /# Blind 75/);
  assert.match(md, /- \[ \] \[Two Sum\]\(https:\/\/leetcode\.com\/problems\/two-sum\/\)/);
  assert.match(md, /Easy/);
});

test('states the problem count so a reader knows the scope', () => {
  assert.match(renderSheetMarkdown('Blind 75', problems), /2 problems/);
  assert.match(renderSheetMarkdown('Blind 75', [problems[0]]), /1 problem\b/);
});

test('marks premium problems so nobody hits a paywall unwarned', () => {
  const md = renderSheetMarkdown('Blind 75', problems);
  assert.match(md, /Meeting Rooms.*premium/i);
  assert.doesNotMatch(md, /Two Sum.*premium/i);
});

test('an empty sheet renders without throwing', () => {
  assert.match(renderSheetMarkdown('Empty', []), /# Empty/);
});

test('the topic sheet carries the tier headings and the interview insight', () => {
  const md = renderTopicMarkdown(topics, problems);
  assert.match(md, /## Tier 1 — Foundations/);
  assert.match(md, /### Arrays & Hashing/);
  assert.match(md, /> Reach for a hash map\./);
  assert.match(md, /- \[ \] \[Two Sum\]/);
});

test('a topic with no problems is skipped in the topic sheet', () => {
  const withEmpty = [...topics, { id: 'tries', name: 'Tries', tier: 2, order: 9, insight: 'x' }];
  assert.doesNotMatch(renderTopicMarkdown(withEmpty, problems), /### Tries/);
});

test('generated files carry a do-not-edit banner', () => {
  assert.match(renderSheetMarkdown('Blind 75', problems), /GENERATED/);
  assert.match(renderTopicMarkdown(topics, problems), /GENERATED/);
});
