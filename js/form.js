'use strict';

(function () {
  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var roomSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var timeinSelectElement = document.querySelector('#timein');
  var timeoutSelectElement = document.querySelector('#timeout');

  timeinSelectElement.addEventListener('change', function (evt) {
    timeoutSelectElement.value = evt.target.value;
  });

  timeoutSelectElement.addEventListener('change', function (evt) {
    timeinSelectElement.value = evt.target.value;
  });

  var getPriceByApartmentType = function (type) {
    switch (type) {
      case 'bungalo': return 0;
      case 'flat': return 1000;
      case 'house': return 5000;
      case 'palace': return 10000;
    }

    return 0;
  };

  typeSelectElement.addEventListener('change', function (evt) {
    priceInputElement.min = getPriceByApartmentType(evt.target.value);
    priceInputElement.value = getPriceByApartmentType(evt.target.value);
  });

  var getCapacityByRoomNummber = function (count) {
    switch (count) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 100: return 0;
    }

    return 0;
  };

  roomSelectElement.addEventListener('change', function (evt) {
    capacitySelectElement.value = getCapacityByRoomNummber(evt.target.value);
  });
})();
