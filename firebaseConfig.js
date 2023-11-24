import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7Xdgd5yudbgbknIdT0Y8ojffNPr9orfE",
  authDomain: "tech-product-website-selling.firebaseapp.com",
  projectId: "tech-product-website-selling",
  storageBucket: "tech-product-website-selling.appspot.com",
  messagingSenderId: "874254357157",
  appId: "1:874254357157:web:06ea4c4c5e60cd9699334c",
  measurementId: "G-4NNG7DWGBP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
