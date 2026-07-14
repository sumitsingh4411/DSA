# Advancedsa DSA Prep Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, zero-build DSA interview-prep tracker published on GitHub Pages, plus generated markdown study sheets — both derived from one `data/problems.json` source of truth.

**Architecture:** `data/problems.json` + `data/topics.json` are the only sources of truth. Node scripts (`validate.mjs`, `build-sheets.mjs`) are developer tools that gate and generate. The site is vanilla ES modules with pure, node-testable logic (`progress`, `filters`, `recommend`) separated from the single DOM-touching module (`ui`).

**Tech Stack:** HTML, CSS, vanilla JavaScript (ES modules). Node 18+ with `node:test` for tests and scripts. No runtime dependencies, no bundler, no framework.

## Global Constraints

- **Zero runtime dependencies.** `index.html` must work when double-clicked from disk. No CDN, no npm package at runtime.
- **`data/problems.json` is the single source of truth.** `sheets/*.md` are build artifacts — never hand-edit them.
- **Problem `id` is permanent.** Progress is keyed on it; changing a shipped `id` silently destroys user progress.
- **No problem ships with an unverified link.** `scripts/validate.mjs --check-links` must pass.
- **Difficulty is exactly one of** `Easy`, `Medium`, `Hard`.
- **Storage key is** `advancedsa.progress.v1`.
- **Every pure module takes its dependencies as arguments** (notably: `progress.js` receives a storage object) so it can be tested in Node without a browser.
- Tests run with `node --test`. No test framework is to be installed.

---

## File Structure

| File | Responsibility |
|---|---|
| `data/topics.json` | Roadmap: topic ids, names, tiers, order, interview insight |
| `data/problems.json` | Every problem record |
| `scripts/validate.mjs` | Data integrity gate (ids, topics, difficulty, URLs, sheet counts) |
| `scripts/build-sheets.mjs` | Generates `sheets/*.md` from the data |
| `assets/progress.js` | localStorage read/write, export/import. Only module touching storage |
| `assets/filters.js` | Pure: (problems, filterState) → problems to show |
| `assets/recommend.js` | Pure: "your next 3 problems" rule |
| `assets/data.js` | Loads + indexes the JSON. No DOM |
| `assets/ui.js` | Rendering + events. Only module touching the DOM |
| `assets/app.js` | Wires modules together, owns filter state |
| `assets/app.css` | All styling |
| `index.html` | The page shell |
| `tests/*.test.mjs` | Node tests for the pure modules |
| `README.md` | Repo front door |

---

### Task 1: Data schema + validation gate

Build the gate before the data, so bad data can never enter the repo.

**Files:**
- Create: `data/topics.json`
- Create: `scripts/validate.mjs`
- Test: `tests/validate.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `validateData(topics, problems) -> { errors: string[] }` exported from `scripts/validate.mjs`. Returns an empty `errors` array when data is valid. The module also runs as a CLI when invoked directly.

- [ ] **Step 1: Write `data/topics.json`**

All 22 topics, in roadmap order. `order` is explicit so the file can be reordered safely.

```json
[
  { "id": "arrays-hashing", "name": "Arrays & Hashing", "tier": 1, "order": 1,
    "insight": "The warm-up round, and the one people underestimate. Interviewers are checking whether you reach for a hash map before a nested loop. Almost every optimisation here is 'trade memory for time' — say that out loud and you have shown the instinct they are testing." },
  { "id": "two-pointers", "name": "Two Pointers", "tier": 1, "order": 2,
    "insight": "Tests whether you notice that a sorted array lets you discard half the search space per step. The tell is a problem asking for a pair or a triplet under a constraint. If you sort first, justify the O(n log n) — they will ask." },
  { "id": "sliding-window", "name": "Sliding Window", "tier": 1, "order": 3,
    "insight": "The interviewer wants to see you convert an O(n*k) recomputation into an O(n) amortised scan. Fixed-size windows are mechanical; variable-size windows, where you shrink from the left on a violated constraint, are where candidates fall apart." },
  { "id": "stack", "name": "Stack", "tier": 1, "order": 4,
    "insight": "Stack problems are pattern-recognition problems. 'Next greater element', valid parentheses, and expression evaluation are all the same skill: knowing that the thing you need later is the thing you saw most recently. Monotonic stacks are the advanced form and appear often at senior level." },
  { "id": "binary-search", "name": "Binary Search", "tier": 1, "order": 5,
    "insight": "Everyone can binary search a sorted array. The interview version is 'binary search the answer' — searching over a range of possible answers rather than over the input. Getting the boundary conditions right, first try, without an off-by-one, is a real signal of care." },
  { "id": "prefix-sum", "name": "Prefix Sum", "tier": 1, "order": 6,
    "insight": "A cheap trick with an enormous payoff: precompute cumulative sums so any range query becomes O(1). Combined with a hash map it solves a whole family of subarray-sum problems that look much harder than they are." },
  { "id": "linked-list", "name": "Linked List", "tier": 2, "order": 7,
    "insight": "Rarely used in real work, reliably used in interviews, because pointer manipulation has nowhere to hide. Fast/slow pointers, reversal in place, and dummy-head nodes cover most of it. Draw the pointers on the whiteboard — interviewers reward it." },
  { "id": "trees", "name": "Trees", "tier": 2, "order": 8,
    "insight": "The highest-yield topic in the whole list. Nearly every tree problem is a traversal in disguise, so the question is really 'do you know what to compute on the way down versus on the way back up'. Master recursion here and graphs get much easier." },
  { "id": "tries", "name": "Tries", "tier": 2, "order": 9,
    "insight": "A narrow topic with an outsized presence at Google and Amazon, because autocomplete and prefix search are their bread and butter. If a problem mentions prefixes or a dictionary of words, the trie is almost certainly the intended answer." },
  { "id": "heap-priority-queue", "name": "Heap / Priority Queue", "tier": 2, "order": 10,
    "insight": "The answer whenever a problem says 'top k', 'k largest', or 'merge k'. The insight interviewers look for: you do not need to sort everything to find the top k — a heap of size k gets you O(n log k)." },
  { "id": "recursion", "name": "Recursion", "tier": 2, "order": 11,
    "insight": "Not a problem type so much as the skill everything above tier 2 depends on. If you cannot state the base case and the recurrence out loud before writing code, you are not ready for backtracking or DP." },
  { "id": "backtracking", "name": "Backtracking", "tier": 2, "order": 12,
    "insight": "Explicitly exploring a decision tree, and undoing your choice on the way out. Subsets, permutations, combinations, and N-Queens are one template with different pruning. Interviewers watch for whether you prune — brute force with no pruning reads as not understanding the problem." },
  { "id": "graphs", "name": "Graphs", "tier": 3, "order": 13,
    "insight": "The topic that separates mid from senior. Most 'hard' graph questions are BFS or DFS wearing a costume — a grid is a graph, a course schedule is a graph. The real skill is recognising the graph, then knowing BFS gives you shortest path on unweighted edges." },
  { "id": "advanced-graphs", "name": "Advanced Graphs", "tier": 3, "order": 14,
    "insight": "Dijkstra, union-find, topological sort, minimum spanning tree. You will not be asked to derive these; you will be asked to recognise which one applies and implement it cleanly under time pressure. Union-find in particular is short enough to memorise and pays for itself." },
  { "id": "dp-1d", "name": "1-D Dynamic Programming", "tier": 3, "order": 15,
    "insight": "Where most candidates lose the offer. The path that works: write the brute-force recursion, add memoisation, then convert to a table. Never start at the table — interviewers cannot follow it and neither can you under stress." },
  { "id": "dp-2d", "name": "2-D Dynamic Programming", "tier": 3, "order": 16,
    "insight": "Two changing inputs means a 2-D state. Grid paths, edit distance, and the knapsack family live here. State the meaning of dp[i][j] in one English sentence before writing anything — if you cannot, your recurrence will be wrong." },
  { "id": "greedy", "name": "Greedy", "tier": 3, "order": 17,
    "insight": "Deceptively hard, because a greedy solution is only correct if you can argue why the locally best choice is globally safe. Interviewers will ask for that argument. Never propose greedy without it — a wrong greedy is worse than a correct DP." },
  { "id": "intervals", "name": "Intervals", "tier": 3, "order": 18,
    "insight": "A small, extremely predictable family: sort by start (or end), then sweep. Meeting rooms and merge-intervals show up constantly at Amazon and Meta. Cheap points — do not leave them on the table." },
  { "id": "bit-manipulation", "name": "Bit Manipulation", "tier": 4, "order": 19,
    "insight": "Low frequency, high embarrassment when it appears. Know XOR's self-cancelling property, know n & (n-1) clears the lowest set bit, and you have covered most of what gets asked." },
  { "id": "math-geometry", "name": "Math & Geometry", "tier": 4, "order": 20,
    "insight": "Matrix rotation, spiral traversal, happy numbers. Rarely deep, frequently fiddly — these are tests of whether you can keep index arithmetic straight without panicking." },
  { "id": "dp-hard", "name": "Hard DP", "tier": 4, "order": 21,
    "insight": "Buy-and-sell-stock with state machines, palindrome partitioning, regex matching. Only worth your time once tiers 1 to 3 are solid. This is the tier that turns a hire into a strong hire, not the one that gets you the hire." },
  { "id": "segment-tree", "name": "Segment Tree / Fenwick", "tier": 4, "order": 22,
    "insight": "Almost never asked at FAANG onsites, occasionally at Google L5+ and in competitive-programming-flavoured rounds. Included for completeness. Do not touch this before your DP is reliable." }
]
```

- [ ] **Step 2: Write the failing test**

Create `tests/validate.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateData } from '../scripts/validate.mjs';

const topics = [{ id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1, insight: 'x' }];

const good = {
  id: 'two-sum', title: 'Two Sum', difficulty: 'Easy',
  topic: 'arrays-hashing', patterns: ['hash-map'], sheets: ['blind75'],
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

test('non-leetcode or malformed url is rejected', () => {
  const { errors } = validateData(topics, [{ ...good, url: 'not-a-url' }]);
  assert.match(errors[0], /url/i);
});

test('missing required field is rejected', () => {
  const { title, ...noTitle } = good;
  const { errors } = validateData(topics, [noTitle]);
  assert.match(errors[0], /title/i);
});

test('blind75 sheet must contain exactly 75 problems', () => {
  const { errors } = validateData(topics, [good], { checkSheetCounts: true });
  assert.match(errors.find((e) => /blind75/.test(e)), /expected 75.*got 1/i);
});
```

- [ ] **Step 3: Run it — expect failure**

Run: `node --test tests/validate.test.mjs`
Expected: FAIL — cannot find module `../scripts/validate.mjs`.

- [ ] **Step 4: Implement `scripts/validate.mjs`**

```javascript
#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);
const REQUIRED = ['id', 'title', 'difficulty', 'topic', 'patterns', 'sheets', 'url'];
const SHEET_SIZES = { blind75: 75 };

export function validateData(topics, problems, { checkSheetCounts = false } = {}) {
  const errors = [];
  const topicIds = new Set(topics.map((t) => t.id));
  const seen = new Set();

  for (const p of problems) {
    const where = p.id ?? p.title ?? '<unnamed>';

    for (const field of REQUIRED) {
      if (p[field] === undefined) errors.push(`${where}: missing required field "${field}"`);
    }
    if (p.id !== undefined) {
      if (seen.has(p.id)) errors.push(`duplicate id "${p.id}"`);
      seen.add(p.id);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${where}: id must be kebab-case`);
    }
    if (p.topic !== undefined && !topicIds.has(p.topic)) {
      errors.push(`${where}: unknown topic "${p.topic}"`);
    }
    if (p.difficulty !== undefined && !DIFFICULTIES.has(p.difficulty)) {
      errors.push(`${where}: difficulty must be Easy, Medium or Hard (got "${p.difficulty}")`);
    }
    if (p.url !== undefined && !/^https:\/\/[^\s]+$/.test(p.url)) {
      errors.push(`${where}: url must be an https URL (got "${p.url}")`);
    }
    if (p.patterns !== undefined && !Array.isArray(p.patterns)) {
      errors.push(`${where}: patterns must be an array`);
    }
    if (p.sheets !== undefined && !Array.isArray(p.sheets)) {
      errors.push(`${where}: sheets must be an array`);
    }
  }

  if (checkSheetCounts) {
    for (const [sheet, expected] of Object.entries(SHEET_SIZES)) {
      const got = problems.filter((p) => p.sheets?.includes(sheet)).length;
      if (got !== expected) errors.push(`sheet "${sheet}": expected ${expected} problems, got ${got}`);
    }
  }

  return { errors };
}

async function checkLinks(problems) {
  const errors = [];
  for (const p of problems) {
    try {
      const res = await fetch(p.url, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok) errors.push(`${p.id}: link returned HTTP ${res.status} — ${p.url}`);
    } catch (err) {
      errors.push(`${p.id}: link unreachable (${err.message}) — ${p.url}`);
    }
  }
  return errors;
}

async function main() {
  const root = new URL('../', import.meta.url);
  const topics = JSON.parse(await readFile(new URL('data/topics.json', root), 'utf8'));
  const problems = JSON.parse(await readFile(new URL('data/problems.json', root), 'utf8'));

  const { errors } = validateData(topics, problems, { checkSheetCounts: true });
  if (process.argv.includes('--check-links')) {
    errors.push(...(await checkLinks(problems)));
  }

  if (errors.length) {
    console.error(`\n${errors.length} problem(s) found:\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log(`✓ ${problems.length} problems across ${topics.length} topics — all valid`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
```

- [ ] **Step 5: Run tests — expect pass**

Run: `node --test tests/validate.test.mjs`
Expected: PASS, 7 tests.

- [ ] **Step 6: Commit**

```bash
git add data/topics.json scripts/validate.mjs tests/validate.test.mjs
git commit -m "feat: add topic roadmap and data validation gate"
```

---

### Task 2: The Stage 1 dataset (topic spine + Blind 75)

**Files:**
- Create: `data/problems.json`

**Interfaces:**
- Consumes: `data/topics.json` topic ids from Task 1.
- Produces: `data/problems.json` — the array every later task reads.

**This task authors data, not code. The rule is absolute: no problem is added from memory alone.**

- [ ] **Step 1: Fetch the authoritative Blind 75 list**

Use WebFetch against NeetCode's Blind 75 listing and at least one independent source (e.g. the original Blind post or a well-starred GitHub mirror). Cross-check the two. Where they disagree, prefer the list that matches the LeetCode problem that actually exists.

- [ ] **Step 2: Fetch the topic-spine additions**

The spine covers the tier-1→4 topics that Blind 75 leaves thin (Prefix Sum, Tries, Segment Tree, Math & Geometry). Take these from the NeetCode 150 list, fetched the same way. Target: ~150 problems total.

- [ ] **Step 3: Write `data/problems.json`**

An array of records in exactly this shape. Derive `id` from the LeetCode slug so it is stable and unique:

```json
[
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "arrays-hashing",
    "patterns": ["hash-map"],
    "sheets": ["blind75"],
    "url": "https://leetcode.com/problems/two-sum/"
  },
  {
    "id": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": ["hash-set"],
    "sheets": ["blind75"],
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
  }
]
```

Order within a topic: Easy, then Medium, then Hard. This is what makes the roadmap and the "next 3" rule work without a sort at runtime.

- [ ] **Step 4: Run the validator with link checking**

Run: `node scripts/validate.mjs --check-links`
Expected: `✓ ~150 problems across 22 topics — all valid`

If any link 404s, fix or remove that problem. Do not proceed with a failing link.

- [ ] **Step 5: Commit**

```bash
git add data/problems.json
git commit -m "feat: add Stage 1 dataset — topic spine and Blind 75, links verified"
```

---

### Task 3: Progress persistence

**Files:**
- Create: `assets/progress.js`
- Test: `tests/progress.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `createProgress(storage) -> progress` where `storage` is any object with `getItem(key)` / `setItem(key, value)`. In the browser, pass `window.localStorage`; in tests, pass a fake.
  - `progress.isSolved(id) -> boolean`
  - `progress.isStarred(id) -> boolean`
  - `progress.toggleSolved(id) -> void`
  - `progress.toggleStarred(id) -> void`
  - `progress.solvedAt(id) -> string | null` (ISO timestamp)
  - `progress.stats() -> { solvedCount: number, starredCount: number }`
  - `progress.export() -> object` (the raw persisted state)
  - `progress.import(obj) -> { ok: boolean, error?: string }`

- [ ] **Step 1: Write the failing test**

Create `tests/progress.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createProgress } from '../assets/progress.js';

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

test('corrupt storage does not throw — it resets', () => {
  const p = createProgress(fakeStorage({ 'advancedsa.progress.v1': '{{{not json' }));
  assert.equal(p.isSolved('two-sum'), false);
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/progress.test.mjs`
Expected: FAIL — cannot find module `../assets/progress.js`.

- [ ] **Step 3: Implement `assets/progress.js`**

```javascript
const KEY = 'advancedsa.progress.v1';
const VERSION = 1;

const empty = () => ({ version: VERSION, solved: {}, starred: [] });

function load(storage) {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION) return empty();
    return {
      version: VERSION,
      solved: parsed.solved ?? {},
      starred: Array.isArray(parsed.starred) ? parsed.starred : [],
    };
  } catch {
    return empty();
  }
}

export function createProgress(storage) {
  let state = load(storage);
  const save = () => storage.setItem(KEY, JSON.stringify(state));

  return {
    isSolved: (id) => id in state.solved,
    isStarred: (id) => state.starred.includes(id),
    solvedAt: (id) => state.solved[id] ?? null,

    toggleSolved(id) {
      if (id in state.solved) delete state.solved[id];
      else state.solved[id] = new Date().toISOString();
      save();
    },

    toggleStarred(id) {
      const i = state.starred.indexOf(id);
      if (i === -1) state.starred.push(id);
      else state.starred.splice(i, 1);
      save();
    },

    stats: () => ({
      solvedCount: Object.keys(state.solved).length,
      starredCount: state.starred.length,
    }),

    export: () => structuredClone(state),

    import(obj) {
      if (obj?.version !== VERSION) {
        return { ok: false, error: `unsupported file version (expected ${VERSION})` };
      }
      if (typeof obj.solved !== 'object' || obj.solved === null || !Array.isArray(obj.starred)) {
        return { ok: false, error: 'file is missing a valid "solved" or "starred" field' };
      }
      state = { version: VERSION, solved: { ...obj.solved }, starred: [...obj.starred] };
      save();
      return { ok: true };
    },
  };
}
```

- [ ] **Step 4: Run tests — expect pass**

Run: `node --test tests/progress.test.mjs`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add assets/progress.js tests/progress.test.mjs
git commit -m "feat: add local-storage progress tracking with export/import"
```

---

### Task 4: Filtering

**Files:**
- Create: `assets/filters.js`
- Test: `tests/filters.test.mjs`

**Interfaces:**
- Consumes: `progress` from Task 3 (only `isSolved` / `isStarred` are used).
- Produces: `applyFilters(problems, filterState, progress) -> problem[]`, preserving input order.
  `filterState` is `{ search: string, difficulty: Set<string>, sheet: string|null, status: 'all'|'unsolved'|'solved'|'starred' }`.
  `emptyFilterState() -> filterState` returns the neutral state that matches everything.

- [ ] **Step 1: Write the failing test**

Create `tests/filters.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyFilters, emptyFilterState } from '../assets/filters.js';

const problems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topic: 'arrays-hashing', patterns: ['hash-map'], sheets: ['blind75'] },
  { id: 'group-anagrams', title: 'Group Anagrams', difficulty: 'Medium', topic: 'arrays-hashing', patterns: ['hash-map'], sheets: ['blind75', 'striver-sde'] },
  { id: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'binary-search', patterns: ['binary-search'], sheets: ['striver-sde'] },
];

const progress = { isSolved: (id) => id === 'two-sum', isStarred: (id) => id === 'group-anagrams' };
const ids = (list) => list.map((p) => p.id);

test('the empty state matches everything', () => {
  assert.deepEqual(ids(applyFilters(problems, emptyFilterState(), progress)), ids(problems));
});

test('search matches title, case-insensitively', () => {
  const state = { ...emptyFilterState(), search: 'anagram' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('search also matches a pattern tag', () => {
  const state = { ...emptyFilterState(), search: 'hash-map' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum', 'group-anagrams']);
});

test('difficulty filter is a union of the selected difficulties', () => {
  const state = { ...emptyFilterState(), difficulty: new Set(['Easy', 'Hard']) };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['two-sum', 'median-of-two-sorted-arrays']);
});

test('sheet filter narrows to one sheet', () => {
  const state = { ...emptyFilterState(), sheet: 'striver-sde' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams', 'median-of-two-sorted-arrays']);
});

test('status unsolved excludes solved problems', () => {
  const state = { ...emptyFilterState(), status: 'unsolved' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams', 'median-of-two-sorted-arrays']);
});

test('status starred keeps only starred problems', () => {
  const state = { ...emptyFilterState(), status: 'starred' };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('filters combine with AND', () => {
  const state = { ...emptyFilterState(), sheet: 'blind75', status: 'unsolved', difficulty: new Set(['Medium']) };
  assert.deepEqual(ids(applyFilters(problems, state, progress)), ['group-anagrams']);
});

test('no match returns an empty array, not an error', () => {
  const state = { ...emptyFilterState(), search: 'quantum entanglement' };
  assert.deepEqual(applyFilters(problems, state, progress), []);
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/filters.test.mjs`
Expected: FAIL — cannot find module `../assets/filters.js`.

- [ ] **Step 3: Implement `assets/filters.js`**

```javascript
export function emptyFilterState() {
  return { search: '', difficulty: new Set(), sheet: null, status: 'all' };
}

function matchesSearch(problem, search) {
  if (!search) return true;
  const needle = search.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [problem.title, ...(problem.patterns ?? [])].join(' ').toLowerCase();
  return haystack.includes(needle);
}

function matchesStatus(problem, status, progress) {
  switch (status) {
    case 'solved':   return progress.isSolved(problem.id);
    case 'unsolved': return !progress.isSolved(problem.id);
    case 'starred':  return progress.isStarred(problem.id);
    default:         return true;
  }
}

export function applyFilters(problems, state, progress) {
  return problems.filter((p) =>
    matchesSearch(p, state.search) &&
    (state.difficulty.size === 0 || state.difficulty.has(p.difficulty)) &&
    (state.sheet === null || (p.sheets ?? []).includes(state.sheet)) &&
    matchesStatus(p, state.status, progress)
  );
}
```

- [ ] **Step 4: Run tests — expect pass**

Run: `node --test tests/filters.test.mjs`
Expected: PASS, 9 tests.

- [ ] **Step 5: Commit**

```bash
git add assets/filters.js tests/filters.test.mjs
git commit -m "feat: add pure filtering logic"
```

---

### Task 5: The "next 3 problems" rule

**Files:**
- Create: `assets/recommend.js`
- Test: `tests/recommend.test.mjs`

**Interfaces:**
- Consumes: `progress` from Task 3.
- Produces: `nextProblems(problems, topics, progress, count = 3) -> problem[]`.

The rule, from the spec: walk the roadmap in order (tier, then topic `order`, then the problem's existing order within its topic, which is already Easy→Medium→Hard). Take the first `count` unsolved. Prefer a Blind 75 problem when two are otherwise tied at the same position — implemented as a stable sort that puts `blind75` members first *within the same topic and difficulty*. If everything is solved, return the starred problems least recently solved, as revision.

- [ ] **Step 1: Write the failing test**

Create `tests/recommend.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextProblems } from '../assets/recommend.js';

const topics = [
  { id: 'arrays-hashing', tier: 1, order: 1 },
  { id: 'binary-search', tier: 1, order: 5 },
  { id: 'graphs', tier: 3, order: 13 },
];

const problems = [
  { id: 'num-islands', difficulty: 'Medium', topic: 'graphs', sheets: ['blind75'] },
  { id: 'binary-search', difficulty: 'Easy', topic: 'binary-search', sheets: [] },
  { id: 'two-sum', difficulty: 'Easy', topic: 'arrays-hashing', sheets: ['blind75'] },
  { id: 'contains-duplicate', difficulty: 'Easy', topic: 'arrays-hashing', sheets: [] },
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

test('a beginner is pointed at the very first roadmap problem', () => {
  const result = nextProblems(problems, topics, stubProgress());
  assert.equal(result[0].id, 'two-sum', 'tier 1, topic order 1, Easy, and on Blind 75');
});

test('returns exactly `count` problems, in roadmap order', () => {
  const result = nextProblems(problems, topics, stubProgress(), 3);
  assert.deepEqual(ids(result), ['two-sum', 'contains-duplicate', 'group-anagrams']);
});

test('solved problems are skipped', () => {
  const progress = stubProgress({ solved: { 'two-sum': '2026-01-01T00:00:00Z', 'contains-duplicate': '2026-01-02T00:00:00Z' } });
  assert.deepEqual(ids(nextProblems(problems, topics, progress, 2)), ['group-anagrams', 'binary-search']);
});

test('later tiers come after earlier tiers', () => {
  const result = nextProblems(problems, topics, stubProgress(), 5);
  assert.equal(result.at(-1).id, 'num-islands', 'the tier-3 graph problem is last');
});

test('when everything is solved, starred problems are returned for revision', () => {
  const solved = Object.fromEntries(problems.map((p, i) => [p.id, `2026-01-0${i + 1}T00:00:00Z`]));
  const progress = stubProgress({ solved, starred: ['group-anagrams', 'two-sum'] });
  // two-sum was solved 2026-01-03, group-anagrams 2026-01-05 -> least recent first
  assert.deepEqual(ids(nextProblems(problems, topics, progress, 3)), ['two-sum', 'group-anagrams']);
});

test('everything solved and nothing starred returns an empty list', () => {
  const solved = Object.fromEntries(problems.map((p) => [p.id, '2026-01-01T00:00:00Z']));
  assert.deepEqual(nextProblems(problems, topics, stubProgress({ solved }), 3), []);
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/recommend.test.mjs`
Expected: FAIL — cannot find module `../assets/recommend.js`.

- [ ] **Step 3: Implement `assets/recommend.js`**

```javascript
const DIFFICULTY_RANK = { Easy: 0, Medium: 1, Hard: 2 };

export function roadmapOrder(problems, topics) {
  const topicRank = new Map(topics.map((t) => [t.id, [t.tier, t.order]]));

  return [...problems].sort((a, b) => {
    const [aTier, aOrder] = topicRank.get(a.topic) ?? [99, 99];
    const [bTier, bOrder] = topicRank.get(b.topic) ?? [99, 99];
    if (aTier !== bTier) return aTier - bTier;
    if (aOrder !== bOrder) return aOrder - bOrder;

    const d = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
    if (d !== 0) return d;

    // Tie-break: prefer Blind 75, which is the highest-signal list.
    const aBlind = (a.sheets ?? []).includes('blind75') ? 0 : 1;
    const bBlind = (b.sheets ?? []).includes('blind75') ? 0 : 1;
    return aBlind - bBlind;
  });
}

export function nextProblems(problems, topics, progress, count = 3) {
  const unsolved = roadmapOrder(problems, topics).filter((p) => !progress.isSolved(p.id));
  if (unsolved.length > 0) return unsolved.slice(0, count);

  // Everything is solved — fall back to revising starred problems, least recent first.
  return problems
    .filter((p) => progress.isStarred(p.id))
    .sort((a, b) => (progress.solvedAt(a.id) ?? '').localeCompare(progress.solvedAt(b.id) ?? ''))
    .slice(0, count);
}
```

- [ ] **Step 4: Run tests — expect pass**

Run: `node --test tests/recommend.test.mjs`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add assets/recommend.js tests/recommend.test.mjs
git commit -m "feat: add deterministic next-3-problems recommendation"
```

---

### Task 6: Data loading and indexing

**Files:**
- Create: `assets/data.js`
- Test: `tests/data.test.mjs`

**Interfaces:**
- Consumes: `roadmapOrder` from Task 5.
- Produces:
  - `loadData(fetchFn = fetch) -> Promise<{ problems, topics }>` — fetches both JSON files.
  - `groupByTopic(problems, topics, progress) -> [{ topic, problems, solvedCount }]` — topics in roadmap order, each with its problems in roadmap order. Topics with no problems are omitted.
  - `SHEETS` — the sheet id→label map used by the UI: `{ blind75: 'Blind 75', 'striver-sde': 'Striver SDE', 'love-babbar': 'Love Babbar' }`.

- [ ] **Step 1: Write the failing test**

Create `tests/data.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByTopic, SHEETS } from '../assets/data.js';

const topics = [
  { id: 'graphs', name: 'Graphs', tier: 3, order: 13 },
  { id: 'arrays-hashing', name: 'Arrays & Hashing', tier: 1, order: 1 },
  { id: 'tries', name: 'Tries', tier: 2, order: 9 },
];

const problems = [
  { id: 'num-islands', difficulty: 'Medium', topic: 'graphs', sheets: [] },
  { id: 'group-anagrams', difficulty: 'Medium', topic: 'arrays-hashing', sheets: [] },
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
  assert.equal(groups[1].solvedCount, 0);
});

test('SHEETS maps every sheet id to a human label', () => {
  assert.equal(SHEETS.blind75, 'Blind 75');
  assert.equal(SHEETS['striver-sde'], 'Striver SDE');
  assert.equal(SHEETS['love-babbar'], 'Love Babbar');
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/data.test.mjs`
Expected: FAIL — cannot find module `../assets/data.js`.

- [ ] **Step 3: Implement `assets/data.js`**

```javascript
import { roadmapOrder } from './recommend.js';

export const SHEETS = {
  blind75: 'Blind 75',
  'striver-sde': 'Striver SDE',
  'love-babbar': 'Love Babbar',
};

export async function loadData(fetchFn = fetch) {
  const [problems, topics] = await Promise.all([
    fetchFn('data/problems.json').then((r) => r.json()),
    fetchFn('data/topics.json').then((r) => r.json()),
  ]);
  return { problems, topics };
}

export function groupByTopic(problems, topics, progress) {
  const ordered = roadmapOrder(problems, topics);
  const byTopic = new Map();

  for (const p of ordered) {
    if (!byTopic.has(p.topic)) byTopic.set(p.topic, []);
    byTopic.get(p.topic).push(p);
  }

  return [...topics]
    .sort((a, b) => a.tier - b.tier || a.order - b.order)
    .filter((topic) => byTopic.has(topic.id))
    .map((topic) => {
      const topicProblems = byTopic.get(topic.id);
      return {
        topic,
        problems: topicProblems,
        solvedCount: topicProblems.filter((p) => progress.isSolved(p.id)).length,
      };
    });
}
```

- [ ] **Step 4: Run tests — expect pass**

Run: `node --test tests/data.test.mjs`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add assets/data.js tests/data.test.mjs
git commit -m "feat: add data loading and topic grouping"
```

---

### Task 7: The interface

All logic is now built and tested. This task is the shell, the rendering, and the styling.

**Files:**
- Create: `index.html`
- Create: `assets/ui.js`
- Create: `assets/app.js`
- Create: `assets/app.css`

**Interfaces:**
- Consumes: `loadData` / `groupByTopic` / `SHEETS` (Task 6), `createProgress` (Task 3), `applyFilters` / `emptyFilterState` (Task 4), `nextProblems` (Task 5).
- Produces: the working site.

- [ ] **Step 1: Invoke the frontend-design skill**

REQUIRED: run the `frontend-design` skill before writing any CSS, and follow its direction. The spec's brief: premium through restraint — a deep neutral base, one accent colour, a real type scale, generous whitespace, honest depth. Explicitly not gradient washes or neon.

- [ ] **Step 2: Build `index.html`**

A static shell only — no content is hardcoded, everything is rendered by `ui.js`. It must contain: a header with the solved-count and the theme toggle; a dashboard region; a view switch (Topic / Sheet); a filter bar (search input, difficulty chips, status chips, sheet select); a `<main id="list">` mount point; and Export/Import buttons with a hidden `<input type="file">`.

Load scripts as `<script type="module" src="assets/app.js"></script>`.

- [ ] **Step 3: Build `assets/ui.js`**

The only module allowed to touch the DOM. It exports render functions that take data and return/patch DOM — it must not read `localStorage` and must not compute filters itself:

- `renderDashboard(el, { problems, topics, progress })` — solved total, per-difficulty breakdown, per-topic heatmap, and the "your next 3 problems" card built from `nextProblems`.
- `renderTopicView(el, groups, progress, handlers)` — a section per topic, showing the topic `insight`, a progress bar, and its problem rows.
- `renderSheetView(el, problems, progress, handlers)` — the same rows grouped by sheet.
- `renderRow(problem, progress, handlers)` — the solved checkbox, star, title, difficulty pill, pattern tags, sheet badges, and the outbound link (`target="_blank"`, `rel="noopener"`).

`handlers` is `{ onToggleSolved(id), onToggleStarred(id) }`, supplied by `app.js`.

- [ ] **Step 4: Build `assets/app.js`**

Owns the filter state and wires everything:

```javascript
import { loadData, groupByTopic } from './data.js';
import { createProgress } from './progress.js';
import { applyFilters, emptyFilterState } from './filters.js';
import * as ui from './ui.js';

const progress = createProgress(window.localStorage);
const state = { view: 'topic', filters: emptyFilterState() };

const { problems, topics } = await loadData();

function render() {
  const visible = applyFilters(problems, state.filters, progress);
  ui.renderDashboard(document.querySelector('#dashboard'), { problems, topics, progress });

  const list = document.querySelector('#list');
  const handlers = {
    onToggleSolved: (id) => { progress.toggleSolved(id); render(); },
    onToggleStarred: (id) => { progress.toggleStarred(id); render(); },
  };

  if (state.view === 'topic') {
    ui.renderTopicView(list, groupByTopic(visible, topics, progress), progress, handlers);
  } else {
    ui.renderSheetView(list, visible, progress, handlers);
  }
}

render();
```

Also bind: the view switch, every filter control (each sets `state.filters.*` then calls `render()`), the theme toggle (persisting the choice), Export (serialise `progress.export()` to a downloaded `.json`), and Import (read the file, call `progress.import()`, and surface `error` to the user on failure rather than failing silently).

- [ ] **Step 5: Add keyboard shortcuts**

In `app.js`: `/` focuses the search input (and `preventDefault`s so the slash is not typed); `j` / `k` move a `.is-active` class between visible rows and scroll them into view; `x` toggles solved on the active row. Shortcuts must not fire while an input is focused.

- [ ] **Step 6: Verify in a real browser**

Run: `python3 -m http.server 8000` then open `http://localhost:8000`.

Check by hand, and do not skip this:
1. All ~150 problems render, grouped by topic, tier 1 first.
2. Tick a problem → the dashboard count increases → reload the page → it is still ticked.
3. Each filter narrows the list; combining two filters narrows it further.
4. Switching to Sheet view shows the same problems grouped by sheet.
5. Export downloads a file; clear `localStorage`; Import restores every tick.
6. Importing a junk `.json` shows an error and does not wipe existing progress.
7. It is usable at a 375px-wide viewport.
8. `/`, `j`, `k`, `x` all work.

- [ ] **Step 7: Commit**

```bash
git add index.html assets/
git commit -m "feat: add the interface — topic and sheet views, dashboard, filters, themes"
```

---

### Task 8: Generated markdown sheets and the README

**Files:**
- Create: `scripts/build-sheets.mjs`
- Create: `sheets/` (generated)
- Create: `README.md`
- Test: `tests/build-sheets.test.mjs`

**Interfaces:**
- Consumes: `data/problems.json`, `data/topics.json`.
- Produces: `renderSheetMarkdown(title, problems) -> string` and `renderTopicMarkdown(topics, problems) -> string`, both exported and pure. `main()` writes the files.

- [ ] **Step 1: Write the failing test**

Create `tests/build-sheets.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderSheetMarkdown } from '../scripts/build-sheets.mjs';

const problems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topic: 'arrays-hashing',
    patterns: ['hash-map'], sheets: ['blind75'], url: 'https://leetcode.com/problems/two-sum/' },
];

test('renders a GitHub-checkbox table row with a working link', () => {
  const md = renderSheetMarkdown('Blind 75', problems);
  assert.match(md, /# Blind 75/);
  assert.match(md, /- \[ \] \[Two Sum\]\(https:\/\/leetcode\.com\/problems\/two-sum\/\)/);
  assert.match(md, /Easy/);
});

test('states the problem count so a reader knows the scope', () => {
  assert.match(renderSheetMarkdown('Blind 75', problems), /1 problem/);
});

test('an empty sheet renders without throwing', () => {
  assert.match(renderSheetMarkdown('Empty', []), /# Empty/);
});
```

- [ ] **Step 2: Run it — expect failure**

Run: `node --test tests/build-sheets.test.mjs`
Expected: FAIL — cannot find module `../scripts/build-sheets.mjs`.

- [ ] **Step 3: Implement `scripts/build-sheets.mjs`**

```javascript
#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const BANNER = '<!-- GENERATED by scripts/build-sheets.mjs — do not edit by hand. Edit data/problems.json. -->';

export function renderSheetMarkdown(title, problems) {
  const count = problems.length;
  const lines = [
    BANNER,
    '',
    `# ${title}`,
    '',
    `${count} problem${count === 1 ? '' : 's'}. Tick them off as you go — GitHub renders these checkboxes live in your own fork.`,
    '',
  ];

  for (const p of problems) {
    const tags = (p.patterns ?? []).join(', ');
    lines.push(`- [ ] [${p.title}](${p.url}) — \`${p.difficulty}\`${tags ? ` · ${tags}` : ''}`);
  }

  lines.push('', '---', '', 'Track your progress interactively: **[open the site](https://sumitsingh.github.io/Advancedsa/)**');
  return lines.join('\n') + '\n';
}

export function renderTopicMarkdown(topics, problems) {
  const lines = [BANNER, '', '# The Roadmap', '', 'Every problem, grouped by topic, ordered beginner to advanced.', ''];
  const tierNames = { 1: 'Foundations', 2: 'Core', 3: 'Advanced', 4: 'Elite' };
  let currentTier = null;

  for (const topic of [...topics].sort((a, b) => a.tier - b.tier || a.order - b.order)) {
    const topicProblems = problems.filter((p) => p.topic === topic.id);
    if (topicProblems.length === 0) continue;

    if (topic.tier !== currentTier) {
      currentTier = topic.tier;
      lines.push(`## Tier ${currentTier} — ${tierNames[currentTier]}`, '');
    }

    lines.push(`### ${topic.name}`, '', `> ${topic.insight}`, '');
    for (const p of topicProblems) {
      lines.push(`- [ ] [${p.title}](${p.url}) — \`${p.difficulty}\``);
    }
    lines.push('');
  }

  return lines.join('\n') + '\n';
}

async function main() {
  const root = new URL('../', import.meta.url);
  const problems = JSON.parse(await readFile(new URL('data/problems.json', root), 'utf8'));
  const topics = JSON.parse(await readFile(new URL('data/topics.json', root), 'utf8'));

  await mkdir(new URL('sheets/', root), { recursive: true });

  const sheets = { blind75: 'Blind 75', 'striver-sde': 'Striver SDE Sheet', 'love-babbar': 'Love Babbar Sheet' };
  for (const [id, title] of Object.entries(sheets)) {
    const list = problems.filter((p) => p.sheets?.includes(id));
    if (list.length === 0) continue;
    await writeFile(new URL(`sheets/${id}.md`, root), renderSheetMarkdown(title, list));
    console.log(`✓ sheets/${id}.md (${list.length} problems)`);
  }

  await writeFile(new URL('sheets/by-topic.md', root), renderTopicMarkdown(topics, problems));
  console.log('✓ sheets/by-topic.md');
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
```

- [ ] **Step 4: Run tests, then generate**

Run: `node --test tests/build-sheets.test.mjs` → expect PASS, 3 tests.
Run: `node scripts/build-sheets.mjs` → writes `sheets/*.md`.
Open `sheets/by-topic.md` and confirm the checkboxes and links render.

- [ ] **Step 5: Write `README.md`**

It is the front door for the GitHub audience. It must contain: what the project is in one sentence; a link to the live site; the tier table from the spec; links to each generated sheet in `sheets/`; a "how to use this" section (fork it, tick the boxes, or use the site); and a short "how the data works" note stating that `problems.json` is the source of truth and `sheets/` is generated.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-sheets.mjs tests/build-sheets.test.mjs sheets/ README.md
git commit -m "feat: generate markdown study sheets from the dataset, add README"
```

---

### Task 9: CI and GitHub Pages

**Files:**
- Create: `.github/workflows/validate.yml`
- Create: `package.json` (scripts only — still zero runtime dependencies)

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "advancedsa",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/",
    "validate": "node scripts/validate.mjs",
    "validate:links": "node scripts/validate.mjs --check-links",
    "build:sheets": "node scripts/build-sheets.mjs",
    "serve": "python3 -m http.server 8000"
  }
}
```

- [ ] **Step 2: Write `.github/workflows/validate.yml`**

Runs the tests and the data validator on every push. It must also confirm the committed `sheets/` are in sync with the data — regenerate them and fail if `git diff` is non-empty. That is what stops the two audiences' content from drifting.

```yaml
name: validate
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm test
      - run: npm run validate
      - name: sheets/ must match the data
        run: |
          npm run build:sheets
          git diff --exit-code sheets/ \
            || (echo "::error::sheets/ is stale — run 'npm run build:sheets' and commit" && exit 1)
```

- [ ] **Step 3: Verify the whole suite passes**

Run: `npm test && npm run validate`
Expected: all tests pass; validator prints `✓ ~150 problems across 22 topics — all valid`.

- [ ] **Step 4: Commit and enable Pages**

```bash
git add package.json .github/
git commit -m "ci: validate data, tests, and sheet freshness on every push"
```

Then: push to GitHub, and in **Settings → Pages**, set Source to `Deploy from a branch`, branch `main`, folder `/ (root)`. Confirm the site loads at the published URL and that `data/problems.json` is fetched successfully over HTTPS.

---

## Stages 2 and 3 (follow-on, not part of this plan)

Once the site is live and Stage 1 is verified, extend `data/problems.json`:

- **Stage 2 — Striver SDE Sheet:** add `"striver-sde"` to the `sheets` array of problems already present; add the missing ones. Re-run `validate --check-links` and `build:sheets`.
- **Stage 3 — Love Babbar Sheet:** same procedure. This is the largest and least-reliably-remembered list — every entry must come from the fetched source, never from memory.

Because the ids are stable, existing user progress survives both extensions untouched.
