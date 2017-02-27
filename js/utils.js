'use strict';

window.utils = (function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var isKeyEnter = function (event) {
    return event.keyCode === ENTER_KEY_CODE;
  };

  var isKeyEsc = function (event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  };

  var isFunction = function (checkFunction) {
    return typeof checkFunction === 'function';
  };

  var getRandomElements = function (array, number) {
    var result = new Array(number);
    var length = array.length;
    var taken = new Array(length);
    if (number > length) {
      throw new RangeError('getRandomElements: more elements taken than available in array');
    }
    while (number--) {
      var random = Math.floor(Math.random() * length);
      result[number] = array[random in taken ? taken[random] : random];
      taken[random] = --length;
    }
    return result;
  };

  return {
    isKeyEnter: isKeyEnter,
    isKeyEsc: isKeyEsc,
    isFunction: isFunction,
    getRandomElements: getRandomElements
  };
})();
