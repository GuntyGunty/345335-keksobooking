'use strict';

var getAvatar = function (i) {
  return 'img/avatars/user0' + i + '.png';
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFeatures = function () {
  return APARTMENT_FEATURES.slice(0, getRandomInteger(1, APARTMENT_FEATURES.length - 1));
};

var ESC_KEYCODE = 27;

var ADS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADS_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var mainPin = document.querySelector('.map__pin--main');
var inputSelectField = document.querySelector('#type');
var inputSelectType = document.querySelectorAll('#type option');
var inputPriceType = document.querySelector('#price');
var inputRoomType = document.querySelector('#room_number');
var inputRoomCount = document.querySelectorAll('#room_number option');
var inputGuestCount = document.querySelectorAll('#capacity option');
var inputTimeIn = document.querySelectorAll('#timein option');
var inputTimeOut = document.querySelectorAll('#timeout option');
var inputTimeField = document.querySelector('#timein');
var map = document.querySelector('.map');

inputSelectField.addEventListener('click', function () {
  setPriseValue();
});

var setPriseValue = function () {
  for (var j = 0; j < inputSelectType.length; j++) {
    if (inputSelectType[0].selected === true) {
      inputPriceType.placeholder = '0';
    } else if (inputSelectType[1].selected === true) {
      inputPriceType.placeholder = '1000';
    } else if (inputSelectType[2].selected === true) {
      inputPriceType.placeholder = '5000';
    } else if (inputSelectType[3].selected === true) {
      inputPriceType.placeholder = '10000';
    }
  }
};

inputTimeField.addEventListener('click', function () {
  setTime();
});

var setTime = function () {
  for (var j = 0; j < inputTimeIn.length; j++) {
    if (inputTimeIn[0].selected === true) {
      inputTimeOut[0].selected = true;
    } else if (inputTimeIn[1].selected === true) {
      inputTimeOut[1].selected = true;
    } else if (inputTimeIn[2].selected === true) {
      inputTimeOut[2].selected = true;
    }
  }
};

inputRoomType.addEventListener('click', function () {
  setGuestnumber();
});

var setGuestnumber = function () {
  for (var j = 0; j < inputRoomCount.length; j++) {
    if (inputRoomCount[0].selected === true) {
      inputGuestCount[2].selected = true;
    } else if (inputRoomCount[1].selected === true) {
      inputGuestCount[1].selected = true;
    } else if (inputRoomCount[2].selected === true) {
      inputGuestCount[0].selected = true;
    } else if (inputRoomCount[3].selected === true) {
      inputGuestCount[3].selected = true;
    }
  }
};

var typeTranslationMap = {
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
};

var setDisabledValueToAllFieldsets = function (status) {
  var formFields = document.querySelectorAll('fieldset');
  for (var j = 0; j < formFields.length; j++) {
    formFields[j].disabled = status;
  }
};

setDisabledValueToAllFieldsets(true);

mainPin.addEventListener('mouseup', function () {
  renderPins();
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');
  setDisabledValueToAllFieldsets(false);
});

var getAds = function (advertsCount) {

  var adverts = [];

  for (var i = 0; i < advertsCount; i++) {
    var coordinate = {
      x: getRandomInteger(300, 900),
      y: getRandomInteger(100, 500)
    };

    adverts.push({
      author: {
        avatar: getAvatar(i + 1),
      },
      offer: {
        title: ADS_TITLES[getRandomInteger(0, 7)],
        address: coordinate.x + ', ' + coordinate.y,
        price: getRandomInteger(1000, 1000000),
        type: ADS_TYPES[getRandomInteger(0, 2)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 15),
        checkin: CHECK_TIMES[getRandomInteger(0, 2)],
        checkout: CHECK_TIMES[getRandomInteger(0, 2)],
        features: getRandomFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: coordinate.x,
        y: coordinate.y
      }
    });
  }
  return adverts;
};

var ads = getAds(8);

var getPinElement = function (ad) {

  var buttonElement = document.createElement('button');
  var imgElement = document.createElement('img');

  buttonElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
  buttonElement.classList.add('map__pin');

  imgElement.src = ad.author.avatar;
  imgElement.width = '40';
  imgElement.height = '40';
  imgElement.draggable = false;

  buttonElement.appendChild(imgElement);

  return buttonElement;
};

var disableActivePin = function () {
  var activePin = map.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var onEscKeyDown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopUp();
    disableActivePin();
  }
};

var removePopUp = function () {
  document.removeEventListener('keydown', onEscKeyDown);
  var oldPopup = map.querySelector('.popup');
  if (oldPopup) {
    map.removeChild(oldPopup);
  }
};

var onClickPin = function (i) {
  var result = function (evt) {
    var target = evt.currentTarget;
    disableActivePin();
    target.classList.add('map__pin--active');
    removePopUp();
    var popup = renderPopup(ads[i]);
    var cloosePopup = popup.querySelector('.popup__close');
    cloosePopup.addEventListener('click', function () {
      removePopUp();
      disableActivePin();
    });
    window.addEventListener('keydown', onEscKeyDown);
  };
  return result;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var pin = getPinElement(ads[i]);
    pin.addEventListener('click', onClickPin(i));
    fragment.appendChild(pin);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

var renderPopup = function (ad) {
  var articleElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  articleElement.querySelector('h3').textContent = ad.offer.title;
  articleElement.querySelector('small').textContent = ad.offer.address;
  articleElement.querySelector('h3 + p + p').textContent = ad.offer.price + ' ₽/ночь';
  articleElement.querySelector('h4').textContent = typeTranslationMap[ad.offer.type];
  articleElement.querySelector('h4 + p').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  articleElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var oldFeatures = articleElement.querySelector('.popup__features');
  var newFeatures = oldFeatures.cloneNode();
  for (var i = 0; i < ad.offer.features.length; i++) {
    var liElement = document.createElement('li');
    liElement.className = 'feature feature--' + ad.offer.features[i];
    newFeatures.appendChild(liElement);
  }

  articleElement.replaceChild(newFeatures, oldFeatures);
  articleElement.querySelector('ul + p').textContent = ad.offer.description;
  articleElement.querySelector('.popup__avatar').src = ad.author.avatar;

  document.querySelector('.map').insertBefore(articleElement, document.querySelector('.map__filters-container'));

  return articleElement;
};
