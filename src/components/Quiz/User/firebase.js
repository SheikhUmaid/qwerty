// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFcjuihiyV2sEnUyBzPEHAplA6Xmow8r0",
  authDomain: "qwertywebsite-2025.firebaseapp.com",
  projectId: "qwertywebsite-2025",
  storageBucket: "qwertywebsite-2025.firebasestorage.app",
  messagingSenderId: "722532616937",
  appId: "1:722532616937:web:96ab6e8fd6518a61d6be78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
