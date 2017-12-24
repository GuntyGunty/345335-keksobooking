'use strict';

(function () {
  var ROOM_NUMBERS = ['1', '2', '3', '100'];
  var CAPACITIES = ['1', '2', '3', '0'];
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var PRICES = [0, 1000, 5000, 10000];
  var TIMES = ['12:00', '13:00', '14:00'];

  var form = document.querySelector('.notice__form');

  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');

  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');


  var timeinSelectElement = document.querySelector('#timein');
  var timeoutSelectElement = document.querySelector('#timeout');


  var syncValues = function (elements, value) {
    elements.value = value;

    if (elements.id === 'capacity') {
      switch (value) {
        case '1':
          elements[0].disabled = true;
          elements[1].disabled = true;
          elements[2].disabled = false;
          elements[3].disabled = true;
          break;
        case '2':
          elements[0].disabled = true;
          elements[1].disabled = false;
          elements[2].disabled = false;
          elements[3].disabled = true;
          break;
        case '3':
          elements[0].disabled = false;
          elements[1].disabled = false;
          elements[2].disabled = false;
          elements[3].disabled = true;
          break;
        case '0':
          elements[0].disabled = true;
          elements[1].disabled = true;
          elements[2].disabled = true;
          elements[3].disabled = false;
          break;
      }
    }
  };

  window.synchronizeFields(timeinSelectElement, timeoutSelectElement, TIMES, TIMES, syncValues);
  window.synchronizeFields(timeoutSelectElement, timeinSelectElement, TIMES, TIMES, syncValues);
  window.synchronizeFields(roomSelectElement, capacitySelectElement, ROOM_NUMBERS, CAPACITIES, syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(typeSelectElement, priceInputElement, TYPES, PRICES, syncValueWithMin);

  var onSuccessSend = function () {
    form.reset();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSend, window.showError);
  });
})();
