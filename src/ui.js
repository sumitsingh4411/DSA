import { SHEETS, TIER_NAMES, isEssential } from './data.js';
import { nextProblems } from './recommend.js';

// The only module that touches the DOM.

const DIFF_BARS = { Easy: 1, Medium: 2, Hard: 3 };
const el = (tag, cls) => Object.assign(document.createElement(tag), cls ? { className: cls } : {});

function difficulty(p) {
  const box = el('span', 'diff');
  box.title = `${p.difficulty}`;

  const bars = el('span', 'diff__bars');
  for (let i = 1; i <= 3; i++) {
    const bar = document.createElement('i');
    if (i <= DIFF_BARS[p.difficulty]) bar.className = 'on';
    bars.append(bar);
  }
  box.append(bars, document.createTextNode(p.difficulty[0]));
  return box;
}

function pct(solved, total) {
  return total === 0 ? 0 : Math.round((solved / total) * 100);
}

export function renderRow(p, progress, handlers) {
  const solved = progress.isSolved(p.id);
  const row = el('div', `row${solved ? ' is-solved' : ''}`);
  row.dataset.id = p.id;

  const tick = el('button', 'row__tick');
  tick.type = 'button';
  tick.setAttribute('role', 'checkbox');
  tick.setAttribute('aria-checked', String(solved));
  tick.setAttribute('aria-label', `Mark ${p.title} solved`);
  tick.textContent = solved ? '✓' : '';
  tick.addEventListener('click', () => handlers.onToggleSolved(p.id));

  const star = el('button', 'row__star');
  star.type = 'button';
  star.setAttribute('aria-pressed', String(progress.isStarred(p.id)));
  star.setAttribute('aria-label', `Star ${p.title} for revision`);
  star.textContent = progress.isStarred(p.id) ? '★' : '☆';
  star.addEventListener('click', () => handlers.onToggleStarred(p.id));

  const link = el('a', 'row__link');
  link.href = p.url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = p.title;

  const tags = el('span', 'row__tags');

  // One pattern tag, so the row stays scannable; the rest live on the problem page.
  if (p.patterns?.[0]) {
    const t = el('span', 'tag');
    t.textContent = p.patterns[0];
    tags.append(t);
  }
  if (p.premium) {
    const t = el('span', 'tag tag--premium');
    t.textContent = 'premium';
    t.title = 'Needs a LeetCode Premium subscription to open';
    tags.append(t);
  }

  // Sheet membership as compact monograms rather than full-width badges.
  const monos = el('span', 'monos');
  if (isEssential(p)) {
    const m = el('span', 'mono mono--essential');
    m.textContent = '★';
    m.title = 'Essential Mix — on three or more sheets';
    monos.append(m);
  }
  for (const sheet of p.sheets ?? []) {
    const meta = SHEETS[sheet];
    if (!meta) continue;
    const m = el('span', `mono mono--${sheet}`);
    m.textContent = meta.short;
    m.title = meta.label;
    monos.append(m);
  }
  tags.append(monos, difficulty(p));

  row.append(tick, star, link, tags);
  return row;
}

function rowsOf(problems, progress, handlers) {
  const box = el('div', 'rows');
  for (const p of problems) box.append(renderRow(p, progress, handlers));
  return box;
}

export function renderNext(root, { problems, topics, progress }) {
  root.replaceChildren();

  const heading = el('h2', 'eyebrow');
  heading.id = 'next-h';
  heading.textContent = 'Solve next';
  root.append(heading);

  const queue = nextProblems(problems, topics, progress, 3);

  if (queue.length === 0) {
    const done = el('div', 'next__done');
    done.textContent =
      'Every problem is solved and nothing is starred. Star the ones that felt shaky and they will come back here for revision.';
    root.append(done);
    return;
  }

  const [first, ...rest] = queue;
  const topicName = topics.find((t) => t.id === first.topic)?.name ?? first.topic;

  const card = el('a', 'next__card');
  card.href = first.url;
  card.target = '_blank';
  card.rel = 'noopener';

  const body = el('div', 'next__body');
  const title = el('h3', 'next__title');
  title.textContent = first.title;
  const meta = el('p', 'next__meta');
  meta.textContent = [topicName, first.difficulty, ...(first.patterns ?? [])].join(' · ');
  body.append(title, meta);

  const go = el('span', 'next__go');
  go.textContent = 'Open on LeetCode ↗';

  card.append(body, go);
  root.append(card);

  if (rest.length > 0) {
    const then = el('p', 'next__then');
    then.append(document.createTextNode('then'));
    rest.forEach((p) => {
      const a = el('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = p.title;
      then.append(a);
    });
    root.append(then);
  }
}

export function renderMeter(root, { problems, progress }) {
  root.replaceChildren();

  const total = problems.length;
  const solved = problems.filter((p) => progress.isSolved(p.id)).length;

  const head = el('div', 'meter__head');
  const left = el('span');
  const strong = el('strong');
  strong.textContent = `${solved} of ${total}`;
  left.append(strong, document.createTextNode(' solved'));
  const right = el('span');
  right.textContent = `${pct(solved, total)}%`;
  head.append(left, right);

  const track = el('div', 'meter__track');
  const fill = el('div', 'meter__fill');
  fill.style.width = `${pct(solved, total)}%`;
  track.append(fill);

  const split = el('div', 'meter__split');
  for (const level of ['Easy', 'Medium', 'Hard']) {
    const inLevel = problems.filter((p) => p.difficulty === level);
    const doneInLevel = inLevel.filter((p) => progress.isSolved(p.id)).length;
    const item = el('span');
    const b = el('b');
    b.textContent = level;
    item.append(b, document.createTextNode(` ${doneInLevel}/${inLevel.length}`));
    split.append(item);
  }
  const starred = el('span');
  const sb = el('b');
  sb.textContent = 'Starred';
  starred.append(sb, document.createTextNode(` ${progress.stats().starredCount}`));
  split.append(starred);

  root.append(head, track, split);
}

// The track picker: the mix, the best-of, or one famous sheet on its own.
export function renderTracks(root, { tracks, mix, activeId, onPick }) {
  root.replaceChildren();

  const card = (id, label, blurb, solved, total, extraClass = '') => {
    const c = el('button', `track ${extraClass}${id === activeId ? ' is-on' : ''}`);
    c.type = 'button';
    c.setAttribute('aria-pressed', String(id === activeId));
    c.addEventListener('click', () => onPick(id));

    const top = el('span', 'track__top');
    const name = el('span', 'track__name');
    name.textContent = label;
    const count = el('span', 'track__count');
    count.textContent = `${solved}/${total}`;
    top.append(name, count);

    const bar = el('span', 'track__bar');
    const fill = el('span', 'track__fill');
    fill.style.width = `${pct(solved, total)}%`;
    bar.append(fill);

    const desc = el('span', 'track__blurb');
    desc.textContent = blurb;

    c.append(top, bar, desc);
    return c;
  };

  root.append(
    card('all', 'The Mix', 'Every problem from every sheet, merged into one beginner-to-advanced roadmap.', mix.solvedCount, mix.total, 'track--mix'),
  );
  for (const t of tracks) {
    root.append(card(t.id, t.label, t.blurb, t.solvedCount, t.total, t.id === 'essential' ? 'track--essential' : ''));
  }
}

// The category jump grid — click a card, land on that topic.
export function renderCategories(root, { groups, onJump }) {
  root.replaceChildren();

  for (const g of groups) {
    const done = g.solvedCount === g.problems.length && g.problems.length > 0;
    const card = el('button', `cat${done ? ' is-done' : ''}`);
    card.type = 'button';
    card.addEventListener('click', () => onJump(g.topic.id));

    const name = el('span', 'cat__name');
    name.textContent = g.topic.name;

    const meta = el('span', 'cat__meta');
    meta.textContent = `${g.solvedCount}/${g.problems.length}`;

    const bar = el('span', 'cat__bar');
    const fill = el('span', 'cat__fill');
    fill.style.width = `${pct(g.solvedCount, g.problems.length)}%`;
    bar.append(fill);

    card.append(name, bar, meta);
    root.append(card);
  }
}

export function renderTopicView(root, groups, progress, handlers, { heading } = {}) {
  root.replaceChildren();

  if (heading) {
    const h = el('div', 'trackhead');
    const t = el('h2', 'trackhead__title');
    t.textContent = heading.title;
    const s = el('p', 'trackhead__sub');
    s.textContent = heading.sub;
    h.append(t, s);
    root.append(h);
  }

  if (groups.length === 0) {
    root.append(emptyState());
    return;
  }

  // Tier bands only make sense on the full mix, where every tier is present.
  const showTiers = !heading;
  let tier = null;
  for (const group of groups) {
    if (showTiers && group.topic.tier !== tier) {
      tier = group.topic.tier;
      const band = el('div', 'tier');
      band.append(el('div', 'tier__rail'));
      const label = el('div', 'tier__label');
      const num = el('span');
      num.textContent = `Tier ${tier}`;
      label.append(num, document.createTextNode(` — ${TIER_NAMES[tier]}`));
      band.append(label);
      root.append(band);
    }

    const section = el('section', 'topic');
    section.id = `topic-${group.topic.id}`;

    const rail = el('div', 'topic__rail');
    rail.style.setProperty('--fill', `${pct(group.solvedCount, group.problems.length)}%`);

    const body = el('div', 'topic__body');

    const head = el('div', 'topic__head');
    const name = el('h2', 'topic__name');
    name.textContent = group.topic.name;
    const count = el('span', `topic__count${group.solvedCount === group.problems.length ? ' is-done' : ''}`);
    count.textContent = `${group.solvedCount}/${group.problems.length}`;
    head.append(name, count);

    const insight = el('p', 'topic__insight');
    insight.textContent = group.topic.insight;

    body.append(head, insight, rowsOf(group.problems, progress, handlers));
    section.append(rail, body);
    root.append(section);
  }
}

function emptyState() {
  const box = el('div', 'empty');
  box.textContent = 'No problems match these filters. Loosen one to see more.';
  return box;
}

export function renderTally(root, { problems, progress }) {
  const solved = problems.filter((p) => progress.isSolved(p.id)).length;
  root.replaceChildren();
  const b = el('b');
  b.textContent = String(solved);
  root.append(b, document.createTextNode(` / ${problems.length}`));
}

export function notify(root, message, kind = 'info') {
  root.textContent = message;
  root.dataset.kind = kind;
  root.hidden = false;
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => {
    root.hidden = true;
  }, 6000);
}
