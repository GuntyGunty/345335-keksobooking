'use strict';

(function () {
  window.showCard = function (ad) {
    var popupElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
    popupElement.querySelector('h3').textContent = ad.offer.title;
    popupElement.querySelector('small').textContent = ad.offer.address;
    popupElement.querySelector('h3 + p + p').textContent = ad.offer.price + ' ₽/ночь';
    popupElement.querySelector('h4').textContent = window.utils.translate[ad.offer.type];
    popupElement.querySelector('h4 + p').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
    popupElement.querySelector('h4 + p + p').ad = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    popupElement.querySelector('ul + p').textContent = ad.offer.description;
    popupElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var oldFeatureElements = popupElement.querySelector('.popup__features');
    var newFeatureElements = oldFeatureElements.cloneNode();
    for (var i = 0; i < ad.offer.features.length; i++) {
      var liElement = document.createElement('li');
      liElement.className = 'feature feature--' + ad.offer.features[i];

      newFeatureElements.appendChild(liElement);
    }
    popupElement.replaceChild(newFeatureElements, oldFeatureElements);

    var cloosePopup = popupElement.querySelector('.popup__close');
    cloosePopup.addEventListener('click', function () {
      window.removePopup();
      window.pin.disableActive();
    });

    document.querySelector('.map').appendChild(popupElement);
  };
})();

