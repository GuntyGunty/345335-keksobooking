'use strict';

(function () {
  window.getPinElement = function (feature) {

    var buttonElement = document.createElement('button');
    var imgElement = document.createElement('img');

    buttonElement.style = 'left: ' + feature.location.x + 'px; top: ' + feature.location.y + 'px;';
    buttonElement.classList.add('map__pin');

    imgElement.src = feature.author.avatar;
    imgElement.width = '40';
    imgElement.height = '40';
    imgElement.draggable = false;

    buttonElement.appendChild(imgElement);

    return buttonElement;
  };

  window.disableActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
})();
