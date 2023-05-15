// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
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
const db = getFirestore(app);
const storage = getStorage(app);

const checkSellerBox = document.querySelector('.sign-up-form:first-child .isSeller input');
const sellerInfo = document.querySelector('.seller-info');

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

document.querySelector('.sign-up-form button').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('sign-up__email').value;
    const password = document.getElementById('sign-up__password').value;
    const auth = getAuth();
    const userC = await createUserWithEmailAndPassword(auth, email, password);
    const user = userC.user;
    // Signed in
    localStorage.setItem('user', user.email);
    // ...
    if (checkSellerBox.checked) {
        const shopName = document.getElementById('shop-name').value;
        const postCode = document.getElementById('sample3_postcode').value;
        const address = document.getElementById('sample3_address').value;
        const detailAdress = document.getElementById('sample3_detailAddress').value;
        const extraAddress = document.getElementById('sample3_extraAddress').value;
        await setDoc(doc(db, "userInfo", `${user.email}`), {
            email: user.email,
            uid: user.uid,
            isSeller: true,
            shopName,
            postCode,
            address,
            detailAdress,
            extraAddress
        });
        localStorage.setItem('isSeller', true);
    } else {
        await setDoc(doc(db, "userInfo", `${user.email}`), {
            email: user.email,
            uid: user.uid
        });
    }
    location.replace('./index.html');
});


checkSellerBox.addEventListener('click', event => {
    sellerInfo.classList.toggle('invisible');
});