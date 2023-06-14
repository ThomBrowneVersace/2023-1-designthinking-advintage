console.log('hi');

// console.log('hello');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, getDoc, collection, query, doc, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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

const categoryFilter = document.querySelector('.category-filter');
const itemsList = document.getElementsByClassName('item-wrapper')[0];
itemsList.addEventListener('click', itemClickHandler);

class Goods {
    constructor(title, size, category, price, description, imgs, shopTitle, productLink) {
        this.title = title,
        this.size = size,
        this.category = category,
        this.price = price,
        this.description = description,
        this.imgs = imgs,
        this.shopTitle = shopTitle,
        this.productLink = productLink
    }
    data() {
        return {
            title: this.title,
            size: this.size,
            category: this.category,
            price: this.price,
            description: this.description,
            imgs: this.imgs,
            shopTitle: this.shopTitle,
            productLink: this.productLink
        }
    }
}

const vans = new Goods("반스 올드스쿨 커스텀 신발", [280], 'shoes', 39000, '꾸준히 사랑받고 있는 반스의 올드스쿨 모델에 반스 로고를 귀엽게 커스텀했습니다. 신발 측면에는 미니 꼬깔 디테일을 추가했습니다. 키치한 컬러 조합과 디자인의 커스텀 제품입니다.',
 ['https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fyellow1.jpeg?alt=media&token=48e82cd2-c880-4013-b745-f73c25f29255&_gl=1*13j44jk*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcyNTguMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fyellow2.jpeg?alt=media&token=51c7bbd2-4a42-4453-b2c5-d884edaf9832&_gl=1*zmh8po*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcyODEuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fyellow3.jpeg?alt=media&token=3c471865-552a-4904-9adb-04baf42debda&_gl=1*jrkeh7*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDczMjcuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fyellow4.jpeg?alt=media&token=7318832d-50b1-46cf-8d5f-d718a3a3a87f&_gl=1*kx9ssk*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDczNTUuMC4wLjA.',
'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fyellow5.jpeg?alt=media&token=1a4e80fe-9a52-498a-a133-9fb1653b2d5a&_gl=1*15qdyun*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDczNzQuMC4wLjA.'
], 'Addvintage', 'https://www.instagram.com/p/CtJY29SReK8/?igshid=MzRlODBiNWFlZA==');
const airforce = new Goods("나이키 에어포스 커스텀 신발", [245], 'shoes', 29000, '클래식하고 캐주얼한 나이키 에어포스에 컬러 포인트로 특별함을 더했습니다. 여름의 상큼함과 어울리는 두가지 컬러 조합으로 커스텀한 제품입니다.',
 ['https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fblue1.jpeg?alt=media&token=b035ef3e-575e-49b8-a01c-ec6a8089fd24&_gl=1*1twh3lm*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcwODguMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fblue2.jpeg?alt=media&token=b93ab0b5-4338-42b2-83fc-2eca4469ee32&_gl=1*1rsrr23*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcxMTcuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fblue3.jpeg?alt=media&token=303b4ccd-9f0a-441d-b1a5-1f26a3f05a19&_gl=1*15n9h3v*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcxMjguMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fblue4.jpeg?alt=media&token=b9ae78e8-4812-467c-9eb7-f21bc83c1ca1&_gl=1*x2idt9*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcxNDAuMC4wLjA.',
'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fblue5.jpeg?alt=media&token=302cbae6-4c6a-44cc-b287-c61c7e2c4190&_gl=1*1txl6m2*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDcxNTYuMC4wLjA.'
], 'Addvintage', 'https://www.instagram.com/p/CtJY29SReK8/?igshid=MzRlODBiNWFlZA==');
const adidas = new Goods("Adiddas traing skirt & leg warmer", [], 'pants', 59000, 'prime freen컬러에 버튼 디테일 살아있는 제품입니다. 아디다스 정품 트레이닝 바지를 치마와 레그 워머로 리폼했습니다.',
 ['https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt1.jpeg?alt=media&token=d5d6184a-3bed-41d5-af6d-8da14f9c17e4&_gl=1*1p1iet5*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc3OTEuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt2.jpeg?alt=media&token=d67ce22c-d773-43be-b252-051b97ea0f5c&_gl=1*1egaqza*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc4MDkuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt3.jpeg?alt=media&token=169a9ef4-0069-40e4-9b7e-880737027e5d&_gl=1*y2wv70*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc4MjQuMC4wLjA.',
 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt4.jpeg?alt=media&token=c0dbeb82-4b8f-4b88-9cb1-5dc0f845dc68&_gl=1*1dc3dy0*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc4MzguMC4wLjA.',
'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt5.jpeg?alt=media&token=02ab8525-e7af-4b24-8828-c72218afe809&_gl=1*z5z0cc*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc4NTUuMC4wLjA.',
'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/goodsImg%2Fskirt6.jpeg?alt=media&token=c0d15805-70a1-45c3-8a3c-10fcfecd9a50&_gl=1*13e4zt1*_ga*MzAzODY2NTc4LjE2ODAxNTgzNDc.*_ga_CW55HF8NVT*MTY4NjA0NjYwOC45Mi4xLjE2ODYwNDc4NzEuMC4wLjA.'
], 'Addvintage', 'https://www.instagram.com/p/CtJY29SReK8/?igshid=MzRlODBiNWFlZA==');
const goodsInfo = [{
    
}]

const goods = [vans, airforce, adidas];
const defualtItems = [];
let items = [];

goods.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  defualtItems.push(doc.data());
  items.push(doc.data());
});

const createItemBox = (data) => {
    const box = document.createElement('div');
    box.className = "item-box";
    box.innerHTML = `
        <div class="item-box__img">
            <img src="${data.imgs[0]}">
        </div>
        <div class="item-box__contents">
            <div class="item-box__content">
                <span>${data.title}</span>
            </div>
            <div class="item-box__content">
                <span>${data.price.toLocaleString('ko-KR')}원</span>
            </div>
        </div>
    `;
    return box;
}

const renderItems = () => {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const itemEl = createItemBox(item);
        itemsList.append(itemEl);
    })
}

renderItems();

async function itemClickHandler(e) {
    const item = e.target.closest('.item-box');
    if (!item) {
        return;
    }
    const title = item.querySelector('.item-box__content span').textContent;
    // const docSnap = await getDoc(docRef);
    const docSnap = goods.filter(data => data.title === title)[0];
    console.log(docSnap);
    const modalEl = createItemModalElement(docSnap.data());
    itemsList.after(modalEl);
    
}

function createItemModalElement(item) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'item-modal-wrapper';
    modalWrapper.innerHTML = `
    <div class="item-modal">
        <div class="item-modal__img">
            <div class="slider">
                <div class="bullets">
                </div>
            </div>
        </div>
        <div class="item-modal__info">
            <div>
                <i class="fa-solid fa-xmark fa-2xl" id="exit"></i>
            </div>
            <ul>
                <li>
                    <div class="item-modal__info__contents">${item.shopTitle}</div>
                </li>
                <li>
                    <div class="item-modal__info__contents" id="title">${item.title}</div>
                </li>
                <li>
                    <div class="item-modal__info__contents" id="price">${item.price.toLocaleString('ko-KR')}원</div>
                </li>
                <li>
                    <p>${item.description}</p>
                </li>
            </ul>
            <button onclick="window.open('${item.productLink}')" target="_blank">Buy</button>
        </div>
    </div>
    `
    console.log(item.imgs.length);
    const bullets = modalWrapper.querySelector('.bullets');
    for(let i = 0; i < item.imgs.length; i++) {
        const radioEl = createRadioElement(i);
        const labelEl = createLabelElement(i);
        bullets.before(radioEl);
        bullets.append(labelEl);
    }
    const imgHoldr = createImgHolderElement(item.imgs);
    bullets.before(imgHoldr);
    const buyBtn = modalWrapper.querySelector('.item-modal button');
    const sizeTable = createSizeTableElement(item);
    buyBtn.before(sizeTable);

    const itemModalExit = modalWrapper.querySelector('#exit');
    itemModalExit.addEventListener('click', e => {
        modalWrapper.remove();
    })

    modalWrapper.addEventListener('click', e => {
        if (!e.target.closest('.item-modal')) {
            itemModalExit.click();
        }
    })

    return modalWrapper;
}

function createSizeTableElement(item) {
    const sizeTable = document.createElement('table');
    sizeTable.className = 'item-modal__info__size';
    if (item.category === 'top' || item.category === 'outer') {
        sizeTable.innerHTML = `
            <th>총장</th>
            <th>어깨너비</th>
            <th>가슴단면</th>
            <th>소매길이</th>
            <tr>
                <td>${isNaN(item.size[0]) ? '-' : item.size[0]}cm</td>
                <td>${isNaN(item.size[1]) ? '-' : item.size[1]}cm</td>
                <td>${isNaN(item.size[2]) ? '-' : item.size[2]}cm</td>
                <td>${isNaN(item.size[3]) ? '-' : item.size[3]}cm</td>
            </tr>
        `;
    } else if (item.category === 'pants') {
        sizeTable.innerHTML = `
            <th>총장</th>
            <th>허리</th>
            <th>허벅지단면</th>
            <th>밑위</th>
            <th>밑단단면</th>
            <tr>
                <td>${isNaN(item.size[0]) ? '-' : item.size[0]}cm</td>
                <td>${isNaN(item.size[1]) ? '-' : item.size[1]}inch</td>
                <td>${isNaN(item.size[2]) ? '-' : item.size[2]}cm</td>
                <td>${isNaN(item.size[3]) ? '-' : item.size[3]}cm</td>
                <td>${isNaN(item.size[4]) ? '-' : item.size[4]}cm</td>
            </tr>
        `;
    } else if (item.category === 'shoes') {
        sizeTable.innerHTML = `
            <th>사이즈</th>
            <tr>
                <td>${isNaN(item.size[0]) ? '-' : item.size[0]}cm</td>
            </tr>
        `;
    } else if (item.category === 'headwear') {
        sizeTable.innerHTML = `
            <th>머리둘레</th>
            <th>깊이</th>
            <th>챙길이</th>
            <tr>
            <td>${isNaN(item.size[0]) ? '-' : item.size[0]}cm</td>
            <td>${isNaN(item.size[1]) ? '-' : item.size[1]}cm</td>
            <td>${isNaN(item.size[2]) ? '-' : item.size[2]}cm</td>
            </tr>
        `;
    }
    return sizeTable;
}

function createImgHolderElement(imgs) {
    const holder = document.createElement('ul');
    holder.className = 'imgs';
    holder.id = 'imgholder';
    for(let i = 0; i < imgs.length; i++) {
        const list = document.createElement('li');
        list.innerHTML = `<img src="${imgs[i]}">`;
        holder.append(list);
    }
    return holder;
}

function createRadioElement(idx) {
    const El = document.createElement('input');
    El.type = 'radio';
    El.name = 'slide';
    El.id = `slide${idx + 1}`;
    if (idx == 0) {
        El.checked = true;
    }
    return El;
}

function createLabelElement(idx) {
    const El = document.createElement('label');
    El.htmlFor = `slide${idx + 1}`;
    El.innerText = '';
    return El;
}