import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyFilters, emptyFilterState } from '../assets/filters.js';

const problems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topic: 'arrays-hashing', patterns: ['hash-map'], sheets: ['blind75'] },
  { id: 'group-anagrams', title: 'Group Anagrams', difficulty: 'Medium', topic: 'arrays-hashing', patterns: ['hash-map'], sheets: ['blind75'] },
  { id: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'binary-search', patterns: ['binary-search'], sheets: [] },
];

const progress = {
  isSolved: (id) => id === 'two-sum',
  isStarred: (id) => id === 'group-anagrams',
};

const ids = (list) => list.map((p) => p.id);

test('the empty state matches everything', () => {
  assert.deepEqual(ids(applyFilters(problems, emptyFilterState(), progress)), ids(problems));
});

test('search matches title, case-insensitively', () => {
  const state = { ...emptyFilterState(), search: 'ANAGRAM' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('search also matches a pattern tag', () => {
  const state = { ...emptyFilterState(), search: 'hash-map' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum', 'group-anagrams']);
});

test('whitespace-only search is treated as no search', () => {
  const state = { ...emptyFilterState(), search: '   ' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ids(problems));
});

test('difficulty filter is a union of the selected difficulties', () => {
  const state = { ...emptyFilterState(), difficulty: new Set(['Easy', 'Hard']) };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum', 'median-of-two-sorted-arrays']);
});

test('sheet filter narrows to one sheet', () => {
  const state = { ...emptyFilterState(), sheet: 'blind75' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum', 'group-anagrams']);
});

test('status unsolved excludes solved problems', () => {
  const state = { ...emptyFilterState(), status: 'unsolved' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams', 'median-of-two-sorted-arrays']);
});

test('status solved keeps only solved problems', () => {
  const state = { ...emptyFilterState(), status: 'solved' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum']);
});

test('status starred keeps only starred problems', () => {
  const state = { ...emptyFilterState(), status: 'starred' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('filters combine with AND', () => {
  const state = {
    ...emptyFilterState(),
    sheet: 'blind75',
    status: 'unsolved',
    difficulty: new Set(['Medium']),
  };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('no match returns an empty array, not an error', () => {
  const state = { ...emptyFilterState(), search: 'quantum entanglement' };
  assert.deepEqual(applyFilters(problems, state, progress), []);
});

test('input order is preserved', () => {
  const state = { ...emptyFilterState(), difficulty: new Set(['Easy', 'Medium', 'Hard']) };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ids(problems));
});
