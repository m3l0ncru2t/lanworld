

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCTMPn_dw39dJRvePu24Bv7pQAuBMm4xhQ",
  
    authDomain: "lanworld-14a2c.firebaseapp.com",
  
    projectId: "lanworld-14a2c",
  
    storageBucket: "lanworld-14a2c.appspot.com",
  
    messagingSenderId: "887108723317",
  
    appId: "1:887108723317:web:d78d2710a88c0d70858e3c",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, signInWithEmailAndPassword, signOut, collection, addDoc, onSnapshot };
