'use strict';

(function () {
  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var typeArray = ['bungalo', 'flat', 'house', 'palace'];
  var priceArray = [0, 1000, 5000, 10000];


  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var RoomNumbersArray = ['1', '2', '3', '100'];
  var CapacitiesArray = ['1', '2', '3', '0'];

  var timeinSelectElement = document.querySelector('#timein');
  var timeoutSelectElement = document.querySelector('#timeout');
  var timesArray = ['12:00', '13:00', '14:00'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeinSelectElement, timeoutSelectElement, timesArray, timesArray, syncValues);
  window.synchronizeFields(timeinSelectElement, timeoutSelectElement, timesArray, timesArray, syncValues);
  window.synchronizeFields(roomSelectElement, capacitySelectElement, RoomNumbersArray, CapacitiesArray, syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  window.synchronizeFields(typeSelectElement, priceInputElement, typeArray, priceArray, syncValueWithMin);

})();
