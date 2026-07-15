<div align="center">

# ⌁ Advancedsa

### A DSA roadmap for FAANG interviews — foundations to elite, with the tracking built in.

**251 problems · 20 topics · 4 famous sheets · ordered beginner → advanced**

[![▶ Open the site](https://img.shields.io/badge/▶_Open_the_site-e8a33d?style=for-the-badge&labelColor=10131a)](https://dsa-fawn-seven.vercel.app/)

![validate](https://github.com/sumitsingh4411/DSA/actions/workflows/validate.yml/badge.svg)
![problems](https://img.shields.io/badge/problems-251-e8a33d?labelColor=10131a)
![sheets](https://img.shields.io/badge/sheets-4-e8a33d?labelColor=10131a)
![tests](https://img.shields.io/badge/tests-79_passing-3fb950?labelColor=10131a)
![build](https://img.shields.io/badge/build-Vite-646cff?labelColor=10131a)

</div>

---

Most sheets hand you a wall of links and wish you luck. **Advancedsa is ordered** — every topic
sets up the next — and it tells you **which problem to solve today**, so you never open it and
stall on where to start.

Better still, it merges the four most famous FAANG sheets into **one** dataset. Solve *Two Sum*
once and it ticks on Blind 75, NeetCode 150, Striver, and Love Babbar at the same time — no
duplicate tracking, no five browser tabs.

<div align="center">

### → **[Launch the interactive tracker](https://dsa-fawn-seven.vercel.app/)** ←

</div>

---

## ✦ Pick how you want to work

The site opens with a **track picker**. Choose one and everything below adapts to it.

| Track | Problems | Who it's for |
|:--|:--:|:--|
| **The Mix** | 251 | Everything, as one beginner-to-advanced roadmap. The default. |
| ⭐ **Essential** | 71 | The **consensus core** — every problem here is on **3 or more** sheets. Do this if you do nothing else. |
| **Blind 75** | 75 | The original. The fastest credible pass over every core pattern. |
| **NeetCode 150** | 150 | Blind 75 plus 75 more — the most-followed roadmap online. |
| **Striver SDE** | 147 | takeuforward's SDE sheet — interview-weighted. |
| **Love Babbar** | 120 | The 450-style GfG sheet — broad, placement-focused. |

The **Essential** track isn't hand-picked — it's *computed* from the data: the problems every
famous sheet agrees are must-dos. It can never drift.

---

## ✦ The roadmap

Every topic is a file you can read right here on GitHub, and every one opens with **what
interviewers are actually testing** — the sentence you need to say out loud in the room. That's
the part other sheets leave out.

<table>
<tr><th align="left" colspan="3">🟢 &nbsp;Tier 1 · Foundations</th></tr>
<tr><td><a href="content/01-arrays-hashing.md">Arrays &amp; Hashing</a></td><td align="right"><code>24</code></td><td>reach for a hash map before a nested loop</td></tr>
<tr><td><a href="content/02-two-pointers.md">Two Pointers</a></td><td align="right"><code>8</code></td><td>a sorted array halves the search space</td></tr>
<tr><td><a href="content/03-sliding-window.md">Sliding Window</a></td><td align="right"><code>10</code></td><td>turn O(n·k) into one O(n) scan</td></tr>
<tr><td><a href="content/04-stack.md">Stack</a></td><td align="right"><code>13</code></td><td>the thing you need next is the thing you saw last</td></tr>
<tr><td><a href="content/05-binary-search.md">Binary Search</a></td><td align="right"><code>14</code></td><td>binary-search the answer, not just the array</td></tr>
<tr><td><a href="content/06-prefix-sum.md">Prefix Sum</a></td><td align="right"><code>6</code></td><td>precompute once, answer any range in O(1)</td></tr>

<tr><th align="left" colspan="3">🔵 &nbsp;Tier 2 · Core</th></tr>
<tr><td><a href="content/07-linked-list.md">Linked List</a></td><td align="right"><code>17</code></td><td>fast/slow pointers and dummy heads</td></tr>
<tr><td><a href="content/08-trees.md">Trees</a></td><td align="right"><code>25</code></td><td>compute on the way down vs. on the way up</td></tr>
<tr><td><a href="content/09-tries.md">Tries</a></td><td align="right"><code>6</code></td><td>prefix &amp; dictionary problems, solved cleanly</td></tr>
<tr><td><a href="content/10-heap-priority-queue.md">Heap / Priority Queue</a></td><td align="right"><code>9</code></td><td>top-k without sorting everything</td></tr>
<tr><td><a href="content/11-backtracking.md">Backtracking</a></td><td align="right"><code>13</code></td><td>explore the decision tree, and prune</td></tr>

<tr><th align="left" colspan="3">🟠 &nbsp;Tier 3 · Advanced</th></tr>
<tr><td><a href="content/12-graphs.md">Graphs</a></td><td align="right"><code>20</code></td><td>most hard problems are BFS/DFS in disguise</td></tr>
<tr><td><a href="content/13-advanced-graphs.md">Advanced Graphs</a></td><td align="right"><code>10</code></td><td>Dijkstra, union-find, topo sort — recognise which</td></tr>
<tr><td><a href="content/14-dp-1d.md">1-D Dynamic Programming</a></td><td align="right"><code>13</code></td><td>recursion → memoise → table, in that order</td></tr>
<tr><td><a href="content/15-dp-2d.md">2-D Dynamic Programming</a></td><td align="right"><code>10</code></td><td>state the meaning of dp[i][j] in one sentence</td></tr>
<tr><td><a href="content/16-greedy.md">Greedy</a></td><td align="right"><code>17</code></td><td>only if you can argue the local choice is safe</td></tr>
<tr><td><a href="content/17-intervals.md">Intervals</a></td><td align="right"><code>6</code></td><td>sort, then sweep — cheap points</td></tr>

<tr><th align="left" colspan="3">🔴 &nbsp;Tier 4 · Elite</th></tr>
<tr><td><a href="content/18-bit-manipulation.md">Bit Manipulation</a></td><td align="right"><code>10</code></td><td>XOR cancels; n &amp; (n-1) clears the low bit</td></tr>
<tr><td><a href="content/19-math-geometry.md">Math &amp; Geometry</a></td><td align="right"><code>11</code></td><td>keep the index arithmetic straight</td></tr>
<tr><td><a href="content/20-dp-hard.md">Hard DP</a></td><td align="right"><code>9</code></td><td>the tier that turns a hire into a strong hire</td></tr>
</table>

**Cross-cutting sheets**, each on its own:
[Blind 75](sheets/blind75.md) ·
[NeetCode 150](sheets/neetcode-150.md) ·
[Striver SDE](sheets/striver-sde.md) ·
[Love Babbar](sheets/love-babbar.md)

> Fork the repo and every checkbox above becomes yours to tick.

---

## ✦ How to actually use it

**Do the tiers in order.** Tier 1 is not beneath you — interviewers open with it, and the
instinct it builds is what the harder tiers stand on.

**Inside a topic, go Easy → Medium → Hard.** If a problem takes more than 45 minutes, read the
solution, understand it, ⭐ star it, and come back in a week. Grinding a problem whose shape you
can't see teaches you only that you can suffer.

**On the site:** pick a track, jump to any category, and let the dashboard point you at your next
three problems. Progress saves in your browser — no account, no server. **Export** moves it
between machines.

> 🔒 Seven problems need LeetCode Premium. They're flagged so you never hit a paywall by
> surprise. Skip them without guilt; none is load-bearing.

---

## ✦ Under the hood

<details>
<summary><b>How the data stays honest</b></summary>

<br>

`content/*.md` is the **single source of truth** — hand-editable markdown that renders as a study
sheet on GitHub *and* feeds the site. Everything else is generated:

```
content/*.md ──┬──> src/content.generated.js ──> the site
               └──> sheets/{blind75,neetcode-150,striver-sde,love-babbar}.md
```

Markdown is a fragile database, so the parser is strict on purpose: a bad difficulty, an unknown
sheet name, a malformed link, or a wrong column count **throws and names the file and the row**.
Nothing is ever silently dropped.

Problems link to **LeetCode or GeeksforGeeks** — Striver and Love Babbar lean heavily on GfG.
`npm run validate:links` checks every one at its source: LeetCode against its **public problem
index** (the pages 403 for bots, so a page fetch is useless — the index is ground truth), and GfG
over real HTTP. No dead links, no wrong difficulties, no wrong premium flags.

</details>

<details>
<summary><b>Run it locally</b></summary>

<br>

```bash
npm install
npm run dev             # Vite dev server, opens the browser
npm run build           # regenerate data, validate, then build to dist/
npm test                # 79 tests, zero dependencies
npm run validate        # content/ is well-formed
npm run validate:links  # ...and every problem still resolves at its source
npm run build:sheets    # regenerate the sheets/ markdown
```

Plain HTML, CSS, and vanilla ES modules on Vite. No framework, no runtime dependencies.

</details>

<details>
<summary><b>Add a problem</b></summary>

<br>

Add a row to the right file in `content/`:

```markdown
| [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | hash-map | Blind 75, NeetCode 150 |
```

Columns are **Problem · Difficulty · Patterns · Sheets**. Add 🔒 after the link for Premium.
Keep each topic Easy → Medium → Hard (a test enforces it). Then:

```bash
npm run build:data && npm run validate:links && npm run build:sheets
```

Problem ids come from the URL slug and never change, so extending the dataset never disturbs
progress anyone has already made.

</details>

---

<div align="center">

Built with restraint. One accent, earned in brass. &nbsp;·&nbsp; Good luck in the room. ⌁

</div>
