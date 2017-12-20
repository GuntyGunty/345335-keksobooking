'use strict';

window.backend = (function () {
  var TIMEOUT = 10000;
  window.SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var Status = {
    OK: 200,
    REQUEST_ERROR: 400,
    SERVER_ERROR: 500
  };

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      var message = '';
      switch (xhr.status) {
        case Status.REQUEST_ERROR: message = 'неверный запрос'; break;
        case Status.SERVER_ERROR: message = 'ошибка сервера'; break;

        default: message = 'неизвестная ошибка: ' + xhr.status + ' ' + xhr.statusText;
      }
      onError(message);
    });
    xhr.addEventListener('timeout', function () {

      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  return {
    load: function (onLoad, onError) {
      var xhr = getData(onLoad, onError);

      xhr.open('GET', window.SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {

      var xhr = getData(onLoad, onError);

      xhr.open('POST', window.SERVER_URL);
      xhr.send(data);
    }
  };

})();
