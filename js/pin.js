'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removePopup();
      window.pin.disableActive();

      document.removeEventListener('keydown', onEscKeyDown);
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

  window.pin = {
    getPinElement: function (ad) {
      var buttonElement = document.createElement('button');
      var imgElement = document.createElement('img');

      // ///////////не могу поймать ошибку Edge: Assignment to read-only properties is not allowed in strict mode, pin.js (35, 7)//////////////////

      buttonElement.style.left = ad.location.x + 'px';
      buttonElement.style.top = ad.location.y + 'px';
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
      var activePinElement = document.querySelector('.map__pin--active');

      if (activePinElement) {
        activePinElement.classList.remove('map__pin--active');
      }
    }
  };
})();
