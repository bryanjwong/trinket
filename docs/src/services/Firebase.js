import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeUCYJiuwQAGqo0DKDAUweoPdzzpPnK5w",
  authDomain: "trinket-ideahacks.firebaseapp.com",
  databaseURL: "https://trinket-ideahacks-default-rtdb.firebaseio.com",
  projectId: "trinket-ideahacks",
  storageBucket: "trinket-ideahacks.appspot.com",
  messagingSenderId: "346811062993",
  appId: "1:346811062993:web:409d84fbf80cd636d8c3f0",
  measurementId: "G-RSCN0GJ67N"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getDatabase(app);