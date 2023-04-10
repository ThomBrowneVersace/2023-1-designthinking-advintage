// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo5bC-RBUsX8xBR4i3YBDImhorl5j9Nxc",
  authDomain: "advintage-d5f8c.firebaseapp.com",
  databaseURL: "https://advintage-d5f8c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "advintage-d5f8c",
  storageBucket: "advintage-d5f8c.appspot.com",
  messagingSenderId: "40587996397",
  appId: "1:40587996397:web:235937e2ded956f7e930e4",
  measurementId: "G-67L1HC3RTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const nav = document.querySelector('.nav');

if (Object.keys(localStorage).includes('user')) {
    const navChildren = nav.children;
    const navBtns = document.querySelector('#logout-template');
    const btns = document.importNode(navBtns.content, true);
    
    nav.removeChild(navChildren[0]);
    nav.removeChild(navChildren[0]);
    nav.appendChild(btns);
    document.getElementById('log-out-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
        localStorage.removeItem('user');
        location.reload();
    }).catch((error) => {
    // An error happened.
    });
});
} else {
    const navChildren = nav.children;
    const navBtns = document.querySelector('#login-template');
    const btns = document.importNode(navBtns.content, true);
    
    nav.removeChild(navChildren[0]);
    nav.removeChild(navChildren[0]);
    nav.appendChild(btns);
}