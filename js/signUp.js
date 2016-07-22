var signUpFormData = {
    firstName: {value: '', error: false},
    lastName: {value: '', error: false},
    email: {value: '', error: false},
    username: {value: '', error: false},
    password: {value: '', error: false},
    confirmPassword: {value: '', error: false},
    errorMessages: []
};

var signUpFormContainer = document.getElementById('sign-up-form-container');
signUpFormContainer.innerHTML = renderTemplate('sign-up-form-template', signUpFormData);

var USER_SEQUENCE_KEY = 'user_sequence';
var USERS_KEY = 'users';

function submitSignUpForm() {
    var form = signUpFormData;
    var hasError = false;
    normalizeLocalStorageGeneral(USER_SEQUENCE_KEY, 'number', 1);
    normalizeLocalStorageGeneral(USERS_KEY, 'object', {});

    form.firstName.value = document.getElementById('first-name').value;
    form.lastName.value = document.getElementById('last-name').value;
    form.email.value = document.getElementById('email').value;
    form.username.value = document.getElementById('username').value;
    form.password.value = document.getElementById('password').value;
    form.confirmPassword.value = document.getElementById('confirm-password').value;

    // ...
    for (var fieldName in form) {
        if (!form.hasOwnProperty(fieldName)) continue;
        var field = form[fieldName];
        if (!field.value) {
            field.error = true;
            hasError = true;
        }
    }

    if (hasError) {
        signUpFormContainer.innerHTML = renderTemplate('sign-up-form-template', form);
        return;
    }

    if (form.password.value !== form.confirmPassword.value) {
        form.errorMessages.push('Passwords do not match');
        return;
    }

    var users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (users[form.email.value]) {
        form.errorMessages.push('User is already exists');
        signUpFormContainer.innerHTML = renderTemplate('signUpFormTemplate', form);
        return;
    }

    var user = {
        login: form.email.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value
    };

    users[user.login] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    signUpFormContainer.innerHTML = 'OK!!!';

}