// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "quickbites-4ec8a.firebaseapp.com",
  projectId: "quickbites-4ec8a",
  storageBucket: "quickbites-4ec8a.firebasestorage.app",
  messagingSenderId: "199122497457",
  appId: "1:199122497457:web:99d2a633bc8b261dc0d790"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};