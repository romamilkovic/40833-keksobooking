'use strict';

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');
var noticeTime = noticeForm.querySelector('#time');
var noticeTimeOut = noticeForm.querySelector('#timeout');
var noticeType = noticeForm.querySelector('#type');
var noticeCapacity = noticeForm.querySelector('#capacity');
var noticeRoomNumber = noticeForm.querySelector('#room_number');

// Добавляем активный класс к пину
var highlightPin = function (pin) {
  pin.classList.add('pin--active');
};

// Проверяем наличие активного pin и убираем его если есть
var deactivatePins = function () {
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    pin.classList.remove('pin--active');
  }
};

// Метод для показа диалога
var showDialog = function () {
  deactivatePins();
  highlightPin(event.currentTarget);
  dialog.style.display = 'block';
};

// Метод для скрытия диалога
var hideDialog = function () {
  deactivatePins();
  dialog.style.display = 'none';
};

// После клика на pin, убираем активный класс у всех pins, добавляем активным класс к текущему pin и показываем диалоговое окно
var pinClickHandler = function (event) {
  showDialog();
};

var dialogCloseEventHandler = function () {
  hideDialog();
};

// Делаем pin неактивным и закрываем диологовое окно
dialogClose.addEventListener('click', dialogCloseEventHandler);

// Вещаем на все pins обработчик событий на клик
var initHandlers = function () {
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', pinClickHandler);
  }
};

initHandlers();

// Задаем инпуты определенные требования валидации
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

// Синхронизируем время въезда/выезда
var timeSync = function () {
  for (var i = 0; i < noticeTime.options.length; i++) {
    if (noticeTime.options[i].selected === true) {
      noticeTimeOut.options[i].selected = true;
    }
  }
};

var timeOutSync = function () {
  for (var i = 0; i < noticeTimeOut.options.length; i++) {
    if (noticeTimeOut.options[i].selected === true) {
      noticeTime.options[i].selected = true;
    }
  }
};

// В зависимости от выбранного типа устанавливаем необходимую цену
var typeSync = function () {
  var noticeTypeSelectedOption = noticeType.options[noticeType.selectedIndex].value;
  switch (noticeTypeSelectedOption) {
    case 'flat':
      noticePrice.min = 1000;
      break;
    case 'shack':
      noticePrice.min = 0;
      break;
    case 'castle':
      noticePrice.min = 10000;
      break;
  }
};

var roomNumberSync = function () {
  if (noticeRoomNumber.options[0].selected) {
    noticeCapacity.options[1].selected = true;
  } else {
    noticeCapacity.options[0].selected = true;
  }
};

var capacitySync = function () {
  if (noticeCapacity.options[1].selected) {
    noticeRoomNumber.options[0].selected = true;
  }
};

// Добавляем обработчик событий на изменения
noticeType.addEventListener('change', typeSync);
noticeTime.addEventListener('change', timeSync);
noticeTimeOut.addEventListener('change', timeOutSync);
noticeRoomNumber.addEventListener('change', roomNumberSync);
noticeCapacity.addEventListener('change', capacitySync);
