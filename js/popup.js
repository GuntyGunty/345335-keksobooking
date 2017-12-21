'use strict';

(function () {
  window.removePopup = function () {
    var mapElement = document.querySelector('.map');
    var oldPopupElement = mapElement.querySelector('.popup');

    if (oldPopupElement) {
      mapElement.removeChild(oldPopupElement);
    }
  };
})();

