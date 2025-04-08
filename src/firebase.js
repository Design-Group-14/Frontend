import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);
export default app;