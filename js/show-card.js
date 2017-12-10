'use strict';

(function () {
  window.showCard = function (elem) {

    var feature = window.getFeatures(8);

    return function (evt) {
      var target = evt.currentTarget;
      window.disableActivePin();

      target.classList.add('map__pin--active');

      window.removePopup();

      var popup = window.renderPopup(feature[elem]);
      var cloosePopup = popup.querySelector('.popup__close');
      cloosePopup.addEventListener('click', function () {
        window.removePopup();
        window.disableActivePin();
      });

      document.addEventListener('keydown', window.onEscKeyDown);
    };
  };
})();
