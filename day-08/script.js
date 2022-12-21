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
    const newGiftQty = parseInt(giftQty.value);
    
     // VALIDATION: If text is empty, notify user
    if (newGiftName.trim() === "") {
        applyAnimation(form, "shake", 500);
    } else {
        // Hide the Empty List message if adding the first element
        if (isGiftListEmpty()) hideMsgEmptyList();

        // Add gift to list
        showItem(newGiftName, newGiftQty);      
        storeItem(newGiftName, newGiftQty);     // Handles append or increment

        // Clear the form and return focus to first input
        form.reset(); 
        form.firstElementChild.focus({focusVisible: true});
    } 
    
} );

function giftIndex(gift) {
    // comparison strips additional whitespace and takes into account locale versions of characters using localeCompare
    return listOfGifts.findIndex(element => 
        cleanWhitespace(element)
            .localeCompare(cleanWhitespace(gift), 
                            'default', { sensitivity: 'base', ignorepunctuation: true }) === 0
        ); 
}

function showMsgGiftAlreadyExists(index) {
    // Mensaje al usuario
    applyAnimation(form, "shake", 500);

    // Destacar el regalo si está visible por unos segundos
    applyAnimation(giftList.children[index], "warning-red-highlight", 2000);
}


// If an item is clicked => REMOVE item
giftList.addEventListener("click", (event) => {
    // remove from the list
    event.target.remove();

    // remove from storage
    deleteItemFromStorage(event.target.firstChild.textContent);

    if (isGiftListEmpty()) showMsgEmptyList();
})

function isGiftListEmpty() {
    return listOfGifts.size === 0;
}

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

const cleanWhitespace = (string) => { 
    return string
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ');
};

const stringsEqual = (string1, string2) => {
    return cleanWhitespace(string1)
            .localeCompare(cleanWhitespace(string2), 
                            'default', { sensitivity: 'base', ignorepunctuation: true }) 
            === 0;
}

const applyAnimation = (element, animationClass, timeout) => {
    element.classList.add(animationClass);
    setTimeout(() => { element.classList.remove(animationClass) }, timeout);
}

// FUNCTIONS

function storeItem(itemName, itemQty = 1) {
    let found = false;
    listOfGifts.forEach( (value, key) => {
        // If found, increment the quantity
        if (stringsEqual(key, itemName)) {
            found = true;
            listOfGifts.set(key, value + itemQty);
        }
    } );    

    // If not found, append to the list
    if (!found) { 
        listOfGifts.set(itemName, itemQty);
    }
}

function deleteItemFromStorage(itemName) {
    listOfGifts.delete(itemName);
}

function showItem(itemName, itemQty = 1) {
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

function showList() {
    if (isGiftListEmpty()) { 
        showMsgEmptyList();
    } else {
        listOfGifts.forEach((giftQty, giftName) => { showItem(giftName, giftQty) });
    }
}

showList();

/* 

TODO: Adding a repeated gift should increment the QTY by the QTY input
TODO: Access form on submit using FormData instead of accessing individual inputs
TODO: Day 9: LocalStorage

*/