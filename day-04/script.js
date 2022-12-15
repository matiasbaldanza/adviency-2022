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
    deleteItemFromStorage(event.target.textContent);
})

// MOCK DATA

const listOfGifts = [ 
    'Hub Thunderbolt nuevo', 
    'Luces para el stream',  
    'Soporte para la cámara',
];

// FUNCTIONS

function storeItem(item) {
    listOfGifts.push(item);
    console.log(listOfGifts);
}

function deleteItemFromStorage(item) {
    const itemIndex = listOfGifts.indexOf(item);
    listOfGifts.splice(itemIndex, 1);
    console.log(listOfGifts)
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


// create toolbar "delete"
// add event to delete button

// show the toolbar on hover