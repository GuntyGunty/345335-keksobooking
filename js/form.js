'use strict';

(function () {
  var inputSelectType = document.querySelector('#type');
  var inputPriceType = document.querySelector('#price');
  var inputRoomType = document.querySelector('#room_number');
  var inputGuestCount = document.querySelector('#capacity');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  inputTimeIn.addEventListener('change', function (evt) {
    inputTimeOut.value = evt.target.value;
  });

  inputTimeOut.addEventListener('change', function (evt) {
    inputTimeIn.value = evt.target.value;
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

  inputSelectType.addEventListener('change', function (evt) {
    inputPriceType.min = getPriceByApartmentType(evt.target.value);
    inputPriceType.value = getPriceByApartmentType(evt.target.value);
  });

  var getGuestCount = function (type) {
    switch (type) {
      case 1: return 3;
      case 2: return 2;
      case 3: return 1;
      case 100: return 0;
    }
    return 0;
  };

  inputRoomType.addEventListener('change', function (evt) {
    inputGuestCount.value = getGuestCount(evt.target.value);
  });

})();
