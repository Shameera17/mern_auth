// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFCCI32seDm-kQJIsC9JmdTJ93sI9Qa48",
  //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c22d5.firebaseapp.com",
  projectId: "mern-auth-c22d5",
  storageBucket: "mern-auth-c22d5.appspot.com",
  messagingSenderId: "166962387139",
  appId: "1:166962387139:web:1fffd94345974ed66e6a76",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
