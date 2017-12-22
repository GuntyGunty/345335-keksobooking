'use strict';

(function () {
  var form = document.querySelector('.notice__form');

  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var typesArray = ['bungalo', 'flat', 'house', 'palace'];
  var pricesArray = [0, 1000, 5000, 10000];

  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var RoomNumbersArray = ['1', '2', '3', '100'];
  var CapacitiesArray = ['1', '2', '3', '0'];

  var timeinSelectElement = document.querySelector('#timein');
  var timeoutSelectElement = document.querySelector('#timeout');
  var timesArray = ['12:00', '13:00', '14:00'];

  var syncValues = function (element, value) {
    element.value = value;

    if (element.id === 'capacity') {
      switch (value) {
        case '1':
          element[0].disabled = true;
          element[1].disabled = true;
          element[2].disabled = false;
          element[3].disabled = true;
          break;
        case '2':
          element[0].disabled = true;
          element[1].disabled = false;
          element[2].disabled = false;
          element[3].disabled = true;
          break;
        case '3':
          element[0].disabled = false;
          element[1].disabled = false;
          element[2].disabled = false;
          element[3].disabled = true;
          break;
        case '0':
          element[0].disabled = true;
          element[1].disabled = true;
          element[2].disabled = true;
          element[3].disabled = false;
          break;
      }
    }
  };

  window.synchronizeFields(timeinSelectElement, timeoutSelectElement, timesArray, timesArray, syncValues);
  window.synchronizeFields(timeoutSelectElement, timeinSelectElement, timesArray, timesArray, syncValues);
  window.synchronizeFields(roomSelectElement, capacitySelectElement, RoomNumbersArray, CapacitiesArray, syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(typeSelectElement, priceInputElement, typesArray, pricesArray, syncValueWithMin);

  var onSuccessSend = function () {
    form.reset();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSend, window.showError);
  });
})();
