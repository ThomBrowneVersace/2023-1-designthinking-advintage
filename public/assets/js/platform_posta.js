// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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
const auth = getAuth();
const user = auth.currentUser;

console.log(user);

console.log(parseInt('10000000'));

// Templates
const topTemplate = document.getElementById('top/outer-template');
const pantsTemplate = document.getElementById('pants-template');
const shoesTemplate = document.getElementById('shoes-template');
const headwearTemplate = document.getElementById('headwear-template');

// Elements
const postFrom = document.querySelector('.post-form');
const postingBtn = document.querySelector('.post-form button');
const productImgUpload = document.getElementById('img-upload');
const productImgLists = document.querySelector('.post-form__img-preview ul');
const selectCategory = document.getElementById('category');
const selectOption = document.getElementById('option');
const uploadFiles = [];

productImgUpload.addEventListener('change', event => {
  const files = productImgUpload.files;
  event.preventDefault();

  if ([...files].length >= 7) {
    alert('이미지는 최대 6개까지 업로드가 가능합니다.');
    productImgUpload.value = '';
    return;
  }
  [...files].forEach(file => {
    if (!file.type.match("image/.*")) {
      alert('이미지 파일만 업로드가 가능합니다.');
      productImgUpload.value = '';
      return;
    }
  });

  [...files].forEach(file => {
    if (uploadFiles.length >= 6) {
      alert('이미지는 최대 6개까지 업로드가 가능합니다.');
      productImgUpload.value = '';
      return;
    }
    uploadFiles.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = createElement(e, file);
      preview.id = `img${uploadFiles.length}`;
      productImgLists.appendChild(preview);
    };
    reader.readAsDataURL(file);
  })
});

productImgLists.addEventListener('click', event => {
  const target = event.target;
  if(target.tagName !== 'IMG') return;

  console.log(`target name: ${target.dataset.file}`);
  const idx = uploadFiles.findIndex(elem => elem.name === target.dataset.file);
  target.remove();
  console.log(idx);
  uploadFiles.splice(idx, 1);
  console.log(uploadFiles);
})

function createElement(e, file) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.className = 'product-img';
  img.setAttribute('src', e.target.result);
  img.setAttribute('data-file', file.name);
  li.appendChild(img);

  return li;
}
const sizes = document.importNode(topTemplate.content, true);
postingBtn.before(sizes);

selectCategory.addEventListener('change', event => {
  event.preventDefault();
  let prevInputs = document.getElementsByClassName('size-inputs');
  prevInputs = [...prevInputs];
  prevInputs.forEach(elem => {
    elem.remove();
  });
  let sizes = document.importNode(topTemplate.content, true);
  if (selectCategory.value === 'top' || selectCategory.value === 'outer') {
    sizes = document.importNode(topTemplate.content, true);
  } else if (selectCategory.value === 'pants') {
    sizes = document.importNode(pantsTemplate.content, true);
  } else if (selectCategory.value === 'shoes') {
    sizes = document.importNode(shoesTemplate.content, true);
  } else if (selectCategory.value === 'headwear') {
    sizes = document.importNode(headwearTemplate.content, true);
  } else {
    return;
  }
  postingBtn.before(sizes);

});

// postingBtn.addEventListener('click', (event) => {
//   const postFormInputs = document.querySelectorAll('.post-form__input-wrapper input');
//   const category = document.getElementById('category');
//   const imgNames = ['str'];
//   const sizes = [...document.getElementsByClassName('size-inputs')];
//   const sizesValue = sizes.map(size => parseInt(size.value));
//   event.preventDefault();
//   uploadFiles.forEach(file => {
//     const storageRef = ref(storage, `personalProductsImg/${file.name}`);
//     uploadBytes(storageRef, file).then((snapshot) => {
//       console.dir(snapshot);
//       imgNames.push(`${snapshot.metadata.contentType}`)
//     });
//   });
//   console.dir(imgNames);
//   const imgs = imgNames.map(img => img);
//   console.log(imgs);
//   setDoc(doc(db, "personalProducts", category.value, `${category.value}Products`, `${postFormInputs[0].value}`), {
//       title: `${postFormInputs[0].value}`,
//       price: `${postFormInputs[1].value}`,
//       description: `${postFormInputs[2].value}`,
//       category: `${category.value}`,
//       imgs: [...imgNames],
//       size: [...sizesValue]
//     });
// })

postingBtn.addEventListener('click', async (event) => {
  const postFormInputs = document.querySelectorAll('.post-form__input-wrapper input');
  const category = document.getElementById('category');
  const imgPaths = [];
  const sizes = [...document.getElementsByClassName('size-inputs')];
  const sizesValue = sizes.map(size => parseInt(size.value));
  const price = parseInt(postFormInputs[2].value);
  event.preventDefault();
  console.log("uploadFiles", uploadFiles);
  try {
    for (const file of uploadFiles) {
        const storageRef = ref(storage, `personalProductsImg/${file.name}`);
        const uploadResp = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadResp.ref);
        imgPaths.push(url);
    }

    console.log("imgPaths", imgPaths);
    const docRef = doc(db, "userInfo", localStorage.getItem('user'));
    const docSnap = await getDoc(docRef);
    const setResp = await setDoc(doc(db, "platformProducts", `${postFormInputs[1].value}`), {
        title: `${postFormInputs[1].value}`,
        price,
        description: `${postFormInputs[3].value}`,
        productLink: `${postFormInputs[4].value}`,
        category: `${category.value}`,
        imgs: imgPaths,
        size: [...sizesValue],
        sml: selectOption.value,
        shopTitle: docSnap.data().shopName,
        timestamp: new Date()
    });
    location.replace('./vintage_platform.html');
  } catch (error) {
    if (error.code === "permission-denied") {
      console.log(error);
      alert("접근 권한이 없습니다. 이메일 인증을 완료해주세요.");
      // history.back();
    } else if (error.code === "invalid-argument") {
      alert("잘못된 상품명입니다.");
    }
  }
})