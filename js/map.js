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

var ADS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ADS_TYPES = ['flat', 'house', 'bungalo'];

var CHECK_TIMES = ['12:00', '13:00', '14:00'];

var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var typeTranslationMap = {
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
};

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

document.querySelector('.map').classList.remove('map--faded');

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

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(getPinElement(ads[i]));
}

document.querySelector('.map__pins').appendChild(fragment);

var articleElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

articleElement.querySelector('h3').textContent = ads[0].offer.title;
articleElement.querySelector('small').textContent = ads[0].offer.address;
articleElement.querySelector('h3 + p + p').textContent = ads[0].offer.price + ' ₽/ночь';
articleElement.querySelector('h4').textContent = typeTranslationMap[ads[0].offer.type];
articleElement.querySelector('h4 + p').textContent = ads[0].offer.rooms + ' для ' + ads[0].offer.guests + ' гостей';
articleElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;

var oldFeatures = articleElement.querySelector('.popup__features');
var newFeatures = oldFeatures.cloneNode();
for (i = 0; i < ads[0].offer.features.length; i++) {
  var liElement = document.createElement('li');
  liElement.className = 'feature feature--' + ads[0].offer.features[i];
  newFeatures.appendChild(liElement);
}

articleElement.replaceChild(newFeatures, oldFeatures);
articleElement.querySelector('ul + p').textContent = ads[0].offer.description;
articleElement.querySelector('.popup__avatar').src = ads[0].author.avatar;

document.querySelector('.map').insertBefore(articleElement, document.querySelector('.map__filters-container'));

