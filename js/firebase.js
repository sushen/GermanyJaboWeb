// Reusable Firebase Initialization Module (Web SDK v12.18.0)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyCLyp98w1k9bBWv6h5VkO2gsK-_kelIbmE",
  authDomain: "germanyjabo.firebaseapp.com",
  projectId: "germanyjabo",
  storageBucket: "germanyjabo.firebasestorage.app",
  messagingSenderId: "111352436164",
  appId: "1:111352436164:web:c9b964e0b715ed80544091",
  measurementId: "G-8KKEZVNKFE"
};

let app = null;
let auth = null;
let analytics = null;
let googleProvider = null;
let firebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsErr) {
      console.warn('Firebase Analytics initialization skipped or offline:', analyticsErr);
    }
  }
  firebaseInitialized = true;
} catch (e) {
  console.warn('Firebase initialization failed or offline mode fallback:', e);
}

export { app, auth, analytics, googleProvider, firebaseInitialized, firebaseConfig };
