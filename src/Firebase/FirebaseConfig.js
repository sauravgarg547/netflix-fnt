import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChlo2WUgqdj5OKmWpkxjfba8O7cgoCVrM",
  authDomain: "devops-app-aeae8.firebaseapp.com",
  projectId: "devops-app-aeae8",
  storageBucket: "devops-app-aeae8.appspot.com",
  messagingSenderId: "192182912372",
  appId: "1:192182912372:web:0384621390d3a112ba1821",
  measurementId: "G-8C2KMM93VV"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
