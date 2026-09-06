// Progress tracking service
import { loadStorage, saveStorage } from './storage.js';

export function getProgress() {
  const store = loadStorage();
  return store.progress;
}

export function saveLastVisited(chapterId, section) {
  const store = loadStorage();
  store.progress.lastVisitedChapter = parseInt(chapterId, 10);
  store.progress.lastVisitedSection = section || 'overview';
  saveStorage(store);
}

export function markChapterCompleted(chapterId) {
  const store = loadStorage();
  const cId = parseInt(chapterId, 10);
  if (!store.progress.completedChapters.includes(cId)) {
    store.progress.completedChapters.push(cId);
    saveStorage(store);
  }
}

export function saveExerciseScore(chapterId, scorePercent) {
  const store = loadStorage();
  const cId = parseInt(chapterId, 10);
  store.progress.scores[cId] = scorePercent;
  if (scorePercent >= 70) {
    markChapterCompleted(cId);
  }
  saveStorage(store);
}

export function getOverallProgressPercent(totalChapters = 12) {
  const progress = getProgress();
  const completedCount = progress.completedChapters.length;
  return Math.min(100, Math.round((completedCount / totalChapters) * 100));
}
