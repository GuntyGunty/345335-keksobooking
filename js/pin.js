'use strict';

(function () {
  window.getPinElement = function (ad) {

    var buttonElement = document.createElement('button');
    var imgElement = document.createElement('img');

    buttonElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
    buttonElement.classList.add('map__pin');

    imgElement.src = ad.author.avatar;
    imgElement.width = '40';
    imgElement.height = '40';
    imgElement.draggable = false;

    buttonElement.appendChild(imgElement);

    return buttonElement;
  };
})();

(function () {
  var ads = window.getAds(8);
  var map = document.querySelector('.map');

  var ESC_KEYCODE = 27;

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopUp();
      disableActivePin();
    }
  };

  var removePopUp = function () {
    document.removeEventListener('keydown', onEscKeyDown);
    var oldPopup = map.querySelector('.popup');
    if (oldPopup) {
      map.removeChild(oldPopup);
    }
  };

  window.onClickPin = function (i) {
    var result = function (evt) {
      var target = evt.currentTarget;
      disableActivePin();
      target.classList.add('map__pin--active');
      removePopUp();
      var popup = window.renderPopup(ads[i]);
      var cloosePopup = popup.querySelector('.popup__close');
      cloosePopup.addEventListener('click', function () {
        removePopUp();
        disableActivePin();
      });
      window.addEventListener('keydown', onEscKeyDown);
    };
    return result;
  };

  var disableActivePin = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
})();
