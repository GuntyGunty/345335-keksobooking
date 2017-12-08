'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var feature = window.getFeatures(8);

  var map = document.querySelector('.map');
  var featuresForm = document.querySelector('.notice__form');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // mapPinMain.style.top=Math.max(Math.min(moveEvt.pageX-offsetX,mapPinMain.parentNode.clientWidth-mapPinMain.clientWidth),0)+'px'

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      document.querySelector('#address').value = 'x: ' + startCoords.x + ', ' + 'y: ' + startCoords.y;

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
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
      pinElement.addEventListener('click', onClickPin(i));

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

  var onClickPin = function (i) {
    return function (evt) {
      var target = evt.currentTarget;
      window.disableActivePin();

      target.classList.add('map__pin--active');

      window.removePopup();

      var popup = window.renderPopup(feature[i]);
      var cloosePopup = popup.querySelector('.popup__close');
      cloosePopup.addEventListener('click', function () {
        window.removePopup();
        window.disableActivePin();
      });

      document.addEventListener('keydown', window.onEscKeyDown);
    };
  };

  window.onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removePopup();
      window.disableActivePin();

      document.addEventListener('keydown', window.onEscKeyDown);
    }
  };

  window.utils.setDisabledValueToAllFieldsets(true);
})();
