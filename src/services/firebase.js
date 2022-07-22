// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrQ1hfe_uFpumjNIGB3oaC9CnlCcJ0q6g",
  authDomain: "gymsystem-6dd3d.firebaseapp.com",
  databaseURL: "https://gymsystem-6dd3d-default-rtdb.firebaseio.com",
  projectId: "gymsystem-6dd3d",
  storageBucket: "gymsystem-6dd3d.appspot.com",
  messagingSenderId: "998342429842",
  appId: "1:998342429842:web:56938aa9c434680a256a4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = app.firestore();