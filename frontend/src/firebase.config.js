// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlP8IGBMKsns5xkOJtvmkcK-RkxkEO41w",
  authDomain: "pi-tech-ff6d5.firebaseapp.com",
  projectId: "pi-tech-ff6d5",
  storageBucket: "pi-tech-ff6d5.appspot.com",
  messagingSenderId: "838544366471",
  appId: "1:838544366471:web:8b95175c8607ecf15dd122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);