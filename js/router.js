// Hash Router for Static Web Application
import { getChapterById } from '../data/index.js';
import {
  renderHome,
  renderChapterDetail,
  renderLogin,
  renderRegister,
  renderProfile,
  renderSuperAdminAdSense,
  renderNotFound
} from './ui.js';
import { saveLastVisited } from './progress.js';

export function parseHashRoute() {
  const hash = window.location.hash.slice(1) || '/home';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0 || parts[0] === 'home') {
    return { route: 'home' };
  }

  if (parts[0] === 'login') {
    return { route: 'login' };
  }

  if (parts[0] === 'register') {
    return { route: 'register' };
  }

  if (parts[0] === 'profile') {
    return { route: 'profile' };
  }

  if (parts[0] === 'superadmin' || parts[0] === 'super-admin') {
    const subRoute = parts[1] || 'adsense';
    return { route: 'super-admin', subRoute };
  }

  if (parts[0] === 'chapter' && parts[1]) {
    const chapterId = parseInt(parts[1], 10);
    const section = parts[2] || 'overview';
    return { route: 'chapter', chapterId, section };
  }

  return { route: 'not-found' };
}

export async function handleRoute() {
  const routeData = parseHashRoute();
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  switch (routeData.route) {
    case 'home':
      renderHome(appContainer);
      break;

    case 'login':
      renderLogin(appContainer);
      break;

    case 'register':
      renderRegister(appContainer);
      break;

    case 'profile':
      await renderProfile(appContainer);
      break;

    case 'super-admin':
      await renderSuperAdminAdSense(appContainer);
      break;

    case 'chapter':
      const chapter = getChapterById(routeData.chapterId);
      if (chapter) {
        saveLastVisited(chapter.id, routeData.section);
        renderChapterDetail(appContainer, chapter, routeData.section);
      } else {
        renderNotFound(appContainer);
      }
      break;

    default:
      renderNotFound(appContainer);
      break;
  }

  window.scrollTo(0, 0);
}

export function navigateTo(hashPath) {
  window.location.hash = hashPath;
}
