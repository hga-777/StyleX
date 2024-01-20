// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mauth-4d93d.firebaseapp.com",
  projectId: "mauth-4d93d",
  storageBucket: "mauth-4d93d.appspot.com",
  messagingSenderId: "501443413954",
  appId: "1:501443413954:web:5deb16f391a1f7bccb785b",
  measurementId: "G-THLYD3LW2Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);