// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC8CJlAj81xqZX_IuBQbJa26tziwwHL39g",
  authDomain: "ai-trip-planner-8edec.firebaseapp.com",
  projectId: "ai-trip-planner-8edec",
  storageBucket: "ai-trip-planner-8edec.firebasestorage.app",
  messagingSenderId: "315882635241",
  appId: "1:315882635241:web:a7267904ece02033c3d578",
  measurementId: "G-2XLZSKS1Q3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
