var signInTemplate = '\
    <h1>Sign In</h1>\
    <form class="form-horizontal">\
        <div class="form-group <%= errors.usernameError ? "has-error" : "" %>">\
            <label for="signInUsername" class="col-sm-2 control-label">Username</label>\
            <div class="col-sm-10">\
                <input id="signInUsername" type="text" class="form-control" placeholder="email" value="<%- username %>">\
                <span class="help-block"><%= errors.usernameError %></span>\
            </div>\
        </div>\
        <div class="form-group <%= errors.passwordError ? "has-error" : "" %>">\
            <label for="signInPassword" class="col-sm-2 control-label">Password</label>\
            <div class="col-sm-10">\
                <input id="signInPassword" type="password" class="form-control" placeholder="password" value="<%- password %>">\
                <span class="help-block"><%= errors.passwordError %></span>\
            </div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                <div class="checkbox">\
                    <label>\
                        <input type="checkbox"> Remember me\
                    </label>\
                </div>\
            </div>\
        </div>\
        <div class="form-group">\
            <div class="col-sm-offset-2 col-sm-10">\
                <button type="button" class="btn btn-default" onclick="logIn()">Sign in</button>\
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#sign-in"\
                        aria-expanded="false" aria-controls="sign-in">Help\
                </button>\
            </div>\
        </div>\
    </form>\
    <% if (errors.errorMessage) { %>\
        <div class="alert alert-danger" role="alert">\
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\
            <span class="sr-only"></span> <%- errors.errorMessage %> \
        </div>\
     <% } %>\
';

var USER_SEQUENCE_KEY = 'user_sequence';
var USERS_KEY = 'users';

var data = {
    username: '',
    password: '',
    errors: {}
};

function normalizeLocalStoreyValue(key, type, value) {
    var storageValue = JSON.parse(localStorage.getItem(key));
    if (!storageValue || typeof storageValue !== type) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

normalizeLocalStoreyValue(USER_SEQUENCE_KEY, 'number', 1);
normalizeLocalStoreyValue(USERS_KEY, 'object', {});

var sigInCompiled = _.template(signInTemplate);
var sigInFormContainer = document.getElementById('signInFormContainer');
sigInFormContainer.innerHTML = sigInCompiled(data);
var users = {};

function logIn() {
    var username = document.getElementById('signInUsername').value;
    var password = document.getElementById('signInPassword').value;

    var data = { //why do we create an odject?
        username: username,
        password: password,
        errors: {
            usernameError: '',
            passwordError: '',
            errorMessage: ''
        }
    };

    if (!username) {
        data.errors.usernameError = 'Need login';
    }
    if (!password) {
        data.errors.passwordError = 'Need password';
    }
    if (!username || !password) {
        sigInFormContainer.innerHTML = sigInCompiled(data);
        return; //Why do we use the return?
    }

    data.username = '';
    data.password = '';
    var user = getUser(username, password);
    if (user) {
        window.location = 'index.html';
    } else {
        data.errors.errorMessage = 'username has not been identify';
        sigInFormContainer,innerHTML = sigInCompiled(data);
    }
}

function getUser(username, password) {
    return true;
}