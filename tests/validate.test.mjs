import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateData } from '../scripts/validate.mjs';

const topics = [{ id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1, insight: 'x' }];

const good = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  topic: 'arrays-hashing',
  patterns: ['hash-map'],
  sheets: ['blind75'],
  url: 'https://leetcode.com/problems/two-sum/',
};

test('valid data produces no errors', () => {
  assert.deepEqual(validateData(topics, [good]).errors, []);
});

test('duplicate ids are rejected', () => {
  const { errors } = validateData(topics, [good, { ...good, title: 'Copy' }]);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /duplicate id.*two-sum/i);
});

test('unknown topic is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, topic: 'quantum-computing' }]);
  assert.match(errors[0], /unknown topic.*quantum-computing/i);
});

test('bad difficulty is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, difficulty: 'Spicy' }]);
  assert.match(errors[0], /difficulty/i);
});

test('malformed url is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, url: 'not-a-url' }]);
  assert.match(errors[0], /url/i);
});

test('missing required field is rejected', () => {
  const { title, ...noTitle } = good;
  const { errors } = validateData(topics, [noTitle]);
  assert.match(errors[0], /title/i);
});

test('id must be kebab-case', () => {
  const { errors } = validateData(topics, [{ ...good, id: 'Two_Sum' }]);
  assert.match(errors[0], /kebab-case/i);
});

test('blind75 sheet must contain exactly 75 problems', () => {
  const { errors } = validateData(topics, [good], { checkSheetCounts: true });
  assert.match(
    errors.find((e) => /blind75/.test(e)),
    /expected 75.*got 1/i,
  );
});
