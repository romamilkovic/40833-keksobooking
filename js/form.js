'use strict';

var pins = document.querySelectorAll('.pin');
var pinActive = document.querySelector('.pin--active');
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
function addActivePin(pin) {
  pin.classList.add('pin--active');
}

// Проверяем наличие активного pin и убираем его если есть
function removeActivePin() {
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
}

// После клика на pin, убираем активный класс у всех pins, добавляем активным класс к текущему pin и показываем диалоговое окно
function clickOnPin(event) {
  removeActivePin();
  addActivePin(event.currentTarget);
  dialog.style.display = 'block';
}

// Делаем pin неактивным и закрываем диологовое окно
dialogClose.addEventListener('click', function (event) {
  removeActivePin();
  dialog.style.display = 'none';
});

// Вещаем на все pins обработчик событий на клик
var deactivateAllPins = function () {
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', clickOnPin);
  }
};

deactivateAllPins();

// Задаем инпуты определенные требования валидации
noticeTitle.required = true;
noticeTitle.minLength = 30;
noticeTitle.maxLength = 100;
noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.min = 1000;
noticePrice.max = 1000000;
noticeAddress.required = true;

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

// Добавляем обработчик событий на изменения
noticeTime.addEventListener('change', timeSync);
noticeTimeOut.addEventListener('change', timeOutSync);

// В зависимости от выбранного типа устанавливаем необходимую цену
var typeSync = function () {
  var noticeTypeSelectedOption = noticeType.selectedIndex;
  // console.log(noticeTypeSelectedOption);
  switch (noticeTypeSelectedOption) {
    case 0:
      noticePrice.min = 1000;
      break;
    case 1:
      noticePrice.min = 0;
      break;
    case 2:
      noticePrice.min = 10000;
      break;
  }
};

// Добавляем обработчик событий на изменения
noticeType.addEventListener('change', typeSync);


// Синхронизиурем кол-во комнат и гостей
var roomNumberSync = function () {
  if (noticeRoomNumber.options[0].selected === true) {
    noticeCapacity.options[1].selected = true;
  } else {
    noticeCapacity.options[0].selected = true;
  }
};

var capacitySync = function () {
  if (noticeCapacity.options[1].selected === true) {
    noticeRoomNumber.options[0].selected = true;
  }
};

// Добавляем обработчик событий на изменения
noticeRoomNumber.addEventListener('change', roomNumberSync);
noticeCapacity.addEventListener('change', capacitySync);
