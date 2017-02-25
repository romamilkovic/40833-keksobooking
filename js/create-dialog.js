'use strict';

window.createDialog = (function () {
  var dialotTemplate = document.querySelector('#dialog-template');
  var dialogToClone = dialotTemplate.content.querySelector('.dialog');

  return function (element, index) {
    var dialogNew = dialogToClone.cloneNode(true);

    var title = dialogNew.querySelector('.lodge__title');
    var address = dialogNew.querySelector('.lodge__address');
    var price = dialogNew.querySelector('.lodge__price');
    var type = dialogNew.querySelector('.lodge__type');
    var roomsAndGuests = dialogNew.querySelector('.lodge__rooms-and-guests');
    var checkInTime = dialogNew.querySelector('.lodge__checkin-time');
    var description = dialogNew.querySelector('.lodge__description');

    var features = dialogNew.querySelector('.lodge__features');
    var feature = document.createElement('span');
    var photos = dialogNew.querySelector('.lodge__photos');
    var photo = document.createElement('img');

    dialogNew.setAttribute('data-id', index);
    title.textContent = element.offer.title;
    address.textContent = element.offer.address;
    price.textContent = element.offer.price;
    type.textContent = element.offer.type;
    roomsAndGuests.textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    checkInTime.textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
    description.textContent = element.offer.description;

    for (var f = 0; f < element.offer.features.length; f++) {
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + element.offer.features[f]);
      features.appendChild(feature);
    }

    for (var p = 0; p < element.offer.photos.length; p++) {
      photo.setAttribute('src', element.offer.photos[p]);
      photo.setAttribute('alt', element.offer.type + ' photo');
      photo.setAttribute('width', '52');
      photo.setAttribute('height', '42');
      photos.appendChild(photo);
    }

    return dialogNew;
  };
})();
