// Authentication & Firestore Authorization Management Service
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

import {
  auth,
  db,
  googleProvider,
  firebaseInitialized,
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from './firebase.js';

import { loadStorage, saveStorage, clearStorage } from './storage.js';

let authStateListeners = [];
let currentFirebaseUser = null;
let currentAdConfig = {
  enabled: true,
  web: {
    provider: "adsense",
    mode: "production",
    publisherId: "ca-pub-2296246438593583",
    adSlot: "7321969663"
  }
};
let adConfigListeners = [];

// Initialize real-time Firestore listener for dynamic ad config
if (firebaseInitialized && db) {
  try {
    const adDocRef = doc(db, 'system', 'admob');
    onSnapshot(adDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
          currentAdConfig = {
            enabled: data.enabled !== undefined ? data.enabled : true,
            web: {
              provider: "adsense",
              mode: data.web?.mode || "production",
              publisherId: data.web?.publisherId || "ca-pub-2296246438593583",
              adSlot: data.web?.adSlot || "7321969663"
            },
            // Preserve existing Android AdMob fields
            ...(data.android ? { android: data.android } : {}),
            ...(data.admob ? { admob: data.admob } : {})
          };
          notifyAdConfigListeners(currentAdConfig);
        }
      }
    }, (err) => {
      console.warn('Firestore ad config snapshot listener warning:', err.message);
    });
  } catch (err) {
    console.warn('Unable to subscribe to system/admob in Firestore:', err);
  }
}

if (firebaseInitialized && auth) {
  onAuthStateChanged(auth, async (user) => {
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

/**
 * Checks whether the active user is an authorized Super Admin.
 * Super admin authorization is backed by Firebase/Firestore security.
 */
export async function checkIsSuperAdmin(user = null) {
  const currentUser = user || getCurrentUser();
  if (!currentUser || currentUser.isGuest || !currentUser.uid || currentUser.uid === 'guest_user') {
    return false;
  }

  // 1. Check custom claim if available on token
  if (auth && auth.currentUser) {
    try {
      const idTokenResult = await auth.currentUser.getIdTokenResult();
      if (idTokenResult.claims.admin || idTokenResult.claims.superadmin) {
        return true;
      }
    } catch (e) {
      console.warn('Token claim check error:', e);
    }
  }

  // 2. Check user document in Firestore (`users/{uid}`) or `system/admob` admin list
  if (firebaseInitialized && db) {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.role === 'superadmin' || userData.role === 'admin' || userData.isSuperAdmin === true) {
          return true;
        }
      }

      // Check system/admob document for admin list
      const adDocRef = doc(db, 'system', 'admob');
      const adSnap = await getDoc(adDocRef);
      if (adSnap.exists()) {
        const adData = adSnap.data();
        if (adData.superAdmins && Array.isArray(adData.superAdmins) && adData.superAdmins.includes(currentUser.uid)) {
          return true;
        }
        if (adData.adminUids && Array.isArray(adData.adminUids) && adData.adminUids.includes(currentUser.uid)) {
          return true;
        }
      }
    } catch (e) {
      console.warn('Firestore admin check failed:', e);
    }
  }

  return false;
}

/**
 * Returns current AdSense configuration.
 */
export function getAdConfig() {
  return currentAdConfig;
}

/**
 * Subscribes to real-time ad configuration updates.
 */
export function subscribeAdConfig(callback) {
  adConfigListeners.push(callback);
  callback(currentAdConfig);
  return () => {
    adConfigListeners = adConfigListeners.filter(cb => cb !== callback);
  };
}

function notifyAdConfigListeners(config) {
  adConfigListeners.forEach(cb => cb(config));
}

/**
 * Saves Web AdSense configuration to Firestore `system/admob`.
 * Enforces Super Admin authorization on write and preserves Android AdMob fields.
 */
export async function saveAdConfigToFirestore(newWebConfig, enabled) {
  const user = getCurrentUser();
  const isSuperAdmin = await checkIsSuperAdmin(user);
  if (!isSuperAdmin) {
    throw new Error('Permission denied: Only an authorized Super Admin can modify AdSense settings.');
  }

  if (!firebaseInitialized || !db) {
    throw new Error('Firestore is unavailable. Unable to save configuration.');
  }

  try {
    const adDocRef = doc(db, 'system', 'admob');
    const existingSnap = await getDoc(adDocRef);
    let existingData = existingSnap.exists() ? existingSnap.data() : {};

    const updatedData = {
      ...existingData,
      enabled: Boolean(enabled),
      web: {
        provider: "adsense",
        mode: newWebConfig.mode || "production",
        publisherId: newWebConfig.publisherId || "ca-pub-2296246438593583",
        adSlot: newWebConfig.adSlot || "7321969663"
      },
      updatedAt: new Date().toISOString(),
      updatedBy: user.uid
    };

    await setDoc(adDocRef, updatedData, { merge: true });
    currentAdConfig = updatedData;
    notifyAdConfigListeners(currentAdConfig);
    return updatedData;
  } catch (err) {
    console.error('Error saving ad config to Firestore:', err);
    throw new Error('Failed to update settings in Firestore. Ensure your account has Super Admin permissions. (' + (err.message || '') + ')');
  }
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
