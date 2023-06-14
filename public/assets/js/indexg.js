const ua = navigator.userAgent;

console.log('hihihi');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|KAKAO|KAKAOTALK|Opera Mini/i.test(ua) || !ua || ua.indexOf('KAKAO') > -1) {
  // 모바일인 경우
  const wrapper = document.querySelector('.video-wrapper');
  const vid = document.getElementById('background-video');
  vid.remove();
  alert("(참고) Addvintage 서비스는 PC환경에 최적화 되어있습니다. -Addvintage")
  // vid.autoplay = false;
  const howtouse = document.querySelector('.main__nav > div:last-child a');
  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.loop = true;
  video.id = 'background-video';
  const mobileVid = document.createElement('source');
  mobileVid.src = 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A9%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%87%E1%85%A5%E1%84%8C%E1%85%A5%E1%86%AB.mp4?alt=media&token=a7921eda-32ab-45b6-877a-83bb306df027&_gl=1*1i0kx1s*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA1NzU5MC45NC4xLjE2ODYwNTc2NDYuMC4wLjA.';
  mobileVid.type = 'video/mp4';
  video.append(mobileVid);
  wrapper.append(video);

  howtouse.download = 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/Addvintage%20Guide.pdf?alt=media&token=a59d9474-9b95-41ec-8faa-a818b8b299e6&_gl=1*1khc6zi*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjAzMDkxNS45MC4xLjE2ODYwMzU4NjAuMC4wLjA.';
} else {
  const video = document.querySelector('#mobile');
  video.remove();
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

// let user = await checkLogIn();
// anchors[0].addEventListener('click', platformClickHandler);
// for(let i = 1; i < 4; i++) {
//     anchors[i].addEventListener('click', notYet);
// }

// async function platformClickHandler(e) {
//     e.preventDefault();
//     user = await checkLogIn();

//     if (user) {
//         location.href = './vintage_platform.html';
//     } else {
//         alert('로그인 또는 회원가입 후 이용바랍니다.');
//     }
// }

// function checkLogIn() {
//     const promise = new Promise((resolve, reject) => {
//         const auth = getAuth();
//         resolve(auth.currentUser);
//     })
//     return promise;
// }