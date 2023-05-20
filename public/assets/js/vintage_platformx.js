const postBtn = document.querySelector('.nav__btn');
let sorted = -1;
console.log('hihihi');

if (!localStorage.getItem('isSeller')) {
    postBtn.classList.add('invisible');
}
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

const q = query(collection(db, "platformProducts"), orderBy('timestamp', 'desc'));

const categoryFilter = document.querySelector('.category-filter');
const itemsList = document.getElementsByClassName('item-wrapper')[0];
itemsList.addEventListener('click', itemClickHandler);


const defualtItems = [];
let items = [];

//templates
const topFilterTemplate = document.getElementById('top-filter-template');
const pantsFilterTemplate = document.getElementById('pants-filter-template');
const shoesFilterTemplate = document.getElementById('shoes-filter-template');
const headwearFilterTemplate = document.getElementById('headwear-filter-template');

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
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
                <span>${data.price}</span>
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

renderItems();


async function itemClickHandler(e) {
    const item = e.target.closest('.item-box');
    if (!item) {
        return;
    }
    const title = item.querySelector('.item-box__content span').textContent;
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


// category: "pants"
// description: "just car"
// imgs: (4) ['https://firebasestorage.googleapis.com/v0/b/advint…=media&token=d55a6447-5581-4ad6-ac9d-c9424d0887ae', 'https://firebasestorage.googleapis.com/v0/b/advint…=media&token=8c3b93da-c923-451f-9e9d-6ba9658c0b45', 'https://firebasestorage.googleapis.com/v0/b/advint…=media&token=e024ba2f-1f00-45c1-b15d-99a32b978ae5', 'https://firebasestorage.googleapis.com/v0/b/advint…=media&token=94c29787-d238-4e19-94b8-a548e7cfdeb8']
// price: "1000000"
// shopTitle: "승훈이네"
// size: (5) [10, 20, 30, 40, 50]
// sml: "m"
// timestamp: os {seconds: 1684499321, nanoseconds: 856000000}
// title: "cars"

function createItemModalElement(item) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'item-modal-wrapper';
    modalWrapper.innerHTML = `
    <div class="item-modal">
        <div class="item-modal__img">
            <div class="slider">
                <input type="radio" name="slide" id="slide1" checked>
                <input type="radio" name="slide" id="slide2">
                <input type="radio" name="slide" id="slide3">
                <input type="radio" name="slide" id="slide4">
                <div class="bullets">
                    <label for="slide1">&nbsp;</label>
                    <label for="slide2">&nbsp;</label>
                    <label for="slide3">&nbsp;</label>
                    <label for="slide4">&nbsp;</label>
                </div>
            </div>
        </div>
        <div class="item-modal__info">
            <div>
                <i class="fa-solid fa-xmark fa-2xl" id="exit"></i>
            </div>
            <ul>
                <li>
                    <div class="item-modal__info__contents" id="title">${item.title}</div>
                </li>
                <li>
                    <div class="item-modal__info__contents" id="price">${item.price}원</div>
                </li>
                <li>
                    <p>${item.description}</p>
                </li>
            </ul>
            <button>Buy</button>
        </div>
    </div>
    `
    const bullets = modalWrapper.querySelector('.bullets');
    const imgHoldr = createImgHolderElement(item.imgs);
    bullets.before(imgHoldr);
    const buyBtn = modalWrapper.querySelector('.item-modal button');
    const sizeTable = createSizeTableElement(item);
    buyBtn.before(sizeTable);

    const itemModalExit = modalWrapper.querySelector('#exit');
    itemModalExit.addEventListener('click', e => {
        modalWrapper.remove();
    })

    return modalWrapper;
}

function createSizeTableElement(item) {
    const sizeTable = document.createElement('table');
    sizeTable.className = 'item-modal__info__size';
    console.log(item.category);
    if (item.category === 'top' || item.category === 'outer') {
        sizeTable.innerHTML = `
            <th>총장</th>
            <th>어깨너비</th>
            <th>가슴단면</th>
            <th>소매길이</th>
            <tr>
                <td>${item.size[0]}cm</td>
                <td>${item.size[1]}cm</td>
                <td>${item.size[2]}cm</td>
                <td>${item.size[3]}cm</td>
            </tr>
        `;
    } else if (item.category === 'pants') {
        console.log('thisthis');
        sizeTable.innerHTML = `
            <th>총장</th>
            <th>허리단면</th>
            <th>허벅지단면</th>
            <th>밑위</th>
            <th>밑단단면</th>
            <tr>
                <td>${item.size[0]}cm</td>
                <td>${item.size[1]}cm</td>
                <td>${item.size[2]}cm</td>
                <td>${item.size[3]}cm</td>
                <td>${item.size[4]}cm</td>
            </tr>
        `;
    } else if (item.category === 'shoes') {
        sizeTable.innerHTML = `
            <th>사이즈</th>
            <tr>
                <td>${item.size[0]}cm</td>
            </tr>
        `;
    } else if (item.category === 'headwear') {
        sizeTable.innerHTML = `
            <th>머리둘레</th>
            <th>깊이</th>
            <th>챙길이</th>
            <tr>
                <td>${item.size[0]}cm</td>
                <td>${item.size[1]}cm</td>
                <td>${item.size[2]}cm</td>
            </tr>
        `;
    }
    console.log(sizeTable);
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