# Advancedsa

A DSA roadmap for FAANG interviews — foundations to elite, with the tracking built in.

**[▶ Open the site](https://sumitgithub1001.github.io/Advancedsa/)**

> **Before you publish:** the site URL above and the one in `scripts/build-sheets.mjs`
> (the `SITE` constant) assume the GitHub username `sumitgithub1001`. If yours is
> different, change that one constant and run `npm run build:sheets`.

Most sheets hand you a list of links and wish you luck. This one is ordered — 153 problems
across 20 topics, arranged so each topic sets up the next — and it tells you which problem to
solve today so you never open it and wonder where to start.

## What's here

**A roadmap, not a pile.** Four tiers, in the order a person actually learns them:

| Tier | | Topics |
|---|---|---|
| **1** | Foundations | Arrays & Hashing · Two Pointers · Sliding Window · Stack · Binary Search · Prefix Sum |
| **2** | Core | Linked List · Trees · Tries · Heap / Priority Queue · Backtracking |
| **3** | Advanced | Graphs · Advanced Graphs · 1-D DP · 2-D DP · Greedy · Intervals |
| **4** | Elite | Bit Manipulation · Math & Geometry · Hard DP |

**What interviewers are actually testing.** Every topic opens with it. Not "arrays are a data
structure" — the thing you need to say out loud in the room to show you understand *why* the
problem was chosen.

**All 75 of Blind 75**, plus the topic spine that fills the gaps Blind 75 leaves thin.

## Read it here, or track it on the site

**Read it on GitHub:**

- **[The roadmap](sheets/by-topic.md)** — all 153, by topic, beginner to advanced. Start here.
- **[Blind 75](sheets/blind75.md)** — the classic list on its own.

Fork the repo and the checkboxes become yours to tick.

**Or use the site**, which additionally: tells you your next three problems, tracks solved and
starred, filters by difficulty and status, and shows a rail down the page that fills as you climb.

Progress is saved in your browser — no account, no server, nothing to sign up for. Use **Export**
to move it to another machine.

## How to use it

Do the tiers in order. Tier 1 is not optional, and it is not beneath you: interviewers open with
it, and the instinct it builds ("reach for a hash map before a nested loop") is what the harder
tiers are built on.

Inside a topic, go Easy → Medium → Hard. If a problem takes more than 45 minutes, read the
solution, understand it, star it, and come back in a week. Grinding a problem you cannot see the
shape of teaches you nothing except that you can suffer.

Seven problems are marked `premium` — they need a LeetCode subscription. They're flagged so you
don't hit a paywall by surprise. Skip them without guilt; none is load-bearing.

## How the data works

`data/problems.json` is the single source of truth. Everything else is derived from it:

```
data/problems.json ──┬──> the site (index.html + assets/)
                     └──> sheets/*.md  (generated — never edit these by hand)
```

Every problem's slug, difficulty and premium flag is checked against LeetCode's own public
problem index, so nothing here is a dead link or a wrong label.

```bash
npm test                # the logic: 51 tests, no dependencies
npm run validate        # data integrity
npm run validate:links  # ...plus verify every problem against LeetCode
npm run build:sheets    # regenerate sheets/ from the data
npm run serve           # http://localhost:8000
```

The site is plain HTML, CSS and vanilla ES modules. No framework, no bundler, no runtime
dependencies. It does need to be *served* rather than opened from disk — browsers block ES
modules on `file://` — which `npm run serve` handles, and GitHub Pages handles for free.

## Adding the other sheets

Striver's SDE sheet and Love Babbar's sheet slot in by adding `"striver-sde"` or `"love-babbar"`
to a problem's `sheets` array (and adding any problems that aren't here yet). Problem ids are
permanent, so extending the dataset never disturbs progress anyone has already made.

Run `npm run validate:links` before committing. It will refuse anything that isn't real.
