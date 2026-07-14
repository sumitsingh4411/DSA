import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateData } from '../scripts/validate.mjs';

// Required-field and shape errors are caught earlier, by the parser, which throws.
// validateData handles what survives parsing but is still wrong: bad references,
// bad values, and sheets that have lost a problem.

const topics = [
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    tier: 1,
    order: 1,
    insight: 'Interviewers check whether you reach for a hash map before a nested loop.',
  },
];

const good = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  topic: 'arrays-hashing',
  patterns: ['hash-map'],
  sheets: ['blind75'],
  premium: false,
  url: 'https://leetcode.com/problems/two-sum/',
};

test('valid data produces no errors', () => {
  assert.deepEqual(validateData(topics, [good]).errors, []);
});

test('duplicate ids are rejected', () => {
  const { errors } = validateData(topics, [good, { ...good, title: 'Copy' }]);
  assert.match(errors[0], /duplicate id.*two-sum/i);
});

test('a problem pointing at a topic that does not exist is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, topic: 'quantum-computing' }]);
  assert.match(errors[0], /unknown topic.*quantum-computing/i);
});

test('bad difficulty is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, difficulty: 'Spicy' }]);
  assert.match(errors[0], /difficulty/i);
});

test('a non-https url is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, url: 'http://leetcode.com/problems/two-sum/' }]);
  assert.match(errors[0], /https/i);
});

test('an id that is not kebab-case is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, id: 'Two_Sum' }]);
  assert.match(errors[0], /kebab-case/i);
});

test('a topic whose insight is missing or a stub is rejected', () => {
  const stub = [{ ...topics[0], insight: 'x' }];
  const { errors } = validateData(stub, [good]);
  assert.match(errors[0], /insight/i);
});

test('blind75 losing a problem is caught by the sheet-count check', () => {
  const { errors } = validateData(topics, [good], { checkSheetCounts: true });
  assert.match(
    errors.find((e) => /blind75/.test(e)),
    /expected 75.*got 1/i,
  );
});
