'use strict';

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      var xhr = window.upload(onLoad, onError);

      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {

      var xhr = window.upload(onLoad, onError);

      xhr.open('POST', window.SERVER_URL);
      xhr.send(data);
    }
  };

})();
