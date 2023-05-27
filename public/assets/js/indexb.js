const ua = navigator.userAgent;
console.log(ua);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|KAKAO|KAKAOTALK|Opera Mini/i.test(ua) || !ua || ua.indexOf('KAKAO') > -1) {
  // 모바일인 경우
  const vid = document.getElementById('background-video');
  alert("(참고) Addvintage 서비스는 PC환경에 최적화 되어있습니다. -Addvintage")
  vid.autoplay = false;
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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
        localStorage.removeItem('isSeller');
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

const anchors = document.querySelectorAll('.main__nav__content a');
const notYet = event => {
    alert('서비스 준비 중입니다. - Addvintage');
}

const user = await checkLogIn();
anchors[0].addEventListener('click', platformClickHandler);
for(let i = 1; i < 4; i++) {
    anchors[i].addEventListener('click', notYet);
}

async function platformClickHandler(e) {
    e.preventDefault();
    const user = await checkLogIn();

    if (user) {
        location.href = './vintage_platform.html';
    } else {
        alert('로그인 또는 회원가입 후 이용바랍니다.');
    }
}

function checkLogIn() {
    const promise = new Promise((resolve, reject) => {
        const auth = getAuth();
        resolve(auth.currentUser);
    })
    return promise;
}