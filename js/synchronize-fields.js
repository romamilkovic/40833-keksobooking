'use strict';

window.synchronizeFields = (function () {
  return function (field1, field2, array1, array2, callback) {
    field1.addEventListener('change', function () {
      var index = array1.indexOf(field1.value);
      callback(field2, array2[index]);
    });
  };
})();
