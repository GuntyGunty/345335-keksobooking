var ADS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ADS_TYPES = ['flat', 'house', 'bungalo'];

var CHECK_TIMES = ['12:00', '13:00', '14:00'];

var APPARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var map = document.querySelector('.map');

var cardTemplate = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

var pins = ('.map__pins');

var advertsCount = 5;

map.classList.remove('map--faded');

var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
};

var getAvatar = function () {
for (i = 0; i < 8; i++) {
    return 'img/avatars/user' + '0' + i + '.png';
    }
};

var createAdvert = function () {
var adverts = [];

    for (var i = 0; i < advertsCount; i++) {
        adverts.push({
            author: {
                avatar: getAvatar(),
            },
            offer: {
                title: ADS_TITLES[i],
                address: {
                    location: {
                        x: getRandomInteger(300, 900),
                        y: getRandomInteger(100, 500)
                    },
                },
                price: getRandomInteger(1000, 1000000),
                type: ADS_TYPES[getRandomInteger(0, 2)],
                rooms: getRandomInteger(1, 5),
                guests: Math.random().toFixed(2),
                checkin: CHECK_TIMES[i],
                checkout: CHECK_TIMES[i],
                features: APPARTMENT_FEATURES,
                description: '',
                photos: []
            },
        })
    }
return adverts;
}

var render = function() {
    var pinElement = cardTemplate.cloneNode(true); 

        pinElement.getElementsByTagName('h3')[0].textContent = createAdvert()[i].offer.title;
        pinElement.getElementsByTagName('small')[0].textContent = createAdvert()[i].offer.address.location.x, createAdvert()[i].offer.address.location.y;
        pinElement.querySelector('.popup__price').textContent = createAdvert()[i].offer.price + '/ночь';
        pinElement.getElementsByTagName('h4')[0].textContent = createAdvert()[i].offer.type;
        pinElement.getElementsByTagName('h4 + p').textContent = createAdvert()[i].offer.rooms + createAdvert()[i].offer.rooguests;
        pinElement.getElementsByTagName('h4 + p + p').textContent = createAdvert()[i].offer.checkin + createAdvert()[i].offer.checkout;
        pinElement.querySelector('.popup__features').getElementsByTagName('li')[i].textContent = createAdvert()[i].offer.features;

    return pinElement
}

var createPins = function() {
    
    for (var i = 0; i < advertsCount; i++) {
        pins.appendChild(render(createAdvert()[i]));
    }
};

createPins();