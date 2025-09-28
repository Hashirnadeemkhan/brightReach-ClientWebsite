import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQoJZZHBFOizE2w1D9FCzDBuYmSw0oT8",
  authDomain: "kodeaffinity-adminpage.firebaseapp.com",
  databaseURL: "https://kodeaffinity-adminpage-default-rtdb.firebaseio.com",
  projectId: "kodeaffinity-adminpage",
  storageBucket: "kodeaffinity-adminpage.appspot.com", // Update this to your storage bucket
  messagingSenderId: "417980972148",
  appId: "1:417980972148:web:bda10d784e8b2cf9692521",
  measurementId: "G-Y9YPBYFLKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize Firebase Analytics only on the client-side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);
export const auth = getAuth(app)

export const database = getDatabase(app)

export { db}; // Export storage along with db