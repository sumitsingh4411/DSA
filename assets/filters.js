export function emptyFilterState() {
  return { search: '', difficulty: new Set(), sheet: null, status: 'all' };
}

function matchesSearch(problem, search) {
  const needle = search.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [problem.title, ...(problem.patterns ?? [])].join(' ').toLowerCase();
  return haystack.includes(needle);
}

function matchesStatus(problem, status, progress) {
  switch (status) {
    case 'solved':
      return progress.isSolved(problem.id);
    case 'unsolved':
      return !progress.isSolved(problem.id);
    case 'starred':
      return progress.isStarred(problem.id);
    default:
      return true;
  }
}

/** Pure. Preserves input order, so callers control ordering. */
export function applyFilters(problems, state, progress) {
  return problems.filter(
    (p) =>
      matchesSearch(p, state.search) &&
      (state.difficulty.size === 0 || state.difficulty.has(p.difficulty)) &&
      (state.sheet === null || (p.sheets ?? []).includes(state.sheet)) &&
      matchesStatus(p, state.status, progress),
  );
}
