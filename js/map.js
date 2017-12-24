'use strict';

(function () {
  var MIN_Y = 100;
  var MAX_Y = 500;

  var mapElement = document.querySelector('.map');
  var adsFormElement = document.querySelector('.notice__form');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    addressElement.value = 'x: ' + mapPinMainElement.offsetLeft + ' y: ' + mapPinMainElement.offsetTop;
    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: mapPinMainElement.offsetLeft + moveEvt.movementX,
        y: mapPinMainElement.offsetTop + moveEvt.movementY
      };

      if (shift.y < MIN_Y) {
        shift.y = MIN_Y;
      }
      if (shift.y > MAX_Y) {
        shift.y = MAX_Y;
      }

      addressElement.value = 'x: ' + shift.x + ', ' + 'y: ' + shift.y;

      mapPinMainElement.style.top = shift.y + 'px';
      mapPinMainElement.style.left = shift.x + 'px';
    };

    var isRendered = false;
    mapPinMainElement.addEventListener('mouseup', function () {
      if (!isRendered) {
        var onLoad = function (ads) {
          mapElement.classList.remove('map--faded');

          window.ads = ads;

          window.render(ads);
          adsFormElement.classList.remove('notice__form--disabled');
          window.utils.setDisabledValueToAllFieldsets(false);
        };

        window.backend.load(onLoad, window.showError);
      }
    });

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.utils.setDisabledValueToAllFieldsets(true);
})();
