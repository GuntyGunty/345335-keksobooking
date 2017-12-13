'use strict';

(function () {
  var synchronizeFields = function (elem1, elem2, value1, value2, callback) {
    elem1.addEventListener('change', function (evt) {
      var index = value1.indexOf(evt.target.value);
      callback(elem2, value2[index]);
    });
  };

  window.synchronizeFields = synchronizeFields;
})();
