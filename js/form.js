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
  var timeinArray = ['12:00', '13:00', '14:00'];
  var timeoutArray = ['12:00', '13:00', '14:00'];


  window.synchronizeFields(timeinSelectElement, timeoutSelectElement, timeinArray, timeoutArray, 'value', setSynchronize);

  window.synchronizeFields(typeSelectElement, priceInputElement, typeArray, priceArray, 'value', setSynchronize);

  window.synchronizeFields(roomSelectElement, capacitySelectElement, RoomNumbersArray, CapacitiesArray, 'value', setSynchronize);

  function setSynchronize(formElement1, formElement2, formElementsArray1, formElementsArray2, type) {
    formElement2[type] = formElementsArray2[formElementsArray1.indexOf(formElement1.value)];
  }

})();
