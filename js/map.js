'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var feature = window.getFeatures(8);

  var map = document.querySelector('.map');
  var featuresForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < feature.length; i++) {
      var pinElement = window.getPinElement(feature[i]);

      pinElement.addEventListener('click', window.showCard(i));

      fragment.appendChild(pinElement);

    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');

    renderPins();

    featuresForm.classList.remove('notice__form--disabled');
    window.utils.setDisabledValueToAllFieldsets(false);
  });

  window.onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removePopup();
      window.disableActivePin();

      document.addEventListener('keydown', window.onEscKeyDown);
    }
  };

  window.utils.setDisabledValueToAllFieldsets(true);
})();
