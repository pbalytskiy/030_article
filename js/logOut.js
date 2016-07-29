function logOut() {
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(""));
    window.location = 'index.html';
}