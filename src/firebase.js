// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABfjgwOfdwgv5x9ZHRFRdJth8-9goAG7o",
  authDomain: "byteforge-1804b.firebaseapp.com",
  projectId: "byteforge-1804b",
  storageBucket: "byteforge-1804b.firebasestorage.app",
  messagingSenderId: "312342387619",
  appId: "1:312342387619:web:dac39a3c0cc296d1491816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);