// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf151KM4F08EsuzmgFKZ6KBZH4UFo3Lxo",
  authDomain: "templo-forgym.firebaseapp.com",
  projectId: "templo-forgym",
  storageBucket: "templo-forgym.appspot.com",
  messagingSenderId: "336639552534",
  appId: "1:336639552534:web:276c700cd54d9815239937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
