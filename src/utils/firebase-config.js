import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC9vr3ScGFdpxZAqrzKyeaVlLMkocmsDo",
  authDomain: "react-app-41e3e.firebaseapp.com",
  projectId: "react-app-41e3e",
  storageBucket: "react-app-41e3e.firebasestorage.app",
  messagingSenderId: "382693113743",
  appId: "1:382693113743:web:a7031117c204ef5bfe15fa",
  measurementId: "G-3G06G03EF9",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
