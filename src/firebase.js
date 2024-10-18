import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf5_gVAv4AzoBysG0JO3xIpJwmLiolo1I",
  authDomain: "issuance-crud.firebaseapp.com",
  projectId: "issuance-crud",
  storageBucket: "issuance-crud.appspot.com",
  messagingSenderId: "437526501495",
  appId: "1:437526501495:web:a27cfceb3e1b2326e10e72",
  measurementId: "G-TBD4LTTVZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
