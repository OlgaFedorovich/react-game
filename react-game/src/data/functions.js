const setToLocalStorage = (itemName, info) => {
    localStorage.setItem(itemName, JSON.stringify(info));
};

const getFromLocalStorage = async (itemName) => {
    const info = await JSON.parse(localStorage.getItem(itemName));
    return info;
};

export {setToLocalStorage, getFromLocalStorage};