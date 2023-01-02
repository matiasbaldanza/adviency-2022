// STORAGE
import { mockData as storage } from "./mockdata.js";
import { stringsEqual } from "./utilities.js";

export function storeItem(itemName, itemQty = 1) {
    let found = false;
    storage.forEach( (value, key) => {
        // If found, increment the quantity
        if (stringsEqual(key, itemName)) {
            found = true;
            storage.set(key, value + itemQty);
        }
    } );    

    // If not found, append to the list
    if (!found) { 
        storage.set(itemName, itemQty);
    }
}

export function deleteItemFromStorage(itemName) {
    storage.delete(itemName);
}

export function deleteAllStorage() {
    storage.clear();
}

export const isStorageEmpty = () => storage.size === 0;

export const readAllStorage = () => new Map(storage);