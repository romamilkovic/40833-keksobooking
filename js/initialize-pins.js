'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMap = document.querySelector('.tokyo__pin-map');
    var pinClicked;
    var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
    var dataFromServer = [];

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

    var openDialogHandler = function (event, element) {
      deactivatePins();
      var openFromKeyboard = typeof event.keyCode !== 'undefined';

      pinClicked = event.target.closest('.pin');

      if (pinClicked) {
        highlightPin(pinClicked);
      }

      window.showCard(closeDialogHandler(openFromKeyboard), element);
    };

    // Закрываем окно, очищаем активные pins и возвращаем focus
    var closeDialogHandler = function (openFromKeyboard) {
      return function () {
        deactivatePins();
        if (openFromKeyboard) {
          pinClicked.focus();
        }
      };
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
          openDialogHandler(event, element);
        });

        pinNew.addEventListener('keydown', function (event) {
          if (window.utils.isKeyEnter(event)) {
            openDialogHandler(event, element);
          }
        });

        return pinNew;
      };
    })();

    // Рендерим pins
    var renderPins = function (data) {
      data.forEach(function (element, i) {
        var renderedPin = createPin(element, i);
        pinsMap.appendChild(renderedPin); // вставка пина в указанное место в DOM
      });
    };

    // Грузим данные, отрисовываем pins
    var onLoad = function (data) {
      dataFromServer = data;
      var initialData = dataFromServer.slice(0, 3);

      renderPins(initialData);
    };

    window.load(URL, onLoad);
  };
})();
