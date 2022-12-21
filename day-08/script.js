// MOCK DATA

let listOfGifts = new Map ([ 
    ['Hub Thunderbolt nuevo',  1],
    ['Luces para el stream',   1],
    ['Soporte para la cámara', 1]
]);

// SELECT ITEMS
const giftList = document.querySelector(".gift-list");
const form = document.querySelector(".gift-list-form");
const giftName = document.querySelector("#input-gift");
const giftQty = document.querySelector("#input-qty");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const msgEmptyList = document.querySelector("#msg-empty");

// EVENT LISTENERS

form.addEventListener("submit", e => {
    e.preventDefault();
    const newGiftName = giftName.value;
    const newGiftQty = giftQty.value;
    
     // VALIDATION: If text is empty, notify user
    if (newGiftName.trim() === "") {
        applyAnimation(form, "shake", 500);
    } else /* if (giftIndex(newGift) === -1) */ {
        // Hide the Empty List message if adding the first element
        if (listOfGifts.length === 0) hideMsgEmptyList();

        // Add gift to list
        addItem(newGiftName, newGiftQty); 
        storeItem(newGiftName, newGiftQty);

        // Clear the form
        form.reset();  
    } /* else {
        // Notify user that gift already exists
        showMsgGiftAlreadyExists(giftIndex(newGift));
    } */
    
} );

function giftIndex(gift) {
    // comparison strips additional whitespace and takes into account locale versions of characters using localeCompare
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


// If an item is clicked => REMOVE item
giftList.addEventListener("click", (event) => {
    // remove from the list
    event.target.remove();

    // remove from storage
    deleteItemFromStorage(event.target.firstChild.textContent);

    if (listOfGifts.length === 0) showMsgEmptyList();
})

btnDeleteAll.addEventListener("click", (event) => {
    // remove all elements from the page
    while (giftList.lastChild) {
        giftList.lastChild.remove();
    }

    // remove all elements from storage (array)
    listOfGifts.clear();

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

function storeItem(itemName, itemQty = 1) {
    listOfGifts.set(itemName, itemQty);
}

function deleteItemFromStorage(itemName) {
    listOfGifts.delete(itemName);
}

function addItem(itemName, itemQty = 1) {
    // add the element to the page with its name
    // append a <span> to include additional info (quantity)
    // the new element is animated in CSS
    const newElement = document.createElement('li');
    newElement.textContent = `${itemName}`;
    
    const newElementSpan = document.createElement('span');
    newElementSpan.classList.add('gift-info');
    newElementSpan.textContent = ` (${itemQty})`;


    newElement.appendChild(newElementSpan);

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
        listOfGifts.forEach((giftQty, giftName) => { addItem(giftName, giftQty) });
    }
}

initializeList();

/* 

TODO: After adding a gift, the focus should return to the text input
TODO: Adding a repeated gift should increment the QTY by the QTY input
TODO: Day 9: LocalStorage

*/