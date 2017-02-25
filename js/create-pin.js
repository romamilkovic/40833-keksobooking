'use strict';

window.createPin = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');
  var pinWidth = 56;
  var pinHeight = 75;

  return function (element, index) {
    var pinNew = pinToClone.cloneNode(true);
    var pinImg = pinNew.querySelector('img');

    // Для точного местоположение используем высоту/ширину pin
    pinNew.style.top = element.location.y - pinHeight + 'px';
    pinNew.style.left = pinWidth / 2 + element.location.x + 'px';

    // Для вызова конкретного диал. окна повесим уникальный id
    pinNew.setAttribute('data-id', index);

    // Внутри pin ранее нашли картинку, теперь задаем ей src и addEventListener
    pinImg.src = element.author.avatar;
    pinImg.alt = 'User Avatar';

    return pinNew;
  };
})();
