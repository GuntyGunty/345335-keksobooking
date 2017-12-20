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
    var filteredAds = ads.filter(function (ad) {
      if (filterSetting.type !== 'any' && ad.offer.type !== filterSetting.type) {
        return false;
      }
      if (filterSetting.price !== 'any' && getCostDegree(ad.offer.price) !== filterSetting.price) {
        return false;
      }
      if (filterSetting.rooms !== 'any' && ad.offer.rooms !== +filterSetting.rooms) {
        return false;
      }
      if (filterSetting.guests !== 'any' && ad.offer.guests !== +filterSetting.guests) {
        return false;
      }
      if (filterSetting.features.length) {
        var isIncludes = filterSetting.features.every(function (f) {
          return ad.offer.features.indexOf(f) > -1;
        });
        if (!isIncludes) {
          return false;
        }
      }

      return true;
    });

    return filteredAds.slice(0, MAX);
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

