'use strict';

(function () {
  window.synchronizeFields = function (formElement1, formElement2, formElementsArray1, formElementsArray2, type, callback) {
    formElement1.addEventListener('change', function () {
      callback(formElement1, formElement2, formElementsArray1, formElementsArray2, type);
    });
  };
})();
