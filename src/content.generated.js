// GENERATED from content/*.md by scripts/parse-content.mjs — do not edit.
// Run `npm run build:data` after changing any file in content/.

export const topics = [
  {
    "id": "arrays-hashing",
    "name": "Arrays & Hashing",
    "tier": 1,
    "order": 1,
    "insight": "The warm-up round, and the one people underestimate. Interviewers are checking whether you reach for a hash map before a nested loop. Almost every optimisation here is 'trade memory for time' — say that out loud and you have shown the instinct they are testing."
  },
  {
    "id": "two-pointers",
    "name": "Two Pointers",
    "tier": 1,
    "order": 2,
    "insight": "Tests whether you notice that a sorted array lets you discard half the search space per step. The tell is a problem asking for a pair or a triplet under a constraint. If you sort first, justify the O(n log n) — they will ask."
  },
  {
    "id": "sliding-window",
    "name": "Sliding Window",
    "tier": 1,
    "order": 3,
    "insight": "The interviewer wants to see you convert an O(n·k) recomputation into an O(n) amortised scan. Fixed-size windows are mechanical; variable-size windows, where you shrink from the left on a violated constraint, are where candidates fall apart."
  },
  {
    "id": "stack",
    "name": "Stack",
    "tier": 1,
    "order": 4,
    "insight": "Stack problems are pattern-recognition problems. 'Next greater element', valid parentheses, and expression evaluation are all the same skill: knowing that the thing you need later is the thing you saw most recently. Monotonic stacks are the advanced form and appear often at senior level."
  },
  {
    "id": "binary-search",
    "name": "Binary Search",
    "tier": 1,
    "order": 5,
    "insight": "Everyone can binary search a sorted array. The interview version is 'binary search the answer' — searching over a range of possible answers rather than over the input. Getting the boundary conditions right, first try, without an off-by-one, is a real signal of care."
  },
  {
    "id": "prefix-sum",
    "name": "Prefix Sum",
    "tier": 1,
    "order": 6,
    "insight": "A cheap trick with an enormous payoff: precompute cumulative sums so any range query becomes O(1). Combined with a hash map it solves a whole family of subarray-sum problems that look much harder than they are."
  },
  {
    "id": "linked-list",
    "name": "Linked List",
    "tier": 2,
    "order": 7,
    "insight": "Rarely used in real work, reliably used in interviews, because pointer manipulation has nowhere to hide. Fast/slow pointers, reversal in place, and dummy-head nodes cover most of it. Draw the pointers on the whiteboard — interviewers reward it."
  },
  {
    "id": "trees",
    "name": "Trees",
    "tier": 2,
    "order": 8,
    "insight": "The highest-yield topic in the whole list. Nearly every tree problem is a traversal in disguise, so the question is really 'do you know what to compute on the way down versus on the way back up'. Master recursion here and graphs get much easier."
  },
  {
    "id": "tries",
    "name": "Tries",
    "tier": 2,
    "order": 9,
    "insight": "A narrow topic with an outsized presence at Google and Amazon, because autocomplete and prefix search are their bread and butter. If a problem mentions prefixes or a dictionary of words, the trie is almost certainly the intended answer."
  },
  {
    "id": "heap-priority-queue",
    "name": "Heap / Priority Queue",
    "tier": 2,
    "order": 10,
    "insight": "The answer whenever a problem says 'top k', 'k largest', or 'merge k'. The insight interviewers look for: you do not need to sort everything to find the top k — a heap of size k gets you O(n log k)."
  },
  {
    "id": "backtracking",
    "name": "Backtracking",
    "tier": 2,
    "order": 11,
    "insight": "Explicitly exploring a decision tree, and undoing your choice on the way out. Subsets, permutations, combinations, and N-Queens are one template with different pruning. Interviewers watch for whether you prune — brute force with no pruning reads as not understanding the problem."
  },
  {
    "id": "graphs",
    "name": "Graphs",
    "tier": 3,
    "order": 12,
    "insight": "The topic that separates mid from senior. Most 'hard' graph questions are BFS or DFS wearing a costume — a grid is a graph, a course schedule is a graph. The real skill is recognising the graph, then knowing BFS gives you shortest path on unweighted edges."
  },
  {
    "id": "advanced-graphs",
    "name": "Advanced Graphs",
    "tier": 3,
    "order": 13,
    "insight": "Dijkstra, union-find, topological sort, minimum spanning tree. You will not be asked to derive these; you will be asked to recognise which one applies and implement it cleanly under time pressure. Union-find in particular is short enough to memorise and pays for itself."
  },
  {
    "id": "dp-1d",
    "name": "1-D Dynamic Programming",
    "tier": 3,
    "order": 14,
    "insight": "Where most candidates lose the offer. The path that works: write the brute-force recursion, add memoisation, then convert to a table. Never start at the table — interviewers cannot follow it and neither can you under stress."
  },
  {
    "id": "dp-2d",
    "name": "2-D Dynamic Programming",
    "tier": 3,
    "order": 15,
    "insight": "Two changing inputs means a 2-D state. Grid paths, edit distance, and the knapsack family live here. State the meaning of dp[i][j] in one English sentence before writing anything — if you cannot, your recurrence will be wrong."
  },
  {
    "id": "greedy",
    "name": "Greedy",
    "tier": 3,
    "order": 16,
    "insight": "Deceptively hard, because a greedy solution is only correct if you can argue why the locally best choice is globally safe. Interviewers will ask for that argument. Never propose greedy without it — a wrong greedy is worse than a correct DP."
  },
  {
    "id": "intervals",
    "name": "Intervals",
    "tier": 3,
    "order": 17,
    "insight": "A small, extremely predictable family: sort by start (or end), then sweep. Meeting rooms and merge-intervals show up constantly at Amazon and Meta. Cheap points — do not leave them on the table."
  },
  {
    "id": "bit-manipulation",
    "name": "Bit Manipulation",
    "tier": 4,
    "order": 18,
    "insight": "Low frequency, high embarrassment when it appears. Know XOR's self-cancelling property, know n & (n-1) clears the lowest set bit, and you have covered most of what gets asked."
  },
  {
    "id": "math-geometry",
    "name": "Math & Geometry",
    "tier": 4,
    "order": 19,
    "insight": "Matrix rotation, spiral traversal, happy numbers. Rarely deep, frequently fiddly — these are tests of whether you can keep index arithmetic straight without panicking."
  },
  {
    "id": "dp-hard",
    "name": "Hard DP",
    "tier": 4,
    "order": 20,
    "insight": "Buy-and-sell-stock with state machines, palindrome partitioning, regex matching. Only worth your time once tiers 1 to 3 are solid. This is the tier that turns a hire into a strong hire, not the one that gets you the hire."
  }
];

export const problems = [
  {
    "id": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-set"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    "id": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-map",
      "counting"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/valid-anagram/"
  },
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-map"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/two-sum/"
  },
  {
    "id": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-map"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/group-anagrams/"
  },
  {
    "id": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "bucket-sort",
      "heap"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    "id": "encode-and-decode-strings",
    "title": "Encode and Decode Strings",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "design"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/encode-and-decode-strings/"
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "prefix-suffix"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    "id": "valid-sudoku",
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-set",
      "matrix"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/valid-sudoku/"
  },
  {
    "id": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topic": "arrays-hashing",
    "patterns": [
      "hash-set"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
  },
  {
    "id": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "two-pointers",
    "patterns": [
      "two-pointers"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/valid-palindrome/"
  },
  {
    "id": "two-sum-ii-input-array-is-sorted",
    "title": "Two Sum II — Input Array Is Sorted",
    "difficulty": "Medium",
    "topic": "two-pointers",
    "patterns": [
      "two-pointers"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
  },
  {
    "id": "3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "two-pointers",
    "patterns": [
      "two-pointers",
      "sorting"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/3sum/"
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "two-pointers",
    "patterns": [
      "greedy"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    "id": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topic": "two-pointers",
    "patterns": [
      "two-pointers",
      "monotonic-stack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/trapping-rain-water/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topic": "sliding-window",
    "patterns": [
      "greedy"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "sliding-window",
    "patterns": [
      "hash-set"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    "id": "longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "topic": "sliding-window",
    "patterns": [
      "counting"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
  },
  {
    "id": "permutation-in-string",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "topic": "sliding-window",
    "patterns": [
      "counting"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/permutation-in-string/"
  },
  {
    "id": "minimum-window-substring",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topic": "sliding-window",
    "patterns": [
      "hash-map"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    "id": "sliding-window-maximum",
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topic": "sliding-window",
    "patterns": [
      "monotonic-deque"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/sliding-window-maximum/"
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topic": "stack",
    "patterns": [
      "stack"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    "id": "min-stack",
    "title": "Min Stack",
    "difficulty": "Medium",
    "topic": "stack",
    "patterns": [
      "design"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/min-stack/"
  },
  {
    "id": "evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "topic": "stack",
    "patterns": [
      "stack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
  },
  {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "topic": "stack",
    "patterns": [
      "backtracking"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/generate-parentheses/"
  },
  {
    "id": "daily-temperatures",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topic": "stack",
    "patterns": [
      "monotonic-stack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/daily-temperatures/"
  },
  {
    "id": "car-fleet",
    "title": "Car Fleet",
    "difficulty": "Medium",
    "topic": "stack",
    "patterns": [
      "monotonic-stack",
      "sorting"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/car-fleet/"
  },
  {
    "id": "largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "stack",
    "patterns": [
      "monotonic-stack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
  },
  {
    "id": "binary-search",
    "title": "Binary Search",
    "difficulty": "Easy",
    "topic": "binary-search",
    "patterns": [
      "binary-search"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/binary-search/"
  },
  {
    "id": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "topic": "binary-search",
    "patterns": [
      "binary-search",
      "matrix"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/search-a-2d-matrix/"
  },
  {
    "id": "koko-eating-bananas",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "topic": "binary-search",
    "patterns": [
      "search-the-answer"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/koko-eating-bananas/"
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "binary-search",
    "patterns": [
      "binary-search"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "binary-search",
    "patterns": [
      "binary-search"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    "id": "time-based-key-value-store",
    "title": "Time Based Key-Value Store",
    "difficulty": "Medium",
    "topic": "binary-search",
    "patterns": [
      "design"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/time-based-key-value-store/"
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topic": "binary-search",
    "patterns": [
      "binary-search",
      "partition"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    "id": "range-sum-query-immutable",
    "title": "Range Sum Query — Immutable",
    "difficulty": "Easy",
    "topic": "prefix-sum",
    "patterns": [
      "prefix-sum",
      "design"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/range-sum-query-immutable/"
  },
  {
    "id": "find-pivot-index",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "topic": "prefix-sum",
    "patterns": [
      "prefix-sum"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/find-pivot-index/"
  },
  {
    "id": "subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topic": "prefix-sum",
    "patterns": [
      "prefix-sum",
      "hash-map"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
  },
  {
    "id": "contiguous-array",
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "topic": "prefix-sum",
    "patterns": [
      "prefix-sum",
      "hash-map"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/contiguous-array/"
  },
  {
    "id": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "linked-list",
    "patterns": [
      "pointers"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "linked-list",
    "patterns": [
      "dummy-head"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    "id": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topic": "linked-list",
    "patterns": [
      "fast-slow"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    "id": "reorder-list",
    "title": "Reorder List",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "fast-slow",
      "reversal"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/reorder-list/"
  },
  {
    "id": "remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "two-pointers"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },
  {
    "id": "copy-list-with-random-pointer",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "hash-map"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
  },
  {
    "id": "add-two-numbers",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "carry"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/add-two-numbers/"
  },
  {
    "id": "find-the-duplicate-number",
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "fast-slow"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/find-the-duplicate-number/"
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "topic": "linked-list",
    "patterns": [
      "design",
      "hash-map"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/lru-cache/"
  },
  {
    "id": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "topic": "linked-list",
    "patterns": [
      "heap",
      "divide-and-conquer"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  {
    "id": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/invert-binary-tree/"
  },
  {
    "id": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    "id": "diameter-of-binary-tree",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/diameter-of-binary-tree/"
  },
  {
    "id": "balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/balanced-binary-tree/"
  },
  {
    "id": "same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/same-tree/"
  },
  {
    "id": "subtree-of-another-tree",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/subtree-of-another-tree/"
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-search-tree",
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "bst"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
  },
  {
    "id": "binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "bfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    "id": "binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "bfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
  },
  {
    "id": "count-good-nodes-in-binary-tree",
    "title": "Count Good Nodes in Binary Tree",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/"
  },
  {
    "id": "validate-binary-search-tree",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "bst",
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    "id": "kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "bst",
      "inorder"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  },
  {
    "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "topic": "trees",
    "patterns": [
      "divide-and-conquer"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
  },
  {
    "id": "binary-tree-maximum-path-sum",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "topic": "trees",
    "patterns": [
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
  },
  {
    "id": "serialize-and-deserialize-binary-tree",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topic": "trees",
    "patterns": [
      "design",
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    "id": "implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "topic": "tries",
    "patterns": [
      "trie",
      "design"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
  },
  {
    "id": "design-add-and-search-words-data-structure",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "topic": "tries",
    "patterns": [
      "trie",
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
  },
  {
    "id": "word-search-ii",
    "title": "Word Search II",
    "difficulty": "Hard",
    "topic": "tries",
    "patterns": [
      "trie",
      "backtracking"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/word-search-ii/"
  },
  {
    "id": "kth-largest-element-in-a-stream",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "topic": "heap-priority-queue",
    "patterns": [
      "min-heap",
      "design"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
  },
  {
    "id": "last-stone-weight",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "topic": "heap-priority-queue",
    "patterns": [
      "max-heap"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/last-stone-weight/"
  },
  {
    "id": "k-closest-points-to-origin",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topic": "heap-priority-queue",
    "patterns": [
      "heap"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "topic": "heap-priority-queue",
    "patterns": [
      "quickselect",
      "heap"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
  },
  {
    "id": "task-scheduler",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "heap-priority-queue",
    "patterns": [
      "greedy",
      "heap"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/task-scheduler/"
  },
  {
    "id": "design-twitter",
    "title": "Design Twitter",
    "difficulty": "Medium",
    "topic": "heap-priority-queue",
    "patterns": [
      "design",
      "heap"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/design-twitter/"
  },
  {
    "id": "find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "topic": "heap-priority-queue",
    "patterns": [
      "two-heaps",
      "design"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/find-median-from-data-stream/"
  },
  {
    "id": "subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/subsets/"
  },
  {
    "id": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/combination-sum/"
  },
  {
    "id": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/permutations/"
  },
  {
    "id": "subsets-ii",
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking",
      "dedupe"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/subsets-ii/"
  },
  {
    "id": "combination-sum-ii",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking",
      "dedupe"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/combination-sum-ii/"
  },
  {
    "id": "word-search",
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking",
      "matrix"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/word-search/"
  },
  {
    "id": "palindrome-partitioning",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/palindrome-partitioning/"
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topic": "backtracking",
    "patterns": [
      "backtracking"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
  },
  {
    "id": "n-queens",
    "title": "N-Queens",
    "difficulty": "Hard",
    "topic": "backtracking",
    "patterns": [
      "backtracking",
      "pruning"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/n-queens/"
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "dfs",
      "bfs",
      "grid"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/number-of-islands/"
  },
  {
    "id": "max-area-of-island",
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "dfs",
      "grid"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/max-area-of-island/"
  },
  {
    "id": "clone-graph",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "dfs",
      "hash-map"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/clone-graph/"
  },
  {
    "id": "walls-and-gates",
    "title": "Walls and Gates",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "multi-source-bfs"
    ],
    "sheets": [],
    "premium": true,
    "url": "https://leetcode.com/problems/walls-and-gates/"
  },
  {
    "id": "rotting-oranges",
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "multi-source-bfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/rotting-oranges/"
  },
  {
    "id": "pacific-atlantic-water-flow",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "dfs",
      "grid"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    "id": "surrounded-regions",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "dfs",
      "grid"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/surrounded-regions/"
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "topological-sort",
      "cycle-detection"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/course-schedule/"
  },
  {
    "id": "course-schedule-ii",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "topological-sort"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/course-schedule-ii/"
  },
  {
    "id": "graph-valid-tree",
    "title": "Graph Valid Tree",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "union-find",
      "dfs"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/graph-valid-tree/"
  },
  {
    "id": "number-of-connected-components-in-an-undirected-graph",
    "title": "Number of Connected Components in an Undirected Graph",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "union-find"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
  },
  {
    "id": "redundant-connection",
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "topic": "graphs",
    "patterns": [
      "union-find"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/redundant-connection/"
  },
  {
    "id": "word-ladder",
    "title": "Word Ladder",
    "difficulty": "Hard",
    "topic": "graphs",
    "patterns": [
      "bfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/word-ladder/"
  },
  {
    "id": "network-delay-time",
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "topic": "advanced-graphs",
    "patterns": [
      "dijkstra"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/network-delay-time/"
  },
  {
    "id": "min-cost-to-connect-all-points",
    "title": "Min Cost to Connect All Points",
    "difficulty": "Medium",
    "topic": "advanced-graphs",
    "patterns": [
      "mst",
      "prim"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
  },
  {
    "id": "cheapest-flights-within-k-stops",
    "title": "Cheapest Flights Within K Stops",
    "difficulty": "Medium",
    "topic": "advanced-graphs",
    "patterns": [
      "bellman-ford"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  },
  {
    "id": "reconstruct-itinerary",
    "title": "Reconstruct Itinerary",
    "difficulty": "Hard",
    "topic": "advanced-graphs",
    "patterns": [
      "eulerian-path",
      "dfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/reconstruct-itinerary/"
  },
  {
    "id": "swim-in-rising-water",
    "title": "Swim in Rising Water",
    "difficulty": "Hard",
    "topic": "advanced-graphs",
    "patterns": [
      "dijkstra",
      "binary-search"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/swim-in-rising-water/"
  },
  {
    "id": "alien-dictionary",
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "topic": "advanced-graphs",
    "patterns": [
      "topological-sort"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/alien-dictionary/"
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "topic": "dp-1d",
    "patterns": [
      "fibonacci"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    "id": "min-cost-climbing-stairs",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "topic": "dp-1d",
    "patterns": [
      "bottom-up"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/min-cost-climbing-stairs/"
  },
  {
    "id": "house-robber",
    "title": "House Robber",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "bottom-up"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/house-robber/"
  },
  {
    "id": "house-robber-ii",
    "title": "House Robber II",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "bottom-up"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/house-robber-ii/"
  },
  {
    "id": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "expand-around-centre"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  {
    "id": "palindromic-substrings",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "expand-around-centre"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/palindromic-substrings/"
  },
  {
    "id": "decode-ways",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "bottom-up"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/decode-ways/"
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "unbounded-knapsack"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/coin-change/"
  },
  {
    "id": "maximum-product-subarray",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "kadane"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/maximum-product-subarray/"
  },
  {
    "id": "word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "bottom-up"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/word-break/"
  },
  {
    "id": "longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "lis",
      "binary-search"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    "id": "partition-equal-subset-sum",
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "0-1-knapsack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/partition-equal-subset-sum/"
  },
  {
    "id": "combination-sum-iv",
    "title": "Combination Sum IV",
    "difficulty": "Medium",
    "topic": "dp-1d",
    "patterns": [
      "unbounded-knapsack"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/combination-sum-iv/"
  },
  {
    "id": "unique-paths",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "grid-dp"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/unique-paths/"
  },
  {
    "id": "longest-common-subsequence",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "lcs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-common-subsequence/"
  },
  {
    "id": "coin-change-ii",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "unbounded-knapsack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/coin-change-ii/"
  },
  {
    "id": "target-sum",
    "title": "Target Sum",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "0-1-knapsack"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/target-sum/"
  },
  {
    "id": "interleaving-string",
    "title": "Interleaving String",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "grid-dp"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/interleaving-string/"
  },
  {
    "id": "edit-distance",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "topic": "dp-2d",
    "patterns": [
      "levenshtein"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/edit-distance/"
  },
  {
    "id": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "kadane"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    "id": "jump-game",
    "title": "Jump Game",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/jump-game/"
  },
  {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy",
      "bfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/jump-game-ii/"
  },
  {
    "id": "gas-station",
    "title": "Gas Station",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/gas-station/"
  },
  {
    "id": "hand-of-straights",
    "title": "Hand of Straights",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy",
      "counting"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/hand-of-straights/"
  },
  {
    "id": "merge-triplets-to-form-target-triplet",
    "title": "Merge Triplets to Form Target Triplet",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/"
  },
  {
    "id": "partition-labels",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy",
      "intervals"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/partition-labels/"
  },
  {
    "id": "valid-parenthesis-string",
    "title": "Valid Parenthesis String",
    "difficulty": "Medium",
    "topic": "greedy",
    "patterns": [
      "greedy"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/valid-parenthesis-string/"
  },
  {
    "id": "meeting-rooms",
    "title": "Meeting Rooms",
    "difficulty": "Easy",
    "topic": "intervals",
    "patterns": [
      "sorting"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/meeting-rooms/"
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "topic": "intervals",
    "patterns": [
      "sweep"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/insert-interval/"
  },
  {
    "id": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "intervals",
    "patterns": [
      "sorting",
      "sweep"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/merge-intervals/"
  },
  {
    "id": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topic": "intervals",
    "patterns": [
      "greedy",
      "sorting"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/non-overlapping-intervals/"
  },
  {
    "id": "meeting-rooms-ii",
    "title": "Meeting Rooms II",
    "difficulty": "Medium",
    "topic": "intervals",
    "patterns": [
      "heap",
      "sweep"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": true,
    "url": "https://leetcode.com/problems/meeting-rooms-ii/"
  },
  {
    "id": "single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "topic": "bit-manipulation",
    "patterns": [
      "xor"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/single-number/"
  },
  {
    "id": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topic": "bit-manipulation",
    "patterns": [
      "bit-tricks"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/number-of-1-bits/"
  },
  {
    "id": "counting-bits",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "topic": "bit-manipulation",
    "patterns": [
      "dp",
      "bit-tricks"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/counting-bits/"
  },
  {
    "id": "reverse-bits",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "topic": "bit-manipulation",
    "patterns": [
      "bit-tricks"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/reverse-bits/"
  },
  {
    "id": "missing-number",
    "title": "Missing Number",
    "difficulty": "Easy",
    "topic": "bit-manipulation",
    "patterns": [
      "xor",
      "math"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/missing-number/"
  },
  {
    "id": "sum-of-two-integers",
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topic": "bit-manipulation",
    "patterns": [
      "xor",
      "carry"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/sum-of-two-integers/"
  },
  {
    "id": "reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Medium",
    "topic": "bit-manipulation",
    "patterns": [
      "overflow"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/reverse-integer/"
  },
  {
    "id": "plus-one",
    "title": "Plus One",
    "difficulty": "Easy",
    "topic": "math-geometry",
    "patterns": [
      "math"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/plus-one/"
  },
  {
    "id": "happy-number",
    "title": "Happy Number",
    "difficulty": "Easy",
    "topic": "math-geometry",
    "patterns": [
      "fast-slow",
      "math"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/happy-number/"
  },
  {
    "id": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "matrix"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/rotate-image/"
  },
  {
    "id": "spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "matrix"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/spiral-matrix/"
  },
  {
    "id": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "matrix"
    ],
    "sheets": [
      "blind75"
    ],
    "premium": false,
    "url": "https://leetcode.com/problems/set-matrix-zeroes/"
  },
  {
    "id": "powx-n",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "fast-exponentiation"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/powx-n/"
  },
  {
    "id": "multiply-strings",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "math"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/multiply-strings/"
  },
  {
    "id": "detect-squares",
    "title": "Detect Squares",
    "difficulty": "Medium",
    "topic": "math-geometry",
    "patterns": [
      "design",
      "hash-map"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/detect-squares/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-with-cooldown",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "difficulty": "Medium",
    "topic": "dp-hard",
    "patterns": [
      "state-machine"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
  },
  {
    "id": "distinct-subsequences",
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "topic": "dp-hard",
    "patterns": [
      "grid-dp"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/distinct-subsequences/"
  },
  {
    "id": "longest-increasing-path-in-a-matrix",
    "title": "Longest Increasing Path in a Matrix",
    "difficulty": "Hard",
    "topic": "dp-hard",
    "patterns": [
      "memoised-dfs"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"
  },
  {
    "id": "burst-balloons",
    "title": "Burst Balloons",
    "difficulty": "Hard",
    "topic": "dp-hard",
    "patterns": [
      "interval-dp"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/burst-balloons/"
  },
  {
    "id": "regular-expression-matching",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "topic": "dp-hard",
    "patterns": [
      "grid-dp"
    ],
    "sheets": [],
    "premium": false,
    "url": "https://leetcode.com/problems/regular-expression-matching/"
  }
];
