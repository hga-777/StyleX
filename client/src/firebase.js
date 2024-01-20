// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stylex-caf1b.firebaseapp.com",
  projectId: "stylex-caf1b",
  storageBucket: "stylex-caf1b.appspot.com",
  messagingSenderId: "1094521261367",
  appId: "1:1094521261367:web:0acaf13b8f19440c669eb2",
  measurementId: "G-6EKESVKL7E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);