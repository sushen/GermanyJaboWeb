// Navigation initialization
import { handleRoute } from './router.js';

export function initApp() {
  window.addEventListener('hashchange', handleRoute);
  // Initial route handling
  handleRoute();
}
