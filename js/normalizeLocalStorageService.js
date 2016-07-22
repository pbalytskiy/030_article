function normalizeLocalStorageGeneral(key, type, defaultValue) {
    var item = JSON.parse(localStorage.getItem(key));
    if (!item || typeof item !== type) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
}