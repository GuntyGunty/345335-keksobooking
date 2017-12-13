'use strict';

(function () {
  window.showCard = function (elem) {

    return function (evt) {
      var target = evt.currentTarget;
      window.disableActivePin();

      target.classList.add('map__pin--active');

      window.removePopup();

      var popup = window.renderPopup(elem);
      var cloosePopup = popup.querySelector('.popup__close');
      cloosePopup.addEventListener('click', function () {
        window.removePopup();
        window.disableActivePin();
      });

      document.addEventListener('keydown', window.onEscKeyDown);
    };
  };
})();
