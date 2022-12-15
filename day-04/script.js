// MOCK DATA

let listOfGifts = [ 
    'Hub Thunderbolt nuevo', 
    'Luces para el stream',  
    'Soporte para la cámara',
];

// SELECT ITEMS
const giftList = document.querySelector(".gift-list");
const form = document.querySelector(".gift-list-form");
const gift = document.querySelector("#input-gift");

// EVENT LISTENERS

form.addEventListener("submit", e => {
    e.preventDefault();
    
    if (gift.value === "") {
        form.classList.add("shake");
        setTimeout(() => { form.classList.remove("shake") }, 500);
    }
    
    addItem(gift.value); 
    storeItem(gift.value);
    gift.value = "";  
} );

giftList.addEventListener("click", (event) => {
    // remove from the list
    event.target.remove();

    // remove from storage
    listOfGifts = deleteItemFromStorage(event.target.textContent);
})

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

function initializeList() {
    listOfGifts.forEach(giftText => { addItem(giftText) });
}


initializeList();

