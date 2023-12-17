// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm-MQqvxNi-CkQ2xUAlQvfB-jjYhCHPgs",
  authDomain: "care-cos.firebaseapp.com",
  projectId: "care-cos",
  storageBucket: "care-cos.appspot.com",
  messagingSenderId: "910427009487",
  appId: "1:910427009487:web:47c12717b1a181e2d722ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;