'use strict';

(function () {

  var MAX = 5;

  var filterContainer = document.querySelector('.map__filters');

  var filterSetting = {
    maxCount: MAX,
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var getCostDegree = function (price) {
    if (price < 10000) {
      return 'low';
    }
    if (price >= 10000 && price <= 50000) {
      return 'middle';
    }

    return 'high';
  };

  var filterAds = function (ads) {
    var filteredAds = [];

    for (var i = 0; i < ads.length; i++) {
      if (filteredAds.length >= MAX) {
        break;
      }

      if (filterSetting.type !== 'any' && ads[i].offer.type !== filterSetting.type) {
        continue;
      }
      if (filterSetting.price !== 'any' && getCostDegree(ads[i].offer.price) !== filterSetting.price) {
        continue;
      }
      if (filterSetting.rooms !== 'any' && ads[i].offer.rooms !== +filterSetting.rooms) {
        continue;
      }
      if (filterSetting.guests !== 'any' && ads[i].offer.guests !== +filterSetting.guests) {
        continue;
      }
      if (filterSetting.features.length) {
        var isIncludes = filterSetting.features.every(function (f) {
          return ads[i].offer.features.indexOf(f) > -1;
        });
        if (!isIncludes) {
          continue;
        }
      }

      filteredAds.push(ads[i]);
    }

    return filteredAds;
  };

  filterContainer.addEventListener('change', function (evt) {
    var target = evt.target;

    if (target.type === 'checkbox') {
      var index = filterSetting.features.indexOf(target.value);
      if (index > -1) {
        filterSetting.features.splice(index, 1);
      } else {
        filterSetting.features.push(target.value);
      }
    } else {
      switch (target.id) {
        case 'housing-type': filterSetting.type = target.value; break;
        case 'housing-price': filterSetting.price = target.value; break;
        case 'housing-rooms': filterSetting.rooms = target.value; break;
        case 'housing-guests': filterSetting.guests = target.value; break;
      }
    }

    window.utils.debounce(function () {
      window.render(window.ads);
    });
  });

  window.filterSetting = filterSetting;
  window.filterAds = filterAds;
})();

