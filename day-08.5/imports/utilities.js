// UTILITIES

export const cleanWhitespace = (string) => { 
    return string
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ');
};

export const stringsEqual = (string1, string2) => {
    return cleanWhitespace(string1)
            .localeCompare(cleanWhitespace(string2), 
                            'default', { sensitivity: 'base', ignorepunctuation: true }) 
            === 0;
}

export const applyAnimation = (element, animationClass, timeout) => {
    element.classList.add(animationClass);
    setTimeout(() => { element.classList.remove(animationClass) }, timeout);
}

export const textContentWithoutChildren = (element) => element.childNodes[0].textContent;

