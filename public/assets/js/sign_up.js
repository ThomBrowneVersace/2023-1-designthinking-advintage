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

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

document.querySelector('.sign-up-form button').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('sign-up__email').value;
    const password = document.getElementById('sign-up__password').value;
    const auth = getAuth();
    const checkSellerBox = document.querySelector('.sign-up-form:first-child .isSeller input');
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('user', user.email);
        if (checkSellerBox.checked) {
          localStorage.setItem('isSeller', true);
        }
        // ...
        location.replace('./index.html');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        // ..
  });
}); 

document.getElementById('log-in__btn').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('log-in__email').value;
    const password = document.getElementById('log-in__password').value;
    const auth = getAuth();
    const checkSellerBox = document.querySelector('.sign-up-form:last-child .isSeller input');
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        localStorage.setItem('user', user.email);
        if (checkSellerBox.checked) {
          localStorage.setItem('isSeller', true);
        }
        location.replace('./index.html');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
  });
}); 