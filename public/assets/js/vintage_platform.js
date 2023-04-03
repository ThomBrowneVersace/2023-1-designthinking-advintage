const db = firebase.firestore();
    db.collection('products').get.then((result) => {
    console.log(result.data());
})

const itemModal = document.querySelector('.item-modal-wrapper');
const itemModalExit = itemModal.querySelector('#exit');

itemModalExit.addEventListener('click', () => {
    itemModal.classList.toggle('invisible');
})