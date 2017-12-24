
'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
  var IMG_HEIGHT = 70;

  var containerElement = document.querySelector('.form__photo-container');
  var avatarChooserElement = document.querySelector('.notice__photo input[type="file"]');
  var photoChooserElement = containerElement.querySelector('input[type="file"]');
  var previewImageElement = document.querySelector('.notice__preview img');
  var pinAvatarElement = document.querySelector('.map__pin--main img');
  var imgContainerElement = containerElement.querySelector('.form__photo-container .upload');

  var uploadFile = function (input, callback) {
    var onFileLoad = function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          callback(reader);
        });

        reader.readAsDataURL(file);
      }
    };

    input.addEventListener('change', onFileLoad);
  };

  var addAvatarPhoto = function (reader) {
    previewImageElement.src = reader.result;
    pinAvatarElement.src = reader.result;
  };

  var addOfferPhoto = function (reader) {
    var pinImgElement = document.createElement('img');
    pinImgElement.height = IMG_HEIGHT;
    pinImgElement.src = reader.result;
    imgContainerElement.appendChild(pinImgElement);
  };

  uploadFile(avatarChooserElement, addAvatarPhoto);
  uploadFile(photoChooserElement, addOfferPhoto);
})();
