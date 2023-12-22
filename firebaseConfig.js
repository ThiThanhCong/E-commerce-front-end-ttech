import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDxpnueqlrEm_eWIZ7IzvXUaX3VDeRUonY",
  authDomain: "fir-project-77658.firebaseapp.com",
  projectId: "fir-project-77658",
  storageBucket: "fir-project-77658.appspot.com",
  messagingSenderId: "252237841312",
  appId: "1:252237841312:web:8bde588c2ad105dbc51ac5",
  measurementId: "G-L57ZB531LE",
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
