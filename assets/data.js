import { roadmapOrder } from './recommend.js';

export const SHEETS = {
  blind75: 'Blind 75',
  'striver-sde': 'Striver SDE',
  'love-babbar': 'Love Babbar',
};

export const TIER_NAMES = { 1: 'Foundations', 2: 'Core', 3: 'Advanced', 4: 'Elite' };

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
      const list = byTopic.get(topic.id);
      return {
        topic,
        problems: list,
        solvedCount: list.filter((p) => progress.isSolved(p.id)).length,
      };
    });
}

export function groupBySheet(problems, topics, progress) {
  const ordered = roadmapOrder(problems, topics);

  return Object.entries(SHEETS)
    .map(([id, label]) => {
      const list = ordered.filter((p) => (p.sheets ?? []).includes(id));
      return {
        id,
        label,
        problems: list,
        solvedCount: list.filter((p) => progress.isSolved(p.id)).length,
      };
    })
    .filter((sheet) => sheet.problems.length > 0);
}
