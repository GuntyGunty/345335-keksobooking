'use strict';

(function () {
  var MAX = 5;
  var MIDDLE_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var DEFAULT_VALUE = 'any';


  var filterContainerElement = document.querySelector('.map__filters');

  var getCostDegree = function (price) {
    if (price < MIDDLE_PRICE) {
      return 'low';
    }
    if (price >= MIDDLE_PRICE && price <= HIGH_PRICE) {
      return 'middle';
    }

    return 'high';
  };

  filterContainerElement.addEventListener('change', function (evt) {
    var target = evt.target;

    if (target.type === 'checkbox') {
      var index = window.filter.filterSetting.features.indexOf(target.value);
      if (index > -1) {
        window.filter.filterSetting.features.splice(index, 1);
      } else {
        window.filter.filterSetting.features.push(target.value);
      }
    } else {
      switch (target.id) {
        case 'housing-type': window.filter.filterSetting.type = target.value; break;
        case 'housing-price': window.filter.filterSetting.price = target.value; break;
        case 'housing-rooms': window.filter.filterSetting.rooms = target.value; break;
        case 'housing-guests': window.filter.filterSetting.guests = target.value; break;
      }
    }

    window.utils.debounce(function () {
      window.render(window.ads);
    });
  });

  window.filter = {

    filterSetting: {
      maxCount: MAX,
      type: DEFAULT_VALUE,
      price: DEFAULT_VALUE,
      rooms: DEFAULT_VALUE,
      guests: DEFAULT_VALUE,
      features: []
    },

    filterAds: function (ads) {
      var filteredAds = [];

      // ////////////  если делать через filter это нарушит критерий Б24 - своевременный выход из цикла  //////////////

      for (var i = 0; i < ads.length; i++) {
        if (filteredAds.length >= MAX) {
          break;
        }

        if (window.filter.filterSetting.type !== DEFAULT_VALUE && ads[i].offer.type !== window.filter.filterSetting.type) {
          continue;
        }
        if (window.filter.filterSetting.price !== DEFAULT_VALUE && getCostDegree(ads[i].offer.price) !== window.filter.filterSetting.price) {
          continue;
        }
        if (window.filter.filterSetting.rooms !== DEFAULT_VALUE && ads[i].offer.rooms !== +window.filter.filterSetting.rooms) {
          continue;
        }
        if (window.filter.filterSetting.guests !== DEFAULT_VALUE && ads[i].offer.guests !== +window.filter.filterSetting.guests) {
          continue;
        }
        if (window.filter.filterSetting.features.length) {
          var isIncludes = window.filter.filterSetting.features.every(function (f) {
            return ads[i].offer.features.indexOf(f) > -1;
          });
          if (!isIncludes) {
            continue;
          }
        }

        filteredAds.push(ads[i]);
      }

      return filteredAds;
    }
  };
})();
