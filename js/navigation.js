// Navigation initialization and Auth Sync
import { handleRoute } from './router.js';
import { subscribeAuthState } from './auth.js';

export function initApp() {
  window.addEventListener('hashchange', () => handleRoute());

  // Listen to Auth State Changes to update Header/UI dynamically
  subscribeAuthState(() => {
    handleRoute();
  });
}
