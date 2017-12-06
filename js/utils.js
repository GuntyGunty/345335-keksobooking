'use strict';

window.utils = (function () {

  return {
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    translate: function (word) {
      switch (word) {
        case 'flat': return 'квартира';
        case 'house': return 'дом';
        case 'bungalo': return 'бунгало';
      }
      return 'нет такого типа';
    }
  };

})();
