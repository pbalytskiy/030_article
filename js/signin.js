var signInFormData = {
    email: {value: ''},
    password: {value: ''},
    errors: []
};

var signInFormContainer = document.getElementById('sign-in-form-container');
signInFormContainer.innerHTML = renderTemplate('sign-in-form-template', signInFormData);

function signIn() {
    // event.preventDefault();
    var email = document.getElementById('email').value;
    signInFormData.email.value = email;
    var password = document.getElementById('password').value;
    signInFormData.password.value = password;

    var users = JSON.parse(localStorage.getItem(USERS_KEY));

    var user = users[email];

    if (!user) {
        signInFormData.errors = 'Wrong';
        signInFormContainer.innerHTML = renderTemplate('sign-in-form-template', signInFormData);
        return
    }

    if (user.password !== password) {
        signInFormData.errors = 'Wrong';
        signInFormContainer.innerHTML = renderTemplate('sign-in-form-template', signInFormData);
        return
    }

    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(email));
    window.location.replace('index.html');
}