// MOCK DATA

let listOfGifts = [ 
    'Hub Thunderbolt nuevo   ', 
    'Luces para el stream',  
    'Soporte para la cámara',
];

// SELECT ITEMS
const giftList = document.querySelector(".gift-list");
const form = document.querySelector(".gift-list-form");
const gift = document.querySelector("#input-gift");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const msgEmptyList = document.querySelector("#msg-empty");

// EVENT LISTENERS

form.addEventListener("submit", e => {
    e.preventDefault();
    
     // VALIDATION: If text is empty, notify user
    if (gift.value.trim() === "") {
        form.classList.add("shake");
        setTimeout(() => { form.classList.remove("shake") }, 500);
    } else if (giftIndex(gift.value) === -1) {
        // Hide the Empty List message if adding the first element
        if (listOfGifts.length === 0) hideMsgEmptyList();

        // Add gift to list
        addItem(gift.value); 
        storeItem(gift.value);
        gift.value = "";  
    } else {
        showMsgGiftAlreadyExists();
    }
    
} );

function giftIndex(gift) {
    return listOfGifts.findIndex(element => normalizeString(element) === normalizeString(gift)); 
}

function showMsgGiftAlreadyExists() {
    alert("Ya agregaste ese regalo");
}

giftList.addEventListener("click", (event) => {
    // remove from the list
    event.target.remove();

    // remove from storage
    listOfGifts = deleteItemFromStorage(event.target.textContent);

    if (listOfGifts.length === 0) showMsgEmptyList();
})

btnDeleteAll.addEventListener("click", (event) => {
    // remove all elements from the page
    while (giftList.lastChild) {
        giftList.lastChild.remove();
    }

    // remove all elements from storage (array)
    listOfGifts = [];

    showMsgEmptyList();
});

// UTILITIES

const normalizeString = (string) => { 
    return string
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ');
};

// FUNCTIONS

function storeItem(item) {
    listOfGifts = [...listOfGifts, item];
}

function deleteItemFromStorage(item) {
    const itemIndex = listOfGifts.indexOf(item);
    return listOfGifts.filter(e => e !== item);
}

function addItem(item) {
    // add the element to the page
    // the new element is animated in CSS
    const newElement = document.createElement('li');
    newElement.textContent = item;

    // display new element in the list
    giftList.appendChild(newElement);
}

function giftExists(gift) {
    return listOfGifts.indexOf(gift);
}

function showMsgEmptyList() {
    msgEmptyList.classList.remove("hidden");
}

function hideMsgEmptyList() {
    msgEmptyList.classList.add("hidden");
}

function initializeList() {
    if (listOfGifts.length === 0) { 
        showMsgEmptyList();
    } else {
        listOfGifts.forEach(giftText => { addItem(giftText) });
    }
}

initializeList();

