var ADS_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ADS_TYPE = ['flat', 'house', 'bungalo'];

var CHECK_TIME = ['12:00', '13:00', '14:00'];

var map = document.querySelector('.map');

var appartmentFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// var getRandomInteger = function (min, max) {
//     var rand = min + Math.random() * (max + 1 - min);
//     rand = Math.floor(rand);
//     return rand;
// };

map.classList.remove('.map--faded');

var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

var getUserPhoto = function () {

};

var Adwerts = [
 {
     author: {
        avatar: 'img/avatars/user0' + getUserPhoto() + '.png'
     },
     offer: {
        title: ADS_TITLE[0],
        address: '',
        price: Math.random().toFixed(2),
        type: ADS_TYPE[0],
        rooms: getRandomInteger(1, 5),
        guests: Math.random().toFixed(2),
        checkin: CHECK_TIME[0],
        checkout: CHECK_TIME[0],
        features: appartmentFeatures,
        description: '',
        photos: []
     },
     location: {
        x: getRandomInteger(300, 900),
        y: getRandomInteger(100, 500)
    }
     
]