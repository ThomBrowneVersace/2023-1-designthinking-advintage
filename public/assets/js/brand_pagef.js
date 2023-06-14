const ua = navigator.userAgent;
let sorted = -1;

// console.log('hi');

const receivedData = decodeURI(location.href.split('?')[1]);
console.log(receivedData); // data

// console.log('hello');

const menuBtn = document.getElementById('menu');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, getDoc, collection, query, doc, getDocs, orderBy, where } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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

const title = receivedData;
const docRef = doc(db, "allBrands", title);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
const imgHolder = document.createElement('div');
imgHolder.id = 'brand-img';
imgHolder.className = `${docSnap.data().category}Bk`;
imgHolder.innerHTML = `
<h2 class="shop-title"><a href="${docSnap.data().brandLink}" target='_blank'>${docSnap.data().title}</a></h2>
<img src=${docSnap.data().imgs[1]}>
`;

const hook = document.querySelector('main > div:nth-child(2) .search-items');
hook.before(imgHolder);

console.log(title);
const q = query(collection(db, "platformProducts"), where("shopTitle", "==", title.replace(/(\s*)/g, "")), orderBy('timestamp', 'desc'));

const categoryFilter = document.querySelector('.category-filter');
const itemsList = document.getElementsByClassName('item-wrapper')[0];
itemsList.addEventListener('click', itemClickHandler);


const defualtItems = [];
let items = [];

// templates
const topFilterTemplate = document.getElementById('top-filter-template');
const pantsFilterTemplate = document.getElementById('pants-filter-template');
const shoesFilterTemplate = document.getElementById('shoes-filter-template');
const headwearFilterTemplate = document.getElementById('headwear-filter-template');

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  defualtItems.push(doc.data());
  items.push(doc.data());
  console.log(doc.data());
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
                <span>${data.shopTitle}</span>
            </div>
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
        console.log(item);
        const itemEl = createItemBox(item);
        itemsList.append(itemEl);
    })
}

categoryFilter.addEventListener('click', (event) => {
    let selected = '';
    let applyBtn;
    event.preventDefault();
    if (event.target.className !== 'category-filter__btn') {
        return;
    }
    const categoryBtns = Array.from(document.getElementsByClassName('category-filter__btn'));
    if (event.target.textContent === 'Top' || event.target.textContent === 'Outer') {
        topFilterTemplate.classList.toggle('invisible');
        if (event.target.textContent === 'Top') {
            selected = 'top';
        } else {
            selected = 'outer';
        }
        applyBtn = topFilterTemplate.querySelector('button');
    } else if (event.target.textContent === 'Pants') {
        pantsFilterTemplate.classList.toggle('invisible');
        applyBtn = pantsFilterTemplate.querySelector('button');
        selected = 'pants';
    } else if (event.target.textContent === 'Shoes') {
        shoesFilterTemplate.classList.toggle('invisible');
        applyBtn = shoesFilterTemplate.querySelector('button');
        selected = 'shoes';
    } else if (event.target.textContent === 'Headwear') {
        headwearFilterTemplate.classList.toggle('invisible');
        applyBtn = headwearFilterTemplate.querySelector('button');
        selected = 'headwear';
    }
    categoryBtns.forEach(btn => {
        if (btn.textContent != event.target.textContent) {
            btn.classList.toggle('invisible');
        }
    })
    sorted *= -1;
    if (sorted > 0) {
        items = items.filter(item => item.category === selected);
        renderItems();
    } else {
        items = [...defualtItems];
        renderItems();
    }

    applyBtn.addEventListener('click', async event => {
        event.preventDefault();
        const inputedSizeFilter = await returnSizeFilterInputs();

        items = await filterItems(inputedSizeFilter);
        renderItems();
    })
    

})

function returnSizeFilterInputs() {
    const promise = new Promise((resolve, reject) => {
        const _ = document.querySelectorAll('.filter');
        let inputedSizeFilter = [..._];
        inputedSizeFilter = inputedSizeFilter.filter(input => !(Array.from(input.classList).includes('invisible')));
        inputedSizeFilter = inputedSizeFilter.map(input => input.querySelectorAll('input'));
        inputedSizeFilter = inputedSizeFilter[0];
        inputedSizeFilter = [...inputedSizeFilter]
        inputedSizeFilter = inputedSizeFilter.map(input => parseInt(input.value));
        resolve(inputedSizeFilter);
    });
    return promise;
}

function filterItems(inputedSizeFilter) {
    console.log(inputedSizeFilter);
    items = [...defualtItems];
    const promise = new Promise ((resolve, reject) => {
        for(let i = 0; i < inputedSizeFilter.length; i+= 2) {
            if (isNaN(inputedSizeFilter[i]) || isNaN(inputedSizeFilter[i+1])) {
                continue;
            }
            items = items.filter(item => {
                if (item.size[i] >= inputedSizeFilter[i] && item.size[i] <= inputedSizeFilter[i+1]) {
                    return item;
                }
            });
        }
        resolve(items);
    })
    return promise;
}

const brandElements = [];
const brandPopUpElements = [];
const brandsList = document.querySelector('.brands');

if (localStorage.getItem('docs')) {
    localStorage.removeItem('docs');
}

if (!localStorage.getItem('docs')) {
    const docs = [];
    const qb = query(collection(db, "allBrands"), orderBy('category', 'asc'));
    const querybSnapshot = await getDocs(qb);
    querybSnapshot.forEach((doc) => {
        docs.push(JSON.stringify(doc.data()));
    });
    const docs2 = JSON.stringify(docs);
    localStorage.setItem('docs', docs2);
}

const brands = JSON.parse(localStorage.getItem('docs'));
const brandDocs = brands.map(brand => JSON.parse(brand));
brandDocs.forEach(doc => {
    const brand = document.createElement('div');
    brand.className = `brands__brand`;
    brand.innerHTML = `<a href="#" class="${doc.category}">${doc.title}</a>`
    brandsList.append(brand);
    brandElements.push(brand);
    const El = createPopUpElement(doc);
    brandPopUpElements.push({
        El,
        title: doc.title
    });
})

for(let i = 0; i < brandElements.length; i++) {
    const brandAnchor = brandElements[i].querySelector('a');
    brandAnchor.addEventListener('click', e => {
        e.preventDefault();
        const tmp = e.target.closest('.brands__brand a');
        if (!tmp) {
            return;
        }
        const title = tmp.innerText;
        location.href = `brand_page.html?${title}`;
    })
    if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|KAKAO|KAKAOTALK|Opera Mini/i.test(ua) || !ua || ua.indexOf('KAKAO') > -1)) {
        break;
    }
    brandAnchor.addEventListener('mouseover', async e => {
        const prevEl = document.querySelector('.brand-popUp');
        if (prevEl) {
            prevEl.remove();
        }
        const tmp = e.target.closest('.brands__brand a');
        if (!tmp) {
            return;
        }
        const title = tmp.innerText;
        const El = brandPopUpElements.find(obj => obj.title === title);
        brandElements[i].after(El.El);
        console.log(window.pageYOffset + brandAnchor.getBoundingClientRect().top);
        El.El.style.top = `${window.pageYOffset + brandAnchor.getBoundingClientRect().top - 90}px`;
    })
    brandAnchor.addEventListener('mouseout', e => {
        const El = document.querySelector('.brand-popUp');
        if (!El) {
            return;
        }
        El.remove();
    })
}

renderItems();

menuBtn.addEventListener('click', e => {
    brandsList.classList.toggle('clicked');
    console.log(brandsList.classList)
})


async function itemClickHandler(e) {
    const item = e.target.closest('.item-box');
    if (!item) {
        return;
    }
    const title = item.querySelector('.item-box__content:nth-child(2) span').textContent;
    console.log(title);
    const docRef = doc(db, "platformProducts", title);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
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
            <th>허리단면</th>
            <th>허벅지단면</th>
            <th>밑위</th>
            <th>밑단단면</th>
            <tr>
                <td>${isNaN(item.size[0]) ? '-' : item.size[0]}cm</td>
                <td>${isNaN(item.size[1]) ? '-' : item.size[1]}cm</td>
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

function createPopUpElement(info) {
    const El = document.createElement('div');
    El.className = 'brand-popUp';
    El.innerHTML = `
    <div class="brand-popUp__img">
            <img src="${info.imgs[0]}" />
        </div>
        <div class="brand-popUp__info">
            <div>
                <span>Shop: ${info.title}</span>
            </div>
            <div class="brand-popUp__keywords">
            </div>
        </div>
    `;
    const keywords = El.querySelector('.brand-popUp__keywords');
    const hashs = [...info.hashTags.split(',')];
    for(let i = 0; i < hashs.length; i++) {
        const hash = document.createElement('span');
        hash.style.display = 'flex';
        hash.innerText = `#${hashs[i]}`;
        keywords.append(hash);
    }
    return El;
}