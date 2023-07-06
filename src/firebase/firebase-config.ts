// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGgULhxDWu0chrzRJWX4mskai8AR5teyQ",
  authDomain: "findalawyer-8eb1b.firebaseapp.com",
  projectId: "findalawyer-8eb1b",
  storageBucket: "findalawyer-8eb1b.appspot.com",
  messagingSenderId: "920080353745",
  appId: "1:920080353745:web:a6e647f09fd7d25ad7b8f0",
  measurementId: "G-EJFY4WC25G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);
export const storage = getStorage(app);