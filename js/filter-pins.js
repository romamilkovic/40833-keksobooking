'use strict';

window.filterPins = (function () {
  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelector('#housing_features');
  var featureElements = housingFeatures.querySelectorAll('input');

  var filterPrice = function (data) {
    var filteredPrice;
    switch (housingPrice.value) {
      case 'hight':
        filteredPrice = data.filter(function (object) {
          return object.offer.price >= 50000;
        });
        break;
      case 'middle':
        filteredPrice = data.filter(function (object) {
          return object.offer.price >= 10000 && object.offer.price < 50000;
        });
        break;
      case 'low':
        filteredPrice = data.filter(function (object) {
          return object.offer.price < 10000;
        });
        break;
    }
    return filteredPrice;
  };

  return function (data) {
    var filteredPins = data.filter(function (object) {
      return object.offer.type === housingType.value || housingType.value === 'any';
    });

    filteredPins = filterPrice(filteredPins);

    filteredPins = filteredPins.filter(function (object) {
      return housingRoomNumber.value === 'any' || object.offer.rooms.toString() === housingRoomNumber.value;
    });

    filteredPins = filteredPins.filter(function (object) {
      return housingGuestsNumber.value === 'any' || object.offer.guests.toString() === housingGuestsNumber.value;
    });

    Array.prototype.forEach.call(featureElements, function (currentFeature) {
      if (currentFeature.checked) {
        var featureName = currentFeature.value;
        filteredPins = filteredPins.filter(function (object) {
          return object.offer.features.indexOf(featureName) >= 0;
        });
      }
    });

    return filteredPins;
  };
})();
