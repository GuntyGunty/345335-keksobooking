'use strict';
var ads = window.getAds(8);


(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var renderPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var pin = window.getPinElement(ads[i]);
      pin.addEventListener('click', window.onClickPin(i));
      fragment.appendChild(pin);
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  mainPin.addEventListener('mouseup', function () {
    renderPins();
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    window.setDisabledValueToAllFieldsets(false);
  });
})();

(function () {
  window.setDisabledValueToAllFieldsets = function (status) {
    var formFields = document.querySelectorAll('fieldset');
    for (var j = 0; j < formFields.length; j++) {
      formFields[j].disabled = status;
    }
  };
})();

(function () {
  window.setDisabledValueToAllFieldsets(true);
})();
