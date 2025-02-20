// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6L-Cn9yHQIZ_DTbcgvnbhyWyrCzvnEgw",
  authDomain: "belltower-76cf7.firebaseapp.com",
  projectId: "belltower-76cf7",
  storageBucket: "belltower-76cf7.firebasestorage.app",
  messagingSenderId: "807000076607",
  appId: "1:807000076607:web:cb406bde250d5be3e1e38a",
  measurementId: "G-LKKWNWJVTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

