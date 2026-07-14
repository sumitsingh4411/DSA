import { loadData, groupByTopic, groupBySheet } from './data.js';
import { createProgress } from './progress.js';
import { applyFilters, emptyFilterState } from './filters.js';
import * as ui from './ui.js';

const $ = (sel) => document.querySelector(sel);

const progress = createProgress(window.localStorage);
const state = { view: 'topic', filters: emptyFilterState() };

const { problems, topics } = await loadData();

const handlers = {
  onToggleSolved(id) {
    progress.toggleSolved(id);
    render();
  },
  onToggleStarred(id) {
    progress.toggleStarred(id);
    render();
  },
};

function render() {
  const visible = applyFilters(problems, state.filters, progress);

  ui.renderNext($('#next'), { problems, topics, progress });
  ui.renderMeter($('#meter'), { problems, progress });
  ui.renderTally($('#tally'), { problems, progress });

  const list = $('#list');
  if (state.view === 'topic') {
    ui.renderTopicView(list, groupByTopic(visible, topics, progress), progress, handlers);
  } else {
    ui.renderSheetView(list, groupBySheet(visible, topics, progress), progress, handlers);
  }
}

/* ---------- theme ---------- */

const THEME_KEY = 'advancedsa.theme';
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

$('#theme').addEventListener('click', () => {
  const current =
    document.documentElement.dataset.theme ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
});

/* ---------- view switch ---------- */

for (const btn of document.querySelectorAll('.views__btn')) {
  btn.addEventListener('click', () => {
    state.view = btn.dataset.view;
    for (const other of document.querySelectorAll('.views__btn')) {
      const on = other === btn;
      other.classList.toggle('is-on', on);
      other.setAttribute('aria-selected', String(on));
    }
    render();
  });
}

/* ---------- filters ---------- */

$('#search').addEventListener('input', (e) => {
  state.filters.search = e.target.value;
  render();
});

for (const chip of document.querySelectorAll('[data-difficulty]')) {
  chip.addEventListener('click', () => {
    const level = chip.dataset.difficulty;
    if (state.filters.difficulty.has(level)) state.filters.difficulty.delete(level);
    else state.filters.difficulty.add(level);
    chip.classList.toggle('is-on', state.filters.difficulty.has(level));
    render();
  });
}

for (const chip of document.querySelectorAll('[data-status]')) {
  chip.addEventListener('click', () => {
    state.filters.status = chip.dataset.status;
    for (const other of document.querySelectorAll('[data-status]')) {
      other.classList.toggle('is-on', other === chip);
    }
    render();
  });
}

/* ---------- export / import ---------- */

function exportProgress() {
  const blob = new Blob([JSON.stringify(progress.export(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `advancedsa-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  ui.notify($('#notice'), 'Progress saved to your downloads.');
}

$('#export').addEventListener('click', exportProgress);
$('#export2').addEventListener('click', exportProgress);

$('#import').addEventListener('click', () => $('#file').click());

$('#file').addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const result = progress.import(JSON.parse(await file.text()));
    if (!result.ok) {
      ui.notify($('#notice'), `That file could not be loaded: ${result.error}`, 'error');
    } else {
      ui.notify($('#notice'), `Loaded ${progress.stats().solvedCount} solved problems.`);
      render();
    }
  } catch {
    ui.notify($('#notice'), 'That file is not valid JSON. Your progress is unchanged.', 'error');
  }
  e.target.value = '';
});

/* ---------- keyboard ---------- */

let activeIndex = -1;

function rows() {
  return [...document.querySelectorAll('.row')];
}

function setActive(index) {
  const all = rows();
  if (all.length === 0) return;
  activeIndex = Math.max(0, Math.min(index, all.length - 1));
  all.forEach((row, i) => row.classList.toggle('is-active', i === activeIndex));
  all[activeIndex].scrollIntoView({ block: 'nearest' });
}

document.addEventListener('keydown', (e) => {
  const typing = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

  if (e.key === '/' && !typing) {
    e.preventDefault();
    $('#search').focus();
    return;
  }
  if (e.key === 'Escape' && typing) {
    e.target.blur();
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

  if (e.key === 'j') setActive(activeIndex + 1);
  else if (e.key === 'k') setActive(activeIndex - 1);
  else if (e.key === 'x' || e.key === 's') {
    const row = rows()[activeIndex];
    if (!row) return;
    const id = row.dataset.id;
    // Re-render replaces the rows, so re-apply the active marker afterwards.
    if (e.key === 'x') handlers.onToggleSolved(id);
    else handlers.onToggleStarred(id);
    setActive(activeIndex);
  }
});

render();
