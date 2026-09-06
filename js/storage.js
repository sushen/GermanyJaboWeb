// LocalStorage abstraction layer with safe error handling and versioning
const STORAGE_KEY = 'germana1_user_data_v1';

const defaultData = {
  version: 1,
  progress: {
    completedChapters: [], // e.g. [1, 2]
    completedExercises: {}, // e.g. { "ex1_1": true }
    scores: {}, // e.g. { 1: 100 }
    lastVisitedChapter: 1,
    lastVisitedSection: 'overview'
  },
  settings: {
    soundEnabled: true,
    theme: 'dark'
  },
  auth: {
    isLoggedIn: false,
    user: null // { uid, email, displayName, isGuest }
  }
};

export function loadStorage() {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (!dataStr) return { ...defaultData };
    const parsed = JSON.parse(dataStr);
    return { ...defaultData, ...parsed };
  } catch (e) {
    console.error('Failed to load localStorage data:', e);
    return { ...defaultData };
  }
}

export function saveStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
  }
}
