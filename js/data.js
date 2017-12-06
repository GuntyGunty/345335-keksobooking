'use strict';

(function () {
  var ADS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ADS_TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getRandomFeatures = function (array) {
    return array.slice(0, window.utils.getRandomInteger(1, array.length - 1));
  };

  var getAvatar = function (i) {
    return 'img/avatars/user0' + i + '.png';
  };

  window.getAds = function (advertsCount) {

    var adverts = [];

    for (var i = 0; i < advertsCount; i++) {
      var coordinate = {
        x: window.utils.getRandomInteger(300, 900),
        y: window.utils.getRandomInteger(100, 500)
      };

      adverts.push({
        author: {
          avatar: getAvatar(i + 1),
        },
        offer: {
          title: ADS_TITLES[window.utils.getRandomInteger(0, 7)],
          address: coordinate.x + ', ' + coordinate.y,
          price: window.utils.getRandomInteger(1000, 1000000),
          type: ADS_TYPES[window.utils.getRandomInteger(0, 2)],
          rooms: window.utils.getRandomInteger(1, 5),
          guests: window.utils.getRandomInteger(1, 15),
          checkin: CHECK_TIMES[window.utils.getRandomInteger(0, 2)],
          checkout: CHECK_TIMES[window.utils.getRandomInteger(0, 2)],
          features: getRandomFeatures(APARTMENT_FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: coordinate.x,
          y: coordinate.y
        }
      });
    }
    return adverts;
  };
})();


