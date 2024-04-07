// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-9cc51.firebaseapp.com",
  projectId: "estate-9cc51",
  storageBucket: "estate-9cc51.appspot.com",
  messagingSenderId: "114346345374",
  appId: "1:114346345374:web:e19a9b7eb3029923020c8f",
  measurementId: "G-4CM3QQQ3CV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
