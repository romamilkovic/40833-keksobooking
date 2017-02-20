'use strict';

window.synchronizeFields = function (field1, field2, array1, array2, prop) {

  field1.addEventListener('change', function () {
    var indexOfValue = array1.indexOf(field1.value);
    field2[prop] = array2[indexOfValue];
  });

  field2.addEventListener('change', function () {
    var indexOfValue = array2.indexOf(field2.value);
    field1[prop] = array1[indexOfValue];
  });

};
