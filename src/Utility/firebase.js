import firebase from "firebase/compat/app";
//auth
import {getAuth} from 'firebase/auth';
//firestor
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFY2XuVp7LEAwZbv_wKPGADE5a5sKwGps",
  authDomain: "web-d8a44.firebaseapp.com",
  projectId: "web-d8a44",
  storageBucket: "web-d8a44.appspot.com",
  messagingSenderId: "75124752852",
  appId: "1:75124752852:web:ecc39bf54e1502f9f11641",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
