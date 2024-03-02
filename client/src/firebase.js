// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";

import { getFirestore,collection,setDoc,doc ,serverTimestamp,getDoc,addDoc,query, where,updateDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxRDk7nlFz1mnGxbolwad2zz8R7hUVng8",
  authDomain: "devignite-1be75.firebaseapp.com",
  projectId: "devignite-1be75",
  storageBucket: "devignite-1be75.appspot.com",
  messagingSenderId: "1085865395399",
  appId: "1:1085865395399:web:09118ca94c4fc0868aaae2",
  measurementId: "G-T98D9HRNFG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app); 

export {app,auth, firestore,collection ,setDoc,doc,getDoc,serverTimestamp,addDoc,query, where,updateDoc};