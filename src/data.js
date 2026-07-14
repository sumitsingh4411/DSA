import { roadmapOrder } from './recommend.js';

// The famous FAANG sheets, in the order they're offered. `short` is the compact
// monogram used on dense problem rows; `blurb` describes the track in the picker.
export const SHEETS = {
  blind75: { label: 'Blind 75', short: '75', blurb: 'The original 75. The fastest credible pass over every core pattern.' },
  'neetcode-150': { label: 'NeetCode 150', short: 'N150', blurb: "Blind 75 plus 75 more — the most-followed roadmap on the internet." },
  'striver-sde': { label: 'Striver SDE', short: 'SDE', blurb: "takeuforward's SDE sheet — day-by-day, interview-weighted." },
  'love-babbar': { label: 'Love Babbar', short: 'LB', blurb: "The 450-style GfG sheet — broad, placement-focused." },
};

// A computed "best of": problems that appear on at least this many of the four
// sheets. Not stored per problem — derived — so it can never drift from the data.
export const ESSENTIAL_ID = 'essential';
export const ESSENTIAL_MIN_SHEETS = 3;
export const ESSENTIAL_META = {
  label: 'Essential Mix',
  short: '★',
  blurb: 'The consensus core — every problem here is on three or more of the sheets above. Do this if you do nothing else.',
};

export const TIER_NAMES = { 1: 'Foundations', 2: 'Core', 3: 'Advanced', 4: 'Elite' };

export function isEssential(problem) {
  return (problem.sheets ?? []).length >= ESSENTIAL_MIN_SHEETS;
}

/** Every selectable track, real sheets plus the computed Essential Mix, with live counts. */
export function sheetTracks(problems, progress) {
  const track = (id, meta, belongs) => {
    const list = problems.filter(belongs);
    return {
      id,
      ...meta,
      total: list.length,
      solvedCount: list.filter((p) => progress.isSolved(p.id)).length,
    };
  };

  return [
    track(ESSENTIAL_ID, ESSENTIAL_META, isEssential),
    ...Object.entries(SHEETS).map(([id, meta]) =>
      track(id, meta, (p) => (p.sheets ?? []).includes(id)),
    ),
  ];
}

function belongsToSheet(problem, sheetId) {
  return sheetId === ESSENTIAL_ID ? isEssential(problem) : (problem.sheets ?? []).includes(sheetId);
}

export const MIX_ID = 'all';

/** The problems in a chosen track. 'all' is the whole mix; otherwise one sheet or the Essential Mix. */
export function trackProblems(problems, trackId) {
  return trackId === MIX_ID ? problems : problems.filter((p) => belongsToSheet(p, trackId));
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
      const list = byTopic.get(topic.id);
      return {
        topic,
        problems: list,
        solvedCount: list.filter((p) => progress.isSolved(p.id)).length,
      };
    });
}

/**
 * One chosen sheet, grouped by topic so it reads as a focused study path rather
 * than a flat list. `sheetId` is a real sheet id or ESSENTIAL_ID.
 */
export function sheetByTopic(problems, topics, progress, sheetId) {
  const inSheet = problems.filter((p) => belongsToSheet(p, sheetId));
  return groupByTopic(inSheet, topics, progress);
}
