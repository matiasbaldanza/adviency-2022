// MOCK DATA

let listOfGifts = new Map ([ 
    ['Hub Thunderbolt nuevo',  1],
    ['Luces para el stream',   1],
    ['Soporte para la cámara', 1]
]);

// SELECT ITEMS
// 1. FORM
const form = document.querySelector(".gift-list-form");
const giftName = document.querySelector("#input-gift");
const giftQty = document.querySelector("#input-qty");

// 2. LIST
const giftList = document.querySelector(".gift-list");
const msgEmptyList = document.querySelector("#msg-empty");

// 3. BUTTONS
const btnDeleteAll = document.querySelector("#btn-delete-all");

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
        
        const giftToUpdate = findGiftOnList(newGiftName);

        // If gift is not on the list, append to list
        if (giftToUpdate == undefined) {
            addItemToList(newGiftName, newGiftQty);
        } else {
            // calculate the new Quantity
            // TODO: replace manual calculation from a FETCH from storage
            const currentQty = parseInt(giftToUpdate.childNodes[1].textContent.match(/\d+/)[0], 10);

            // update the Quantity on the list 
            // TODO: this formatting of the <span> SHOULD NOT BE HARDCODED
            giftToUpdate.childNodes[1].textContent = ` (${currentQty + newGiftQty})`;

            // animar elemento
            applyAnimation(giftToUpdate, "update-green-highlight", 2000)
        }

        // Update storage
        storeItem(newGiftName, newGiftQty);  // Handles append or increment

        // Clear the form and return focus to first input
        form.reset(); 
        form.firstElementChild.focus({focusVisible: true});
    } 
    
} );

// If an item is clicked => REMOVE item
giftList.addEventListener("click", (event) => {
    // remove from the list
    event.target.remove();

    // remove from storage
    deleteItemFromStorage(event.target.firstChild.textContent);

    if (isGiftListEmpty()) showMsgEmptyList();
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

const textContentWithoutChildren = (element) => element.childNodes[0].textContent;

const isGiftListEmpty = () => listOfGifts.size === 0;

// PRESENTATION

const showMsgEmptyList = () => msgEmptyList.classList.remove("hidden");
const hideMsgEmptyList = () => msgEmptyList.classList.add("hidden");

function findGiftOnList(giftName) {
    const giftsOnList = [...giftList.children];

    return giftsOnList.find(element => 
        cleanWhitespace(textContentWithoutChildren(element))
            .localeCompare(cleanWhitespace(giftName), 
                            'default', { sensitivity: 'base', ignorepunctuation: true }) === 0
        );
}

function addItemToList(itemName, itemQty = 1) {
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

function showList() {
    if (isGiftListEmpty()) { 
        showMsgEmptyList();
    } else {
        listOfGifts.forEach((giftQty, giftName) => { addItemToList(giftName, giftQty) });
    }
}

// STORAGE

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

showList();

/* 

TODO: Modularize
TODO: Access form on submit using FormData instead of accessing individual inputs
TODO: WebComponents?
TODO: E2E Testing with Cypress
TODO: Day 9: LocalStorage

*/