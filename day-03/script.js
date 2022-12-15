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

    persistItem(gift.value);
    gift.value = "";  
} );


// MOCK DATA

const listOfGifts = [ 
    'Hub Thunderbolt nuevo', 
    'Luces para el stream',  
    'Soporte para la cámara',
];

// FUNCTIONS

function persistItem(item) {
    listOfGifts.push(item);
    console.log(listOfGifts);
}

function addItem(item) {
    // add the element to the page
    // (the new element is animated in CSS)
    const newElement = document.createElement('li');
    newElement.textContent = item;
    giftList.appendChild(newElement);
}

function initializeList() {
    listOfGifts.forEach(giftText => { addItem(giftText) });
}


initializeList();