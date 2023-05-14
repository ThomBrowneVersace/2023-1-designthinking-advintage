const postBtn = document.querySelector('.nav__btn');
let sorted = -1;

if (!localStorage.getItem('isSeller')) {
    postBtn.classList.add('invisible');
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, doc, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
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

const searchItems = document.querySelector('.search-items');
const categoryFilter = document.querySelector('.category-filter');
const itemsList = document.querySelector('.item-wrapper');

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



const itemModal = document.querySelector('.item-modal-wrapper');
const itemModalExit = itemModal.querySelector('#exit');

itemModalExit.addEventListener('click', () => {
    itemModal.classList.toggle('invisible');
})