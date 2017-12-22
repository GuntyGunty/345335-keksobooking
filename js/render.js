'use strict';

(function () {
  var mapPinElements = document.querySelector('.map__pins');

  var clearOldPins = function () {
    var pins = mapPinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinsArray = Array.from(pins);
    if (pinsArray.length) {
      pinsArray.forEach(function (pin) {
        mapPinElements.removeChild(pin);
      });
    }
  };

  window.render = function (elements) {
    clearOldPins();

    var fragment = document.createDocumentFragment();
    var filteredAds = window.filterAds(elements);

    for (var i = 0; i < filteredAds.length; i++) {
      var pinElement = window.pin.getPinElement(filteredAds[i]);

      fragment.appendChild(pinElement);
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };
})();
