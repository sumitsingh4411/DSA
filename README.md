# Advancedsa

A DSA roadmap for FAANG interviews — foundations to elite, with the tracking built in.

**[▶ Open the site](https://sumitgithub1001.github.io/Advancedsa/)**

> **Before you publish:** the URL above, the `SITE` constant in `scripts/build-sheets.mjs`, and
> `base` in `vite.config.js` all assume the repo `sumitgithub1001/Advancedsa`. If yours differs,
> change those three and run `npm run build:sheets`.

Most sheets hand you a list of links and wish you luck. This one is **ordered** — 153 problems
across 20 topics, arranged so each topic sets up the next — and it tells you **which problem to
solve today**, so you never open it and stall on where to start.

## The roadmap

Every topic is a markdown file you can read right here on GitHub. Each opens with **what
interviewers are actually testing** — the thing you need to say out loud in the room, which is
exactly what most sheets leave out.

**Tier 1 — Foundations**
[Arrays & Hashing](content/01-arrays-hashing.md) ·
[Two Pointers](content/02-two-pointers.md) ·
[Sliding Window](content/03-sliding-window.md) ·
[Stack](content/04-stack.md) ·
[Binary Search](content/05-binary-search.md) ·
[Prefix Sum](content/06-prefix-sum.md)

**Tier 2 — Core**
[Linked List](content/07-linked-list.md) ·
[Trees](content/08-trees.md) ·
[Tries](content/09-tries.md) ·
[Heap / Priority Queue](content/10-heap-priority-queue.md) ·
[Backtracking](content/11-backtracking.md)

**Tier 3 — Advanced**
[Graphs](content/12-graphs.md) ·
[Advanced Graphs](content/13-advanced-graphs.md) ·
[1-D DP](content/14-dp-1d.md) ·
[2-D DP](content/15-dp-2d.md) ·
[Greedy](content/16-greedy.md) ·
[Intervals](content/17-intervals.md)

**Tier 4 — Elite**
[Bit Manipulation](content/18-bit-manipulation.md) ·
[Math & Geometry](content/19-math-geometry.md) ·
[Hard DP](content/20-dp-hard.md)

Cross-cutting: **[Blind 75](sheets/blind75.md)** — all 75, on its own.

Fork the repo and every checkbox becomes yours to tick.

## Or use the site

Same problems, but it also tells you your next three, tracks solved and starred, filters by
difficulty and status, and runs a rail down the page that fills as you climb.

Progress is saved in your browser — no account, no server. **Export** moves it between machines.

## How to use it

Do the tiers in order. Tier 1 is not beneath you: interviewers open with it, and the instinct it
builds — *reach for a hash map before a nested loop* — is what the harder tiers stand on.

Inside a topic, go Easy → Medium → Hard. If a problem takes more than 45 minutes, read the
solution, understand it, star it, come back in a week. Grinding a problem whose shape you cannot
see teaches you only that you can suffer.

Seven problems are marked 🔒 — they need LeetCode Premium. They're flagged so you don't hit a
paywall by surprise. Skip them without guilt; none is load-bearing.

## How the data works

**`content/*.md` is the source of truth.** You edit it by hand. Everything else is generated:

```
content/*.md ──┬──> src/content.generated.js ──> the site
               └──> sheets/blind75.md
```

Markdown is a fragile thing to use as a database, so the parser is strict on purpose: a bad
difficulty, an unknown sheet name, a malformed link, or a row with the wrong number of columns
throws and names the file and the row. Nothing is ever silently dropped.

On top of that, `npm run validate:links` checks every problem against **LeetCode's own public
problem index** — so no dead links, no wrong difficulty labels, no wrong premium flags. (Fetching
the problem pages directly returns 403; LeetCode blocks bots, which makes a page fetch useless as
a check. The index is the real ground truth.)

## Commands

```bash
npm install
npm run dev             # Vite dev server, opens the browser
npm run build           # regenerate data, validate, then build to dist/
npm test                # 72 tests
npm run validate        # content/ is well-formed
npm run validate:links  # ...and every problem is real, per LeetCode
npm run build:sheets    # regenerate sheets/ from content/
```

## Adding a problem

Add a row to the right file in `content/`:

```markdown
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | hash-map | Blind 75 |
```

Columns are **Problem · Difficulty · Patterns · Sheets**. Add 🔒 after the link if it needs
Premium. Keep each topic ordered Easy → Medium → Hard (a test enforces it). Then:

```bash
npm run build:data && npm run validate:links && npm run build:sheets
```

Striver's SDE sheet and Love Babbar's sheet slot in the same way — put `Striver SDE` or
`Love Babbar` in the Sheets column. Problem ids come from the LeetCode slug and never change, so
extending the dataset never disturbs progress anyone has already made.
