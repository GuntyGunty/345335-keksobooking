'use strict';

window.utils = (function () {
  var DEBOUNCE_TIME = 500;
  var lastTimeout;

  return {
    setDisabledValueToAllFieldsets: function (status) {
      var allFieldSets = document.querySelectorAll('fieldset');

      for (var i = 0; i < allFieldSets.length; i++) {
        allFieldSets[i].disabled = status;
      }
    },
    translate: function (word) {
      switch (word) {
        case 'flat': return 'квартира';
        case 'house': return 'дом';
        case 'bungalo': return 'бунгало';
      }
      return 'нет такого типа';
    },
    debounce: function (fn) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fn, DEBOUNCE_TIME);
    }
  };
})();
