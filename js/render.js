'use strict';

(function () {
  var mapPinElements = document.querySelector('.map__pins');

  var clearOldPins = function () {
    var pinElements = mapPinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pins = Array.from(pinElements);
    if (pins.length) {
      pins.forEach(function (pin) {
        mapPinElements.removeChild(pin);
      });
    }
  };

  window.render = function (elements) {
    clearOldPins();

    var fragment = document.createDocumentFragment();
    var filterAds = window.filter.filterAds(elements);

    filterAds.forEach(function (item) {
      var pinElement = window.pin.getPinElement(item);

      fragment.appendChild(pinElement);
    });

    mapPinElements.appendChild(fragment);
  };
})();
