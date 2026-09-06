// Authentication Management Service (Firebase Auth & Local Storage Sync)
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

import { auth, googleProvider, firebaseInitialized } from './firebase.js';
import { loadStorage, saveStorage, clearStorage } from './storage.js';

let authStateListeners = [];
let currentFirebaseUser = null;

if (firebaseInitialized && auth) {
  onAuthStateChanged(auth, (user) => {
    currentFirebaseUser = user;
    const store = loadStorage();
    if (user) {
      const formattedUser = {
        uid: user.uid,
        displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Learner'),
        email: user.email || '',
        isAnonymous: user.isAnonymous,
        isGuest: user.isAnonymous,
        providerId: user.providerData && user.providerData.length > 0 ? user.providerData[0].providerId : (user.isAnonymous ? 'anonymous' : 'password')
      };
      store.auth = {
        isLoggedIn: true,
        user: formattedUser
      };
      saveStorage(store);
      notifyListeners(formattedUser);
    } else {
      store.auth = {
        isLoggedIn: false,
        user: null
      };
      saveStorage(store);
      const guestUser = {
        uid: 'guest_user',
        displayName: 'Guest Learner',
        email: '',
        isGuest: true
      };
      notifyListeners(guestUser);
    }
  });
}

export function getFirebaseAuthInstance() {
  return auth;
}

export function getFirebaseUser() {
  return currentFirebaseUser || (auth ? auth.currentUser : null);
}

export function getCurrentUser() {
  if (currentFirebaseUser) {
    return {
      uid: currentFirebaseUser.uid,
      displayName: currentFirebaseUser.displayName || (currentFirebaseUser.email ? currentFirebaseUser.email.split('@')[0] : 'Learner'),
      email: currentFirebaseUser.email || '',
      isAnonymous: currentFirebaseUser.isAnonymous,
      isGuest: currentFirebaseUser.isAnonymous,
      providerId: currentFirebaseUser.providerData && currentFirebaseUser.providerData.length > 0 ? currentFirebaseUser.providerData[0].providerId : (currentFirebaseUser.isAnonymous ? 'anonymous' : 'password')
    };
  }
  const store = loadStorage();
  if (store.auth && store.auth.isLoggedIn && store.auth.user) {
    return store.auth.user;
  }
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

export async function loginAsGuest() {
  if (firebaseInitialized && auth) {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (e) {
      console.warn('Firebase Anonymous auth failed, using local guest fallback:', e);
    }
  }
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

export async function loginWithEmail(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both email address and password.');
  }
  if (firebaseInitialized && auth) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      throw formatAuthError(err);
    }
  } else {
    const user = {
      uid: 'user_' + Date.now(),
      displayName: email.split('@')[0],
      email: email,
      isGuest: false
    };
    const store = loadStorage();
    store.auth = { isLoggedIn: true, user: user };
    saveStorage(store);
    notifyListeners(user);
    return user;
  }
}

export async function registerWithEmail(email, password) {
  if (!email || !password) {
    throw new Error('Please enter email address and password.');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  if (firebaseInitialized && auth) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      throw formatAuthError(err);
    }
  } else {
    return loginWithEmail(email, password);
  }
}

export async function loginWithGoogle() {
  if (firebaseInitialized && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      throw formatAuthError(err);
    }
  } else {
    throw new Error('Google Sign-In is unavailable without an active Firebase Auth connection.');
  }
}

export async function logoutUser() {
  if (firebaseInitialized && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error signing out:', e);
    }
  }
  const store = loadStorage();
  store.auth = {
    isLoggedIn: false,
    user: null
  };
  saveStorage(store);
  const guestUser = getCurrentUser();
  notifyListeners(guestUser);
}

export async function deleteCurrentUserAccount() {
  const user = auth ? auth.currentUser : null;
  if (!user) {
    throw new Error('No active user session found to delete.');
  }
  try {
    await deleteUser(user);
    clearStorage();
    const guestUser = getCurrentUser();
    notifyListeners(guestUser);
  } catch (err) {
    throw formatAuthError(err);
  }
}

export async function reauthenticateEmailUser(password) {
  const user = auth ? auth.currentUser : null;
  if (!user || !user.email) {
    throw new Error('No active email user session found for re-authentication.');
  }
  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  } catch (err) {
    throw formatAuthError(err);
  }
}

export async function reauthenticateGoogleUser() {
  const user = auth ? auth.currentUser : null;
  if (!user) {
    throw new Error('No active user session found for Google re-authentication.');
  }
  try {
    await reauthenticateWithPopup(user, googleProvider);
  } catch (err) {
    throw formatAuthError(err);
  }
}

export function formatAuthError(err) {
  if (!err) return new Error('An unknown error occurred.');
  const code = err.code || '';
  const message = err.message || '';

  if (code === 'auth/requires-recent-login') {
    const error = new Error('This sensitive operation requires recent authentication. Please sign in again to verify account ownership.');
    error.code = code;
    return error;
  }
  if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    const error = new Error('Incorrect credentials or password provided. Please try again.');
    error.code = code;
    return error;
  }
  if (code === 'auth/user-not-found') {
    const error = new Error('No account found matching these credentials.');
    error.code = code;
    return error;
  }
  if (code === 'auth/email-already-in-use') {
    const error = new Error('An account with this email address already exists.');
    error.code = code;
    return error;
  }
  if (code === 'auth/invalid-email') {
    const error = new Error('Please enter a valid email address.');
    error.code = code;
    return error;
  }
  if (code === 'auth/weak-password') {
    const error = new Error('Password must be at least 6 characters long.');
    error.code = code;
    return error;
  }
  if (code === 'auth/popup-closed-by-user') {
    const error = new Error('Authentication popup was closed before completion. Please try again.');
    error.code = code;
    return error;
  }
  if (code === 'auth/popup-blocked') {
    const error = new Error('Sign-in popup was blocked by your browser. Please allow popups for this site.');
    error.code = code;
    return error;
  }
  if (code === 'auth/network-request-failed') {
    const error = new Error('Network error. Please check your internet connection and try again.');
    error.code = code;
    return error;
  }
  if (code === 'auth/unauthorized-domain') {
    const error = new Error('This domain is not authorized for Firebase Authentication in the Firebase Console.');
    error.code = code;
    return error;
  }
  const fallbackError = new Error(message || 'Authentication error occurred.');
  fallbackError.code = code;
  return fallbackError;
}
