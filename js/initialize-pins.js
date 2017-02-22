'use strict';

window.initializePins = (function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var pins = document.querySelectorAll('.pin');
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Добавляем активный класс к пину
  var highlightPin = function (pin) {
    pin.classList.add('pin--active');
    pin.setAttribute('aria-pressed', true);
  };

  // Проверяем наличие активного pin и убираем его если есть
  var deactivatePins = function () {
    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      pin.classList.remove('pin--active');
      pin.setAttribute('aria-pressed', false);
    }
  };

  // Метод для показа диалога
  var showDialog = function () {
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    document.addEventListener('keydown', eventHandlerKeydownDialog);
  };

  // Метод для скрытия диалога
  var hideDialog = function () {
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    document.removeEventListener('keydown', eventHandlerKeydownDialog);
  };

  // Обработчик события на нажатие ESC
  function eventHandlerKeydownDialog(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      deactivatePins();
      hideDialog();
    }
  }

  var dialogCloseEventHandler = function () {
    deactivatePins();
    hideDialog();
  };

  // Работаем с pins с помощью делегирования
  // цикл двигается вверх от target до .tokyo__pin-map
  // затем находим нужный нам элемент с помощью метода contains.
  var pinsMapEventHandler = function (event) {
    var target = event.target;
    while (target !== pinsMap) {
      if (target.classList.contains('pin')) {
        deactivatePins();
        showDialog();
        highlightPin(target);
        return;
      }
      target = target.parentNode;
    }
  };

  var pinsMapKeyDownEventHandler = function (event) {
    switch (event.keyCode) {
      case ENTER_KEY_CODE:
        pinsMapEventHandler(event);
        break;
      default:
        break;
    }
  };

  // Добавляем обработчики для действий с pins
  pinsMap.addEventListener('click', pinsMapEventHandler);
  pinsMap.addEventListener('keydown', pinsMapKeyDownEventHandler);

  dialogClose.addEventListener('click', dialogCloseEventHandler);
})();
