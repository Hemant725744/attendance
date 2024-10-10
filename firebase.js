// Import the functions you need from the Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVp3i_GKjonosfq_eoPmsUBvDdKOl9X4w",
  authDomain: "hocl-21161.firebaseapp.com",
  projectId: "hocl-21161",
  storageBucket: "hocl-21161.appspot.com",
  messagingSenderId: "104765908675",
  appId: "1:104765908675:web:b2297cd4bbf3573330e476",
  measurementId: "G-9HH28WS579"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore setup

export { auth, db, app };  // Export both Auth and Firestore
