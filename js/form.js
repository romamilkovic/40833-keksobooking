'use strict';

var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');
var noticeTime = noticeForm.querySelector('#time');
var noticeTimeOut = noticeForm.querySelector('#timeout');
var noticeType = noticeForm.querySelector('#type');
var noticeCapacity = noticeForm.querySelector('#capacity');
var noticeRoomNumber = noticeForm.querySelector('#room_number');
var timeValues = ['12', '13', '14'];
var priceValues = ['1000', '0', '10000'];
var capacityValues = ['0', '3', '3'];
var roomNumberValues = ['1', '2', '100'];

window.initializePins();

// Задаем инпутам определенные требования валидации
var setupFormValidation = function () {
  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;
  noticePrice.required = true;
  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;
  noticeAddress.required = true;
};

setupFormValidation();

window.synchronizeFields(noticeRoomNumber, noticeCapacity, roomNumberValues, capacityValues, 'value');
window.synchronizeFields(noticeTime, noticeTimeOut, timeValues, timeValues, 'value');
window.synchronizeFields(noticeType, noticePrice, priceValues, priceValues, 'min');
