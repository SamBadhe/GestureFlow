import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  //Account with storage enabled
  apiKey: "AIzaSyB0jJelgoptbmztOfslGydaP1br8tigLmc",
  authDomain: "flutter-app-1811.firebaseapp.com",
  projectId: "flutter-app-1811",
  storageBucket: "flutter-app-1811.appspot.com",
  messagingSenderId: "10805628758",
  appId: "1:10805628758:web:1f007f83f8cd5db19250f7"

  // Account without Storage enabled.
  // apiKey: "AIzaSyDC9vr3ScGFdpxZAqrzKyeaVlLMkocmsDo",
  // authDomain: "react-app-41e3e.firebaseapp.com",
  // projectId: "react-app-41e3e",
  // storageBucket: "react-app-41e3e.firebasestorage.app",
  // messagingSenderId: "382693113743",
  // appId: "1:382693113743:web:a7031117c204ef5bfe15fa",
  // measurementId: "G-3G06G03EF9",
  
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
