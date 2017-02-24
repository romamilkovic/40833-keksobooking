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

  return {
    isKeyEnter: isKeyEnter,
    isKeyEsc: isKeyEsc,
    isFunction: isFunction
  };
})();
