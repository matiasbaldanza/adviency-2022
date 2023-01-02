import { cleanWhitespace, stringsEqual, applyAnimation, textContentWithoutChildren } from "./imports/utilities.js";
import { storeItem, deleteItemFromStorage, isStorageEmpty, readAllStorage, deleteAllStorage } from "./imports/storage.js"

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

// 4. STATE
const copyOfStorage = readAllStorage();

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
        if (isStorageEmpty()) hideMsgEmptyList();
        
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
        form.reset(); console.log("FORM RESET")
        form.firstElementChild.focus({focusVisible: true});
    } 
    
} );

// If an item is clicked => REMOVE item
giftList.addEventListener("click", (event) => {
    // remove from the list
    let element = event.target;

    // find the list item that was clicked
    while (!element.classList.contains("list-item")) {
        element = element.parentNode;
    }
    // remove list item from the list
    element.remove();

    // remove from storage
    deleteItemFromStorage(event.target.firstChild.textContent);

    if (isStorageEmpty()) showMsgEmptyList();
})


btnDeleteAll.addEventListener("click", (event) => {
    // remove all elements from the page
    while (giftList.lastChild) { giftList.lastChild.remove(); }

    deleteAllStorage();

    showMsgEmptyList();
});

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
    newElement.classList.add("list-item");
    
    const newElementSpan = document.createElement('span');
    newElementSpan.classList.add('gift-info');
    newElementSpan.textContent = ` (${itemQty})`;

    newElement.appendChild(newElementSpan);

    // display new element in the list
    giftList.appendChild(newElement);
}

function showList(list) {
    if (isStorageEmpty()) { 
        showMsgEmptyList();
    } else {
        list.forEach((giftQty, giftName) => { addItemToList(giftName, giftQty) });
    }
}

showList(copyOfStorage);

/* 

TODO: Modularize
TODO: Access form on submit using FormData instead of accessing individual inputs
TODO: WebComponents? ShadowDom? How to handle CSS.
TODO: E2E Testing with Cypress
TODO: Day 9: LocalStorage

*/
