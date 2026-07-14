import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createProgress } from '../src/progress.js';

function fakeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
  };
}

test('starts empty', () => {
  const p = createProgress(fakeStorage());
  assert.equal(p.isSolved('two-sum'), false);
  assert.deepEqual(p.stats(), { solvedCount: 0, starredCount: 0 });
});

test('toggling solved persists and records a timestamp', () => {
  const storage = fakeStorage();
  const p = createProgress(storage);
  p.toggleSolved('two-sum');

  assert.equal(p.isSolved('two-sum'), true);
  assert.match(p.solvedAt('two-sum'), /^\d{4}-\d{2}-\d{2}T/);

  const reloaded = createProgress(storage);
  assert.equal(reloaded.isSolved('two-sum'), true, 'survives a reload');
});

test('toggling solved twice unsolves it', () => {
  const p = createProgress(fakeStorage());
  p.toggleSolved('two-sum');
  p.toggleSolved('two-sum');
  assert.equal(p.isSolved('two-sum'), false);
  assert.equal(p.solvedAt('two-sum'), null);
});

test('starring is independent of solving', () => {
  const p = createProgress(fakeStorage());
  p.toggleStarred('two-sum');
  assert.equal(p.isStarred('two-sum'), true);
  assert.equal(p.isSolved('two-sum'), false);
  assert.deepEqual(p.stats(), { solvedCount: 0, starredCount: 1 });
});

test('export round-trips through import', () => {
  const a = createProgress(fakeStorage());
  a.toggleSolved('two-sum');
  a.toggleStarred('valid-anagram');

  const b = createProgress(fakeStorage());
  assert.deepEqual(b.import(a.export()), { ok: true });
  assert.equal(b.isSolved('two-sum'), true);
  assert.equal(b.isStarred('valid-anagram'), true);
});

test('import rejects a malformed file rather than corrupting progress', () => {
  const p = createProgress(fakeStorage());
  p.toggleSolved('two-sum');

  const result = p.import({ nonsense: true });
  assert.equal(result.ok, false);
  assert.match(result.error, /version/i);
  assert.equal(p.isSolved('two-sum'), true, 'existing progress is untouched');
});

test('import rejects a file with the right version but the wrong shape', () => {
  const p = createProgress(fakeStorage());
  const result = p.import({ version: 1, solved: 'not-an-object', starred: [] });
  assert.equal(result.ok, false);
  assert.match(result.error, /solved|starred/i);
});

test('corrupt storage does not throw — it resets', () => {
  const p = createProgress(fakeStorage({ 'advancedsa.progress.v1': '{{{not json' }));
  assert.equal(p.isSolved('two-sum'), false);
});

test('an unknown problem id in an imported file is preserved, not dropped', () => {
  const p = createProgress(fakeStorage());
  p.import({ version: 1, solved: { 'some-future-problem': '2026-01-01T00:00:00Z' }, starred: [] });
  assert.equal(p.isSolved('some-future-problem'), true);
});
