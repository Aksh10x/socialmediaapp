// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnJ1U8NDQaqYYUec1KKj4QnFeegKi2htc",
  authDomain: "smapp-18869.firebaseapp.com",
  projectId: "smapp-18869",
  storageBucket: "smapp-18869.firebasestorage.app",
  messagingSenderId: "1003514542145",
  appId: "1:1003514542145:web:5e2868141ca9c602a52ec0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider();
export const database = getFirestore();