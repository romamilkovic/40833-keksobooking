'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');
  var featuresContainer = dialog.querySelector('.lodge__features');
  var dialogClose = document.querySelector('.dialog__close');
  var dialogCloseHandler;

  var renderFeatures = function (features) {
    featuresContainer.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var span = document.createElement('span');
      span.classList.add('feature__image');
      span.classList.add('feature__image--' + features[i]);
      featuresContainer.appendChild(span);
    }
  };

  var renderPhotos = function (photos) {
    var photosContainer = dialog.querySelector('.lodge__photos');
    photosContainer.innerHTML = '';
    var photoWidth = 52;
    var photoHeight = 42;
    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.src = photos[i];
      photo.alt = 'Lodge photo';
      photo.width = photoWidth;
      photo.height = photoHeight;
      photosContainer.appendChild(photo);
    }
  };

  var renderDialog = function (data) {
    dialog.querySelector('.dialog__title img').src = data.author.avatar;
    dialog.querySelector('.lodge__title').textContent = data.offer.title;
    dialog.querySelector('.lodge__address').textContent = data.offer.address;
    dialog.querySelector('.lodge__price').textContent = data.offer.price + '₽/ночь';
    dialog.querySelector('.lodge__type').textContent = data.offer.type[data.offer.type];
    dialog.querySelector('.lodge__rooms-and-guests').textContent = data.offer.rooms + ' комнат для ' + data.offer.rooms + ' гостей';
    dialog.querySelector('.lodge__checkin-time').textContent = 'Заед после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    dialog.querySelector('.lodge__description').textContent = data.offer.description;
    renderPhotos(data.offer.photos);
    renderFeatures(data.offer.features);
  };

  var closeDialog = function (event) {
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);

    if (window.utils.isFunction(dialogCloseHandler)) {
      dialogCloseHandler();
    }
  };

  var dialogCloseOnEscEventListener = function (event) {
    if (window.utils.isKeyEsc(event)) {
      closeDialog();
    }
  };

  var dialogCloseOnClickEventListener = function () {
    closeDialog();
  };

  var dialogCloseOnEnterEventListener = function () {
    if (window.utils.isKeyEnter(event)) {
      closeDialog();
    }
  };

  // Обработчик события закрытия окна по нажатию на ESC
  document.addEventListener('keydown', dialogCloseOnEscEventListener);

  // Обработчик события закрытия окна по клику на крестик
  dialogClose.addEventListener('click', dialogCloseOnClickEventListener);

  // Обработчик события закрытия окна по нажатию на ENTER по крестику
  dialogClose.addEventListener('keydown', dialogCloseOnEnterEventListener);

  return function (callback, data) {
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);

    dialogCloseHandler = callback;

    renderDialog(data);
  };
})();
