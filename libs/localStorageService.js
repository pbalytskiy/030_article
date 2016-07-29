var USERS_KEY = 'users';
var LOGGED_IN_USER = 'loggedInUser';
var SEQUENCE_KEY = 'article_sequence';
var ARTICLES_KEY = 'articles';

normalizeLocalStorage(SEQUENCE_KEY, 'number', 1);
normalizeLocalStorage(ARTICLES_KEY, 'object', {});
normalizeLocalStorage(USERS_KEY, 'object', {});
normalizeLocalStorage(LOGGED_IN_USER, 'string', "");

function normalizeLocalStorage(key, type, defaultValue) {
    var item = JSON.parse(localStorage.getItem(key));
    if (!item || typeof item !== type) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
}

// /*
// var USERS_KEY = 'users';
// var LOGGED_IN_USER = 'loggedInUser';
// var SEQUENCE_KEY = 'article_sequence';
// var ARTICLES_KEY = 'articles';
//
// ;(function () {
//
//     function normalizeLocalStorage(key, type, defaultValue) {
//         var item = JSON.parse(localStorage.getItem(key));
//         if (!item || typeof item !== type) {
//             localStorage.setItem(key, JSON.stringify(defaultValue));
//         }
//     }
//
//     var $db = {
//         initialize: function (keys) {
//             for (var i =0 ; kyes.length; i++) {
//                 var obj = kyes[i];
//                 normalizeLocalStorage(obj.key, obj.type, 1);
//             }
//         }
//     };
//
//
//
//     window.$db = $db;
// })();*/