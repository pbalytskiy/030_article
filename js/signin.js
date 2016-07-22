var signInFormData = {
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    errors: []
};

var signInFormContainer = document.getElementById('sign-in-form-container');
signInFormContainer.innerHTML = renderTemplate('sign-in-form-template', signInFormData);

function logInCheckEmailAndPassword() {
    var email = document.getElementById('email').value;
    signInFormData.email.value = email;
    var password = document.getElementById('password').value;
    signInFormData.password.value = password;
    var users = JSON.parse(localStorage.getItem(USERS_KEY));

    if (!password) {
        signInFormData.password.error = 'Type a password!';
    }

    function checkEmail() {
        for (email in users) {
            if (!users.hasOwnProperty(email)) continue;
            var field = users[email];
            if (field.value = email) {
                return true;
            } else {
                signInFormData.email.error = 'Wrong email!';
            }
        }
    }

    function checkPassword() {
        for (password in users) {
            if (!users.hasOwnProperty(password)) continue;
            var field = users[password];
            if (field.value = email) {
                return true;
            } else {
                signInFormData.password.error = 'Wrong password!'
            }
        }
    }

    if (checkEmail() && checkPassword()) {
        window.location.replace('index.html');
    } else {
        signInFormContainer.innerHTML = renderTemplate('sign-in-form-template', signInFormData);
    }
}

