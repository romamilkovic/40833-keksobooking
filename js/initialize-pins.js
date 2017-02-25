
'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMap = document.querySelector('.tokyo__pin-map');
    var pins = document.querySelectorAll('.pin');
    var highlightedPin = document.querySelector('.pin--active');
    var dataUrl = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
    var similarApartments = [];

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


    // Восстанавливаем фокус
    function restorePinFocus(pin) {
      pin.focus();
    }

    // Убираем активный класс у pin, если диал. окно было открыто с клавиатуры, то при закрытии
    // возвращаем фокус на pin
    function closeDialogHandler(pin, openFromKeyboard) {
      return function () {
        deactivatePins();
        if (openFromKeyboard) {
          restorePinFocus(pin);
        }
      };
    }

    // Работаем с pins с помощью делегирования
    // цикл двигается вверх от target до .tokyo__pin-map
    // затем находим нужный нам элемент с помощью метода contains.
    var pinsMapHandler = function (event, openFromKeyboard) {
      var target = event.target;
      while (target !== pinsMap) {
        if (target.classList.contains('pin')) {
          deactivatePins();
          window.showCard(closeDialogHandler(target, openFromKeyboard));
          highlightPin(target);
          return;
        }
        target = target.parentNode;
      }
    };

    // Ловим событие на enter
    var pinsMapKeyDownHandler = function (event) {
      if (window.utils.isKeyEnter(event)) {
        pinsMapHandler(event, true);
      }
    };

    // Если pin изначально активный, то вешаем на него обработчик
    if (highlightedPin) {
      window.showCard(closeDialogHandler(highlightedPin));
    }

    // Создаем функцию callback, создаем новый объект с данными из первых трех элементов,
    // создаем новый fragment и добавляем в DOM каждый из этих элементов
    var onLoad = function (data) {
      similarApartments = data;
      var fragment = document.createDocumentFragment();
      var dialogFragment = document.createDocumentFragment();
      var slicedSimilarApartments = similarApartments.slice(0, 3);

      slicedSimilarApartments.forEach(function (element, index) {
        fragment.appendChild(window.createPin(element, index));
        dialogFragment.appendChild(window.createDialog(element, index));
      });

      pinsMap.appendChild(fragment);
      pinsMap.appendChild(dialogFragment);

    };

    window.load(dataUrl, onLoad);

    // Добавляем обработчики для действий с pins
    pinsMap.addEventListener('click', pinsMapHandler);
    pinsMap.addEventListener('keydown', pinsMapKeyDownHandler);
  };
})();
