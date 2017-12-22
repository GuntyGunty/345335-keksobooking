'use strict';

window.pin = (function () {
  var ESC_KEYCODE = 27;

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removePopup();
      window.pin.disableActive();

      document.removeEventListener('keydown', window.onEscKeyDown);
    }
  };

  var onClickPin = function (elem) {
    return function (evt) {
      var target = evt.currentTarget;
      window.pin.disableActive();

      target.classList.add('map__pin--active');

      window.removePopup();

      window.showCard(elem);

      document.addEventListener('keydown', onEscKeyDown);
    };
  };

  return {
    getPinElement: function (ad) {
      var buttonElement = document.createElement('button');
      var imgElement = document.createElement('img');

      buttonElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
      buttonElement.classList.add('map__pin');

      imgElement.src = ad.author.avatar;
      imgElement.width = '40';
      imgElement.height = '40';
      imgElement.draggable = false;

      buttonElement.appendChild(imgElement);

      buttonElement.addEventListener('click', onClickPin(ad));

      return buttonElement;
    },
    disableActive: function () {
      var activePin = document.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    }
  };
})();
