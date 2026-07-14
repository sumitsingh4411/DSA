# Advancedsa — DSA Interview Prep Site

**Date:** 2026-07-15
**Status:** Approved

## Purpose

A DSA practice tracker and roadmap for FAANG interview preparation, taking the user from
beginner to advanced. It consolidates the well-known community sheets (Blind 75, Striver SDE
Sheet, Love Babbar's sheet) into one ordered learning path with progress tracking.

The repository serves two audiences at once:

1. **People browsing GitHub** — generated markdown sheets they can read and learn from directly.
2. **People using the site** — a polished interactive tracker published on GitHub Pages.

## Core Architectural Decision

`data/problems.json` is the single source of truth. Both the markdown sheets and the live site
are derived from it. The markdown files are build artifacts, never hand-edited. This is what
prevents the two audiences' content from drifting apart.

## Scope

### In scope (v1)

- Topic view: problems grouped by topic, topics ordered beginner → advanced.
- Sheet view: the same problems sliced by source sheet (Blind 75 / Striver / Love Babbar).
- Per-problem: solved checkbox, star-for-revision, difficulty, pattern tags, sheet badges,
  outbound link to LeetCode.
- Filters: difficulty, status (unsolved / solved / starred), sheet. Plus text search.
- Dashboard: total solved, breakdown by difficulty, per-topic progress heatmap, and a
  "your next 3 problems" recommendation (see below).
- Progress export/import as a JSON file (the only cross-device story in v1).
- Dark and light theme.
- Keyboard shortcuts: `/` focus search, `j`/`k` move between rows, `x` toggle solved.
- Generated markdown sheets committed to the repo.
- README that works as a landing page for the repo.

### Explicitly out of scope (v1)

Accounts and cloud sync; an in-browser code editor or judge; written editorials/solutions;
timers; spaced repetition; discussion or comments. Each is a project in its own right, and none
of them improve interview outcomes faster than solving the next problem does.

## Technology

Static site: plain HTML, CSS, and vanilla JavaScript (ES modules). No framework, no build step
for the site itself. Node scripts exist only to generate the markdown sheets and validate the
data; they are developer tools, not a runtime dependency.

Rationale: the site is a filtered list over ~450 records with local persistence. A framework
would add install friction and a build step without buying anything. Double-clicking
`index.html` must work.

Hosting: GitHub Pages from the repository root.

## Data Model

### `data/problems.json`

An array of problem records:

```json
{
  "id": "two-sum",
  "title": "Two Sum",
  "difficulty": "Easy",
  "topic": "arrays-hashing",
  "patterns": ["hash-map"],
  "sheets": ["blind75", "striver-sde", "love-babbar"],
  "url": "https://leetcode.com/problems/two-sum/"
}
```

- `id` — kebab-case, unique, stable. Progress is keyed on this, so it must never change
  once shipped; changing an `id` silently discards a user's progress for that problem.
- `topic` — exactly one, referencing a `topics.json` id. Determines placement in the roadmap.
- `patterns` — zero or more free-form tags, used for display and search only.
- `sheets` — which source sheets include this problem. Drives the sheet view and the
  generated markdown. Empty array is legal (a problem in the roadmap but on no sheet).

### `data/topics.json`

An array of topic records, in roadmap order:

```json
{
  "id": "arrays-hashing",
  "name": "Arrays & Hashing",
  "tier": 1,
  "insight": "What interviewers are actually testing here — 2-3 sentences."
}
```

The `insight` field is the differentiator: most sheets hand you a list and no context. Each
topic explains what the interviewer is probing for, and which patterns recur.

## Roadmap Tiers

| Tier | Name | Topics |
|---|---|---|
| 1 | Foundations | Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Prefix Sum |
| 2 | Core | Linked List, Trees, Tries, Heap / Priority Queue, Recursion, Backtracking |
| 3 | Advanced | Graphs, Advanced Graphs, 1-D DP, 2-D DP, Greedy, Intervals |
| 4 | Elite | Bit Manipulation, Math & Geometry, Hard DP, Segment Tree / Fenwick |

## "Your Next 3 Problems"

The rule is deterministic and stated here so it cannot be interpreted two ways:

Walk the roadmap in order (tier, then topic order, then within a topic: Easy before Medium
before Hard). Take the first three unsolved problems, preferring those on Blind 75 when a topic
offers a choice at the same difficulty. If every problem in the roadmap is solved, show the
three starred problems least recently solved instead, as revision.

This means a beginner who has solved nothing is pointed at the first easy Arrays problem, and
someone mid-way is pointed at the next thing in their weakest earned position — without any
scoring model to tune.

## Progress Persistence

`localStorage`, under a single versioned key (`advancedsa.progress.v1`) holding:

```json
{
  "version": 1,
  "solved": { "two-sum": "2026-07-15T10:00:00Z" },
  "starred": ["two-sum"]
}
```

Solved timestamps (rather than booleans) cost nothing and enable the activity/streak display
and the "recently solved" ordering.

Export writes this object to a downloadable `.json`. Import replaces it after validating
`version` and shape. Unknown problem ids in an imported file are preserved but ignored, so a
progress file survives a problem being temporarily removed from the dataset.

## Modules

The site code is split so each file has one job:

- `assets/data.js` — loads and indexes `problems.json` / `topics.json`. Knows nothing about
  the DOM.
- `assets/progress.js` — reads/writes `localStorage`, and handles export/import. Knows nothing
  about the DOM. The only module allowed to touch storage.
- `assets/filters.js` — pure functions: given the problem list and a filter state, return the
  problems to display. No side effects; directly unit-testable.
- `assets/ui.js` — rendering and event handling. The only module that touches the DOM.
- `assets/app.js` — wires the above together; owns the filter state.

The boundary that matters: filtering and progress logic are pure and testable without a
browser. Rendering is isolated so it can be rewritten without touching the logic.

## Data Accuracy

This is the main risk in the project, and it is handled explicitly.

Blind 75 is reproducible from memory with high confidence. The Striver SDE sheet is largely so.
Love Babbar's sheet is not — writing all of it from memory would produce wrong titles and dead
links, and a tracker full of 404s is worse than no tracker.

Therefore the dataset is built in verified stages:

1. **Stage 1 (v1 ship):** the topic spine plus Blind 75 — roughly 150 problems, every LeetCode
   URL confirmed live with a real HTTP request.
2. **Stage 2:** extend to the Striver SDE sheet, cross-checked against the published source.
3. **Stage 3:** extend to Love Babbar's sheet, cross-checked against the published source.

`scripts/validate.mjs` is the gate. It fails on: a duplicate `id`; a `topic` not present in
`topics.json`; a `difficulty` outside Easy/Medium/Hard; a malformed URL; and — in its
`--check-links` mode — any URL that does not return HTTP 200. Sheet-size assertions
(`blind75` must contain exactly 75 problems) catch silent omissions.

No problem enters `problems.json` until its link has been verified.

## Visual Direction

Premium reads as restraint, not decoration. A deep neutral base, a single accent colour, a real
typographic scale, generous whitespace, and honest depth — not gradient washes and neon. The
frontend-design skill is to be invoked before writing the UI.

The interface must be legible and usable on a phone; a person reviewing problems on the train
is a real use case.

## Testing

- `scripts/validate.mjs` — data integrity, run before every commit that touches data, and in CI.
- Unit tests for `filters.js` and `progress.js` using `node:test` (no dependencies): filter
  combinations, progress round-trips, import of a malformed file.
- Manual verification: load the site, solve a problem, reload, confirm it persisted; export,
  clear storage, import, confirm restoration.

## Success Criteria

1. `index.html` opens and works with no build step and no network beyond the problem links.
2. Every problem link resolves.
3. Progress survives a reload, and moves between browsers via export/import.
4. The generated markdown sheets render correctly on GitHub and match `problems.json`.
5. A beginner can open the site and know, without being told, which problem to solve first.
