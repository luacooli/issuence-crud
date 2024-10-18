// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf5_gVAv4AzoBysG0JO3xIpJwmLiolo1I",
  authDomain: "issuance-crud.firebaseapp.com",
  projectId: "issuance-crud",
  storageBucket: "issuance-crud.appspot.com",
  messagingSenderId: "437526501495",
  appId: "1:437526501495:web:a27cfceb3e1b2326e10e72",
  measurementId: "G-TBD4LTTVZ6"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

