import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTopicFile } from '../scripts/parse-content.mjs';

const FILE = `---
id: arrays-hashing
name: Arrays & Hashing
tier: 1
order: 1
---

> The warm-up round, and the one people underestimate.

| Problem | Difficulty | Patterns | Sheets |
| --- | --- | --- | --- |
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | hash-map | Blind 75 |
| [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) 🔒 | Medium | design | Blind 75, Striver SDE |
| [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) | Medium | hash-set, matrix | |
`;

test('reads the topic metadata out of the frontmatter', () => {
  const { topic } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.equal(topic.id, 'arrays-hashing');
  assert.equal(topic.name, 'Arrays & Hashing');
  assert.equal(topic.tier, 1);
  assert.equal(topic.order, 1);
});

test('reads the insight from the blockquote', () => {
  const { topic } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.equal(topic.insight, 'The warm-up round, and the one people underestimate.');
});

test('derives a stable id from the leetcode slug', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.deepEqual(problems.map((p) => p.id), ['two-sum', 'encode-and-decode-strings', 'valid-sudoku']);
});

test('reads title, difficulty and url', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.equal(problems[0].title, 'Two Sum');
  assert.equal(problems[0].difficulty, 'Easy');
  assert.equal(problems[0].url, 'https://leetcode.com/problems/two-sum/');
});

test('every problem carries the topic id of the file it came from', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.ok(problems.every((p) => p.topic === 'arrays-hashing'));
});

test('splits comma-separated patterns, and an empty cell means none', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.deepEqual(problems[2].patterns, ['hash-set', 'matrix']);
  assert.deepEqual(problems[0].patterns, ['hash-map']);
});

test('maps sheet labels back to ids, and an empty cell means no sheets', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.deepEqual(problems[0].sheets, ['blind75']);
  assert.deepEqual(problems[1].sheets, ['blind75', 'striver-sde']);
  assert.deepEqual(problems[2].sheets, []);
});

test('the lock marker means premium', () => {
  const { problems } = parseTopicFile(FILE, 'arrays-hashing.md');
  assert.equal(problems[1].premium, true);
  assert.equal(problems[1].title, 'Encode and Decode Strings', 'the marker is not part of the title');
  assert.equal(problems[0].premium, false);
});

/* ---- the failure modes that matter: markdown is a fragile database, so it
        must break loudly rather than silently drop a row. ---- */

test('a missing frontmatter block is a hard error', () => {
  assert.throws(() => parseTopicFile('no frontmatter here', 'bad.md'), /frontmatter/i);
});

test('an unknown difficulty is a hard error, naming the file and the problem', () => {
  const bad = FILE.replace('| Easy |', '| Spicy |');
  assert.throws(() => parseTopicFile(bad, 'arrays-hashing.md'), /Spicy|difficulty/i);
});

test('an unknown sheet label is a hard error rather than a silently dropped tag', () => {
  const bad = FILE.replace('| Blind 75 |', '| Blnid 75 |');
  assert.throws(() => parseTopicFile(bad, 'arrays-hashing.md'), /Blnid 75|sheet/i);
});

test('a row that is not a leetcode link is a hard error', () => {
  const bad = FILE.replace('[Two Sum](https://leetcode.com/problems/two-sum/)', 'Two Sum');
  assert.throws(() => parseTopicFile(bad, 'arrays-hashing.md'), /link|url/i);
});

test('a row with the wrong number of columns is a hard error', () => {
  const bad = FILE.replace('| [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) | Medium | hash-set, matrix | |', '| [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) | Medium |');
  assert.throws(() => parseTopicFile(bad, 'arrays-hashing.md'), /column/i);
});

test('a file with no table yields no problems but still yields the topic', () => {
  const noTable = `---
id: tries
name: Tries
tier: 2
order: 9
---

> A narrow topic.
`;
  const { topic, problems } = parseTopicFile(noTable, 'tries.md');
  assert.equal(topic.id, 'tries');
  assert.deepEqual(problems, []);
});
