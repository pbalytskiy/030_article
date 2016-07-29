var loggedInUserEmail = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
var users = JSON.parse(localStorage.getItem(USERS_KEY));
var loggedInUser = users[loggedInUserEmail];

if (loggedInUser) {
    var	signInHTML = document.getElementById('sign-in-nav-bar');
    signInHTML.innerHTML = '';
    var userFirstName = loggedInUser.firstName;
    var userLastName = loggedInUser.lastName;
    var userProfileLink = document.createElement('a');
    userProfileLink.setAttribute('href', 'profile.html');
    userProfileLink.innerHTML = userFirstName + ' ' +userLastName;
    signInHTML.appendChild(userProfileLink);

    var signUpHTML = document.getElementById('sign-up-nav-bar');
    signUpHTML.innerHTML = '';
    var logOutLink = document.createElement('a');
    logOutLink.setAttribute('href', '#');
    logOutLink.setAttribute('onclick', 'logOut()');
    logOutLink.innerHTML = 'Log Out';
    signUpHTML.appendChild(logOutLink);
}

