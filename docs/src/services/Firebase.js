// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);