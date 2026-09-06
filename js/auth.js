// Authentication Management Service (Guest Mode & Local / Firebase Auth Fallback)
import { loadStorage, saveStorage } from './storage.js';

let authStateListeners = [];

export function getCurrentUser() {
  const store = loadStorage();
  if (store.auth && store.auth.isLoggedIn && store.auth.user) {
    return store.auth.user;
  }
  // Default to Guest user if none
  return {
    uid: 'guest_user',
    displayName: 'Guest Learner',
    email: '',
    isGuest: true
  };
}

export function subscribeAuthState(callback) {
  authStateListeners.push(callback);
  callback(getCurrentUser());
  return () => {
    authStateListeners = authStateListeners.filter(cb => cb !== callback);
  };
}

function notifyListeners(user) {
  authStateListeners.forEach(cb => cb(user));
}

export function loginAsGuest() {
  const guestUser = {
    uid: 'guest_' + Date.now(),
    displayName: 'Guest Learner',
    email: '',
    isGuest: true
  };
  const store = loadStorage();
  store.auth = {
    isLoggedIn: true,
    user: guestUser
  };
  saveStorage(store);
  notifyListeners(guestUser);
  return guestUser;
}

export function loginWithEmail(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both email and password.');
  }
  const user = {
    uid: 'user_' + Date.now(),
    displayName: email.split('@')[0],
    email: email,
    isGuest: false
  };
  const store = loadStorage();
  store.auth = {
    isLoggedIn: true,
    user: user
  };
  saveStorage(store);
  notifyListeners(user);
  return user;
}

export function registerWithEmail(email, password) {
  if (!email || !password) {
    throw new Error('Please enter email and password.');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  return loginWithEmail(email, password);
}

export function logoutUser() {
  const store = loadStorage();
  store.auth = {
    isLoggedIn: false,
    user: null
  };
  saveStorage(store);
  const guestUser = getCurrentUser();
  notifyListeners(guestUser);
}
