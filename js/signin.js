var signInTemplate = '\
    <h1>Sign Iiiiiin</h1>\
    <form class="form-horizontal">\
        <div class="form-group <% if (loginError) print("has-error"); %>">\
        <label for="exampleInputName2" class="col-sm-2 control-label">Username</label>\
        <div class="col-sm-10">\
        <input type="text" class="form-control" id="signInLogin" placeholder="E.g. ashwinhegde">\
        </div>\
        </div>\
        <div class="form-group <% if (passwordError) print("has-error"); %>">\
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>\
                <div class="col-sm-10">\
                <input type="password" class="form-control" id="signInPassword" placeholder="Min. 8 Characters">\
                <span id="helpBlock2" class="help-block">A block of help text that </span>\
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
        <button type="submit" class="btn btn-default" onclick="logIn()">Sign in</button>\
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#sign-in" aria-expanded="false" aria-controls="sign-in">Help</button>\
        <div class="collapse" id="sign-in">\
        <div class="well">\
        <p>заповни форму, недоумку</p>\
    </div>\
    </div>\
    </div>\
    </div>\
</form>';

function setArticlesInRow(count) {
    articlesInRow = count;
    renderArticles();
}

function normalizeLocalStorageValue(key, type, defaultValue) {
    var item = JSON.parse(localStorage.getItem(key));
    if (!item || typeof item !== type) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
}
normalizeLocalStorageValue(SEQUENCE_KEY, 'number', 1);
normalizeLocalStorageValue(ARTICLES_KEY, 'object', {});

var signInCompiled = _.template(signInTemplate);
var data = {loginError: false, passwordError: false, user: false};
var signInFormContainer = document.getElementById('signInFormContainer');
signInFormContainer.innerHTML = signInCompiled(data);

function logIn() {
    var login  = document.getElementById('signInLogin').value;
    var password  = document.getElementById('signInPassword').value;
    if (!login) {
        data.loginError = true;
        signInFormContainer.innerHTML = signInCompiled(data);
        return;
    }
    if (!password) {
        data.passwordError = true;
        signInFormContainer = document.getElementById('signInFormContainer');
        signInFormContainer.innerHTML = signInCompiled(data);
        return;
    }
    var user = getUser(login, password);
    if (user) {
        window.location.resolveURL('http://localhost:63342/030_article/index.html?_ijt=teg2a7r06cp1ah94gvcttdr0qj');
    } else {
        data.user = false;
    }
}

function getUser(login, password) {
    //....
    var user = {};
    user.name = 'Pavel';
    user.surname = 'Balytskiy';
    return user;
}

var users = {
    'pavel@mail.ru': {login: 'pavel@mail.ru', password: '123456', name: 'Pavel', surname: 'Balytskiy'},
    'pavel2@mail.ru': {login: 'pavel2@mail.ru', password: '123456', name: 'Pavel', surname: 'Balytskiy'}
};