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
    const newGift = gift.value;
    
     // VALIDATION: If text is empty, notify user
    if (newGift.trim() === "") {
        applyAnimation(form, "shake", 500);
    } else if (giftIndex(newGift) === -1) {
        // Hide the Empty List message if adding the first element
        if (listOfGifts.length === 0) hideMsgEmptyList();

        // Add gift to list
        addItem(newGift); 
        storeItem(newGift);

        // Clear the form
        gift.value = "";  
    } else {
        // Notify user that gift already exists
        showMsgGiftAlreadyExists(giftIndex(newGift));
    }
    
} );

function giftIndex(gift) {
    /* return listOfGifts.findIndex(element => normalizeString(element) === normalizeString(gift));  */
    return listOfGifts.findIndex(element => 
        normalizeString(element)
            .localeCompare(normalizeString(gift), 
                            'default', { sensitivity: 'base', ignorepunctuation: true }) === 0
        ); 
}

function showMsgGiftAlreadyExists(index) {
    // Mensaje al usuario
    applyAnimation(form, "shake", 500);

    // Destacar el regalo si está visible por unos segundos
    applyAnimation(giftList.children[index], "warning-red-highlight", 2000);
        
    /* alert("Ya agregaste ese regalo"); */
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

const applyAnimation = (element, animationClass, timeout) => {
    element.classList.add(animationClass);
    setTimeout(() => { element.classList.remove(animationClass) }, timeout);
}

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

