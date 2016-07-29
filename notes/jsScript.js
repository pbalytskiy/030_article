/**
 *  Все переменные внутри функции – это свойства специального внутреннего объекта LexicalEnvironment, который создаётся при её запуске.
 *
 *  Интерпретатор, при доступе к переменной, сначала пытается
 *  найти переменную в текущем LexicalEnvironment, а затем,
 *  если её нет – ищет во внешнем объекте переменных.
 *  В данном случае им является window.
 *
 */

// [[ Scope ]] внутренней функции, в отличии от внешней, получить невозможно

var с = 22;

function makeCounter() {
    // makeCounter = {
    //    [[ Scope ]] -> window
    //    LexicalEnvironment = { currentCount: undefined }
    //}
    var currentCount = 1;
    // makeCounter = {
    //    [[ Scope ]] -> window
    //    LexicalEnvironment = { currentCount: 1 }
    //}
    return function() {
        // f = {
        //    [[ Scope ]] -> makeCounter.LexicalEnvironment = { currentCount: 1 }
        //    LexicalEnvironment: {}
        //}
        return currentCount++;
    };
}

var counter = makeCounter();

// каждый вызов увеличивает счётчик и возвращает результат
console.log( counter() ); // 1
console.log( counter() ); // 2
console.log( counter() ); // 3

// создать другой счётчик, он будет независим от первого
var counter2 = makeCounter();
console.log( counter2() ); // 1

var myObject = (function() {
    // LexicalEnvironment = { [[window]]: { res: undefined }, privateFunc: undefined };
    var privateFunc = function () {
        console.log('private');
    };
    // LexicalEnvironment = { [[window]]: { res: undefined }, privateFunc: function };
    return {
        func: function (a, b) {
            console.log(privateFunc);
            // LexicalEnvironment = { [[(f)()]]: { res: undefined }, privateFunc: undefined };
            var innerFunc = function() {
                console.log(self);
            };

            innerFunc();

            return a + b;
        },

        publicFunc: function () {
            console.log('public');
        }
    }
})();

var res = myObject.func(1, 3); // -> 4