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

/**
 * `storage` is anything with getItem/setItem — window.localStorage in the
 * browser, a plain object in tests. This is the only module that persists.
 */
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
      if (typeof obj.solved !== 'object' || obj.solved === null || Array.isArray(obj.solved)) {
        return { ok: false, error: 'file is missing a valid "solved" object' };
      }
      if (!Array.isArray(obj.starred)) {
        return { ok: false, error: 'file is missing a valid "starred" list' };
      }
      state = { version: VERSION, solved: { ...obj.solved }, starred: [...obj.starred] };
      save();
      return { ok: true };
    },
  };
}
