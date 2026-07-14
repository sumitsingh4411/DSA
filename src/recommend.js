const DIFFICULTY_RANK = { Easy: 0, Medium: 1, Hard: 2 };

// Topics not present in topics.json sort last rather than throwing, so a
// half-finished data edit degrades instead of breaking the page.
const UNKNOWN_TOPIC = [99, 99];

export function roadmapOrder(problems, topics) {
  const topicRank = new Map(topics.map((t) => [t.id, [t.tier, t.order]]));

  return [...problems].sort((a, b) => {
    const [aTier, aOrder] = topicRank.get(a.topic) ?? UNKNOWN_TOPIC;
    const [bTier, bOrder] = topicRank.get(b.topic) ?? UNKNOWN_TOPIC;
    if (aTier !== bTier) return aTier - bTier;
    if (aOrder !== bOrder) return aOrder - bOrder;

    const byDifficulty = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
    if (byDifficulty !== 0) return byDifficulty;

    // Tie-break: Blind 75 is the highest-signal list, so do those first.
    const aBlind = (a.sheets ?? []).includes('blind75') ? 0 : 1;
    const bBlind = (b.sheets ?? []).includes('blind75') ? 0 : 1;
    return aBlind - bBlind;
  });
}

/**
 * The next problems to solve: the first `count` unsolved problems in roadmap
 * order. Once everything is solved, fall back to revising starred problems,
 * least recently solved first.
 */
export function nextProblems(problems, topics, progress, count = 3) {
  const unsolved = roadmapOrder(problems, topics).filter((p) => !progress.isSolved(p.id));
  if (unsolved.length > 0) return unsolved.slice(0, count);

  return problems
    .filter((p) => progress.isStarred(p.id))
    .sort((a, b) => (progress.solvedAt(a.id) ?? '').localeCompare(progress.solvedAt(b.id) ?? ''))
    .slice(0, count);
}
