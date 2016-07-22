
var a = undefined;
alert( a ); // -> undefined
a = 5;
alert( a ); // -> 5

var a = 5;
alert( window.a );

window.b = 5;
alert( b );
//Это аналог другой ситуации.
var obj = {};
obj.newField = 999;
alert(obj.newField);
/*
 Только полями объекта window можно пользоваться сразу
 без указанаия того что это поле принадлежит window

 Например:
 window.globalField = 45;
 console.log(globalField);

 var obj = {test: 888};
 console.log(test); <- будет ошибка. Переменная не определена
 потому как obj - это поле объекта window
 а когда пишем
 console.log(test);
 то поле тест ищется в объекте window а не в obj
 */

//Так тоже можно. НО НЕ НУЖНО!!!
c = 22;
alert(c);



function isObjectEmpty(obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        return false;
    }
    return true;
}
