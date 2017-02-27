'use strict';

window.form = (function () {
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var price = form.querySelector('#price');
  var address = form.querySelector('#address');
  var checkInTime = form.querySelector('#time');
  var checkOutTime = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var capacity = form.querySelector('#capacity');
  var roomNumber = form.querySelector('#room_number');

  var availableCheckInTime = ['12', '13', '14'];
  var availableCheckOutTime = ['12', '13', '14'];

  var roomPrices = ['1000', '0', '10000'];
  var roomCapacity = ['0', '3', '3'];
  var roomNumbers = ['1', '2', '100'];
  var roomTypes = ['flat', 'shack', 'castle'];

  // Задаем инпутам определенные требования валидации
  var setupFormValidation = function () {
    title.required = true;
    title.minLength = 30;
    title.maxLength = 100;
    price.required = true;
    price.type = 'number';
    price.min = 1000;
    price.max = 1000000;
    address.required = true;
  };

  setupFormValidation();

  // Функция callback для синхронизации value
  var syncValue = function (element, value) {
    element.value = value;
  };

  // Функция callback для синхронизации value с min значением
  var syncMin = function (element, value) {
    element.min = value;
  };

  // Инициализируем модуль для работы с pins
  window.initializePins();

  window.synchronizeFields(checkInTime, checkOutTime, availableCheckInTime, availableCheckOutTime, syncValue);
  window.synchronizeFields(checkOutTime, checkInTime, availableCheckOutTime, availableCheckInTime, syncValue);

  window.synchronizeFields(roomNumber, capacity, roomNumbers, roomCapacity, syncValue);
  window.synchronizeFields(capacity, roomNumber, roomCapacity, roomNumbers, syncValue);

  window.synchronizeFields(type, price, roomTypes, roomPrices, syncMin);
})();
