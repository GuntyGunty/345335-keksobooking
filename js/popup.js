'use strict';

(function () {
  window.removePopup = function () {
    var map = document.querySelector('.map');
    var oldPopup = map.querySelector('.popup');

    if (oldPopup) {
      map.removeChild(oldPopup);
    }
  };
})();

