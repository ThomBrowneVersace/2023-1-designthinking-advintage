// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
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
        price: `${postFormInputs[2].value}`,
        description: `${postFormInputs[3].value}`,
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


// const places = [
//   {
//     title: "페이지원",
//     adress: "서울 마포구 상수동 316-13"
//   },
//   {
//     title:"베이스",
//     adress:"서울 마포구 상수동 313-1"
//   },
//   {
//     title:"빈티지 낙원",
//     adress:"서울 마포구 망원동 394-1"
//   },
//   {
//     title:"가버먼트",
//     adress:"서울 마포구 동교동 158-24"
//   },
//   {
//     title:"에이징퍼센트",
//     adress:"서울 마포구 서교동 327-20"
//   },
//   {
//     title:"주코빈티지",
//     adress:"서울 마포구 서교동 407-18"
//   },
//   {
//     title:"한티지",
//     adress:"서울 마포구 서교동 347-14"
//   },
//   {
//     title:"한티지 상수점",
//     adress:"서울 마포구 서교동 402-3"
//   },
//   {
//     title:"세컨드클로젯",
//     adress:"서울 마포구 연남동 228-28"
//   },
//   {
//     title:"레우코즈",
//     adress:"서울 용산구 보광동 265-511"
//   },
//   {
//     title:"페이즐리캣",
//     adress:"서울 용산구 이태원동 34-21"
//   },
//   {
//     title:"홍대 빈티지크루",
//     adress:"서울 마포구 서교동 346-41"
//   },
//   {
//     title:"무에라",
//     adress:"서울 용산구 이태원동 72-17"
//   },
//   {
//     title:"매그놀리아미스",
//     adress:"서울 마포구 연남동 229-30"
//   },
//   {
//     title:"밀리우 하우스",
//     adress:"서울 마포구 동교동 149-13"
//   },
//   {
//     title:"브루클린 빈티지",
//     adress:"서울 마포구 동교동 155-36"
//   },
//   {
//     title:"빈티지아비",
//     adress:"서울 마포구 연남동 390-56"
//   },
//   {
//     title:"워즈런던빈티지",
//     adress:"서울 마포구 연남동 227-38"
//   },
//   {
//     title:"연남빈티지",
//     adress:"서울 마포구 동교동 152-7"
//   },
//   {
//     title:"빽투더빈티지",
//     adress:"서울 마포구 동교동 153-1"
//   },
//   {
//     title:"아이엠빈티지",
//     adress:"서울 마포구 동교동 166-12"
//   },
//   {
//     title:"파인애플사우나",
//     adress:"서울 마포구 서교동 329-1"
//   },
//   {
//     title:"코코빈티지",
//     adress:"서울 마포구 서교동 347-19"
//   },
//   {
//     title:"라비너스",
//     adress:"서울 마포구 서교동 398-5"
//   },
//   {
//     title:"벨엔누보",
//     adress:"서울 강남구 신사동 542-3"
//   },
//   {
//     title:"트락",
//     adress:"서울 마포구 서교동 346-51"
//   },
//   {
//     title:"와일드혹스",
//     adress:"서울 마포구 상수동 90-2"
//   },
//   {
//     title:"포쉬빈티지",
//     adress:"서울 용산구 한남동 790-17"
//   },
//   {
//     title:"노바운더리즈샵",
//     adress:"서울 마포구 합정동 441-15"
//   },
//   {
//     title:"디스레트로라이프",
//     adress:"서울 용산구 보광동 265-963"
//   },
//   {
//     title:"노란벽작업실",
//     adress:"서울 종로구 계동 80"
//   },
//   {
//     title:"스이렌서울",
//     adress:"서울 중구 을지로3가 302-15"
//   },
//   {
//     title:"빈티지보니",
//     adress:"서울 종로구 계동 77-1"
//   },
//   {
//     title:"드레스코코",
//     adress:"서울 중구 을지로6가 18-21"
//   },
//   {
//     title:"불필요상점",
//     adress:"서울 용산구 이태원동 348"
//   },
//   {
//     title:"소우이",
//     adress:"서울 용산구 이태원동 22-23"
//   },
//   {
//     title:"빈티지튤립",
//     adress:"서울 관악구 봉천동 1673-2"
//   },
//   {
//     title:"델라보테가",
//     adress:"서울 강남구 세곡동 128-11"
//   },
//   {
//     title:"꼴레뜨나인",
//     adress:"서울 강남구 신사동 551"
//   },
//   {
//     title:"밀리언아카이브",
//     adress:"서울 성동구 성수동2가 289-293"
//   },
//   {
//     title:"심미안",
//     adress:"서울 성동구 성수동2가 289-205"
//   },
//   {
//     title:"올드브릭",
//     adress:"서울 성북구 동선동1가 85-56"
//   },
//   {
//     title:"디스레트로라이프",
//     adress:"서울 종로구 누하동 17"
//   },
//   {
//     title:"오늘의빈티지",
//     adress:"서울 마포구 서교동 339-1"
//   },
//   {
//     title:"반코빈티지",
//     adress:"서울 마포구 서교동 335-26"
//   },
//   {
//     title:"희마",
//     adress:"서울 서대문구 연희동 142-5"
//   },
//   {
//     title:"링마이버튼",
//     adress:"서울 마포구 서교동 335-20"
//   },
//   {
//     title:"마크업",
//     adress:"서울 용산구 이태원동 225-102"
//   },
//   {
//     title:"게릴라라디오",
//     adress:"서울 마포구 합정동 411-1"
//   },
//   {
//     title:"다브앙",
//     adress:"서울 광진구 중곡동 297-17"
//   },
//   {
//     title:"알멘드로",
//     adress:"서울 마포구 연남동 509-28"
//   }
// ]