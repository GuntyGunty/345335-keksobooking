'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var adsForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    document.querySelector('#address').value = 'x: ' + mapPinMain.offsetLeft + ' y: ' + mapPinMain.offsetTop;
    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var MIN_Y = 100;
      var MAX_Y = 500;

      var shift = {
        x: mapPinMain.offsetLeft + moveEvt.movementX,
        y: mapPinMain.offsetTop + moveEvt.movementY
      };

      if (shift.y < MIN_Y) {
        shift.y = MIN_Y;
      }
      if (shift.y > MAX_Y) {
        shift.y = MAX_Y;
      }

      document.querySelector('#address').value = 'x: ' + shift.x + ', ' + 'y: ' + shift.y;

      mapPinMain.style.top = shift.y + 'px';
      mapPinMain.style.left = shift.x + 'px';
    };

    var isRendered = false;
    mapPinMain.addEventListener('mouseup', function () {
      if (!isRendered) {
        var onLoad = function (ads) {
          map.classList.remove('map--faded');

          window.ads = ads;

          window.render(ads);
          adsForm.classList.remove('notice__form--disabled');
          window.utils.setDisabledValueToAllFieldsets(false);
        };

        window.backend.load(onLoad, window.errorHandler);
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
