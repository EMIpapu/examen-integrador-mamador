import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbpY5ExYDs0sUIyN3Q3ESwcTEYut0tmlU",
  authDomain: "desarrollo-web-d33fa.firebaseapp.com",
  databaseURL: "https://desarrollo-web-d33fa-default-rtdb.firebaseio.com",
  projectId: "desarrollo-web-d33fa",
  storageBucket: "desarrollo-web-d33fa.firebasestorage.app",
  messagingSenderId: "440926279001",
  appId: "1:440926279001:web:0b279212081c9a6569a848",
  measurementId: "G-6J3EMPRP5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database, analytics };
