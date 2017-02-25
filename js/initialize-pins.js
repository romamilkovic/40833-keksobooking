'use strict';

window.initializePins = (function () {
  return function () {

    var pinsMap = document.querySelector('.tokyo__pin-map');
    var pinClicked;
    var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
    // var similarApartments = [];

    // Добавляем активный класс к пину
    var highlightPin = function (pin) {
      pin.classList.add('pin--active');
      pin.setAttribute('aria-pressed', true);
    };

    // Проверяем наличие активного pin и убираем его если есть
    var deactivatePins = function () {
      var pins = document.querySelectorAll('.pin');
      for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];
        pin.classList.remove('pin--active');
        pin.setAttribute('aria-pressed', false);
      }
    };

    var openDialogHandler = function (event) {
      deactivatePins();

      pinClicked = event.target.closest('.pin');

      if (pinClicked) {
        highlightPin(pinClicked);
      }
    };

    // Закрываем окно, очищаем активные pins и возвращаем focus
    var closeDialogHandler = function (pin, openFromKeyboard) {
      deactivatePins();
      pinClicked.focus();
    };

    var createPin = (function () {
      var pinTemplate = document.querySelector('#pin-template');
      var pinToClone = pinTemplate.content.querySelector('.pin');
      var pinWidth = 56;
      var pinHeight = 75;

      return function (element, index) {
        var pinNew = pinToClone.cloneNode(true);
        var pinImg = pinNew.querySelector('img');

        // Для точного местоположение используем высоту/ширину pin
        pinNew.style.top = (element.location.y - pinHeight) + 'px';
        pinNew.style.left = (pinWidth / 2 + element.location.x) + 'px';

        // Внутри pin ранее нашли картинку, теперь задаем ей src и addEventListener
        pinImg.src = element.author.avatar;
        pinImg.alt = 'User Avatar';

        pinNew.addEventListener('click', function (event) {
          openDialogHandler(event);
          window.showCard(closeDialogHandler, element);
        });

        pinNew.addEventListener('keydown', function (event) {
          if (window.utils.isKeyEnter(event)) {
            openDialogHandler(event);
            window.showCard(closeDialogHandler, element);
          }
        });

        return pinNew;
      };
    })();

    // Восстанавливаем фокус
    // var restorePinFocus = function (pin) {
    //   pin.focus();
    // };

    // Убираем активный класс у pin, если диал. окно было открыто с клавиатуры, то при закрытии
    // возвращаем фокус на pin
    // var closeDialogHandler = function (pin, openFromKeyboard) {
    //   return function () {
    //     deactivatePins();
    //     if (openFromKeyboard) {
    //       restorePinFocus(pin);
    //     }
    //   };
    // };

    // Рендерим pins
    var renderPins = function (data) {
      data = data.slice(0, 3); // берем только первые три квартиры

      data.forEach(function (element, i) {
        var renderedPin = createPin(element, i);
        pinsMap.appendChild(renderedPin); // вставка пина в указанное место в DOM
      });
    };

    // Работаем с pins с помощью делегирования
    // цикл двигается вверх от target до .tokyo__pin-map
    // затем находим нужный нам элемент с помощью метода contains.
    // var pinsMapHandler = function (event, openFromKeyboard) {
    //   var target = event.target;
    //   while (target !== pinsMap) {
    //     if (target.classList.contains('pin')) {
    //       deactivatePins();
    //       window.showCard(closeDialogHandler(target, openFromKeyboard));
    //       highlightPin(target);
    //       return;
    //     }
    //     target = target.parentNode;
    //   }
    // };

    // Ловим событие на enter
    // var pinsMapKeyDownHandler = function (event) {
    //   if (window.utils.isKeyEnter(event)) {
    //     pinsMapHandler(event, true);
    //   }
    // };

    // Если pin изначально активный, то вешаем на него обработчик
    // if (highlightedPin) {
    //   window.showCard(closeDialogHandler(highlightedPin));
    // }

    // Создаем функцию callback, создаем новый объект с данными из первых трех элементов,
    // создаем новый fragment и добавляем в DOM каждый из этих элементов
    // var onLoad = function (data) {
    //   similarApartments = data;
    //   var fragment = document.createDocumentFragment();
    //   var slicedSimilarApartments = similarApartments.slice(0, 3);
    //
    //   slicedSimilarApartments.forEach(function (element, index) {
    //     fragment.appendChild(window.createPin(element, index));
    //   });
    //
    //   pinsMap.appendChild(fragment);
    // };
    //
    // window.load(URL, onLoad);

    // Грузим данные, отрисовываем pins
    window.load(URL, function (data) {
      renderPins(data);
    });

    // Добавляем обработчики для действий с pins
    // pinsMap.addEventListener('click', pinsMapHandler);
    // pinsMap.addEventListener('keydown', pinsMapKeyDownHandler);
  };
})();
