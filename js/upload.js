
'use strict';

(function () {
  window.successHandler = function (elements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      var pinElement = window.getPinElement(elements[i]);

      pinElement.addEventListener('click', window.showCard(elements[i]));

      fragment.appendChild(pinElement);

    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = document.querySelector('.notice__form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.errorHandler);
  });

  window.SERVER_URL = 'https://1510.dump.academy/keksobooking';
})();