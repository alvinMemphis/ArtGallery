import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
var firebaseConfig = {
  apiKey: "AIzaSyBbkn86NAs0iCCE6i3dMjxctS-r93_d50s",
  authDomain: "artgallery-4c02e.firebaseapp.com",
  databaseURL: "https://artgallery-4c02e.firebaseio.com",
  projectId: "artgallery-4c02e",
  storageBucket: "artgallery-4c02e.appspot.com",
  messagingSenderId: "955387804026",
  appId: "1:955387804026:web:d9fa5f3954d08b61983ec3",
  measurementId: "G-E986Y4Q017",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    //console.error("Firebase initialization error", err.stack);
  }
}
// Get a reference to the database service
export const auth = getAuth(app);
export const db = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
