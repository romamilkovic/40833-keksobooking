'use strict';

window.showCard = (function () {
  var sectionTokyo = document.querySelector('.tokyo');
  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogToClone = dialogTemplate.content.querySelector('.dialog');
  var newDialogElement = dialogToClone.cloneNode(true);
  var featuresContainer = newDialogElement.querySelector('.lodge__features');
  var dialogClose = newDialogElement.querySelector('.dialog__close');
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
    var photosContainer = newDialogElement.querySelector('.lodge__photos');
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
    newDialogElement.querySelector('.dialog__title img').src = data.author.avatar;
    newDialogElement.querySelector('.lodge__title').textContent = data.offer.title;
    newDialogElement.querySelector('.lodge__address').textContent = data.offer.address;
    newDialogElement.querySelector('.lodge__price').textContent = data.offer.price + '₽/ночь';
    newDialogElement.querySelector('.lodge__type').textContent = data.offer.type[data.offer.type];
    newDialogElement.querySelector('.lodge__rooms-and-guests').textContent = data.offer.rooms + ' комнат для ' + data.offer.rooms + ' гостей';
    newDialogElement.querySelector('.lodge__checkin-time').textContent = 'Заед после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    newDialogElement.querySelector('.lodge__description').textContent = data.offer.description;
    renderPhotos(data.offer.photos);
    renderFeatures(data.offer.features);

    sectionTokyo.appendChild(newDialogElement);
  };

  var closeDialog = function (event) {
    newDialogElement.style.display = 'none';
    newDialogElement.setAttribute('aria-hidden', true);

    if (window.utils.isFunction(dialogCloseHandler)) {
      dialogCloseHandler();
    }
  };

  var dialogCloseOnEscEventListener = function (event) {
    if (window.utils.isKeyEsc(event)) {
      closeDialog();
      removeEventListeners();
    }
  };

  var dialogCloseOnClickEventListener = function () {
    closeDialog();
    removeEventListeners();
  };

  var dialogCloseOnEnterEventListener = function () {
    if (window.utils.isKeyEnter(event)) {
      closeDialog();
      removeEventListeners();
    }
  };

  function addEventListeners() {
    dialogClose.addEventListener('click', dialogCloseOnClickEventListener);
    dialogClose.addEventListener('keydown', dialogCloseOnEnterEventListener);
    document.addEventListener('keydown', dialogCloseOnEscEventListener);
  }

  function removeEventListeners() {
    dialogClose.removeEventListener('click', dialogCloseOnClickEventListener);
    dialogClose.removeEventListener('keydown', dialogCloseOnEnterEventListener);
    document.removeEventListener('keydown', dialogCloseOnEscEventListener);
  }

  return function (callback, data) {
    newDialogElement.style.display = 'block';
    newDialogElement.setAttribute('aria-hidden', false);

    dialogCloseHandler = callback;

    renderDialog(data);

    addEventListeners();
  };
})();
