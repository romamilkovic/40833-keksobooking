'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMap = document.querySelector('.tokyo__pin-map');
    var pinsFilters = document.querySelector('.tokyo__filters');
    var pinClicked;
    var URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
    var dataFromServer = [];
    var filteredPins;

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

      pinClicked = event.currentTarget;

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

    // Создаем pin
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

    // Функция которая кладит отфильтрованные pins, удаляет те что были на странице
    // и рендерит новые
    var filtersFormHandler = function () {
      filteredPins = window.filterPins(dataFromServer);
      removeRenderedPins();
      renderPins(filteredPins);
    };

    var removeRenderedPins = function () {
      var pins = pinsMap.querySelectorAll('.pin');
      for (var i = 1; i < pins.length; i++) {
        pinsMap.removeChild(pins[i]);
      }
    };

    pinsFilters.addEventListener('change', filtersFormHandler);

    // Рендерим pins
    var renderPins = function (data) {
      data.forEach(function (element, i) {
        var renderedPin = createPin(element, i);
        pinsMap.appendChild(renderedPin);
      });
    };

    // Грузим данные, отрисовываем pins
    var onLoad = function (data) {
      dataFromServer = data;
      var threeRandomPins = window.utils.getRandomElements(dataFromServer, 3);

      renderPins(threeRandomPins);
    };

    window.load(URL, onLoad);
  };
})();
