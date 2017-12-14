'use strict';

(function () {
  window.renderPopup = function (feature) {

    var popupElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
    popupElement.querySelector('h3').textContent = feature.offer.title;
    popupElement.querySelector('small').textContent = feature.offer.address;
    popupElement.querySelector('h3 + p + p').textContent = feature.offer.price + ' ₽/ночь';
    popupElement.querySelector('h4').textContent = window.utils.translate[feature.offer.type];
    popupElement.querySelector('h4 + p').textContent = feature.offer.rooms + ' для ' + feature.offer.guests + ' гостей';
    popupElement.querySelector('h4 + p + p').feature = 'Заезд после ' + feature.offer.checkin + ', выезд до ' + feature.offer.checkout;

    var oldFeatures = popupElement.querySelector('.popup__features');
    var newFeatures = oldFeatures.cloneNode();
    for (var i = 0; i < feature.offer.features.length; i++) {
      var liElement = document.createElement('li');
      liElement.className = 'feature feature--' + feature.offer.features[i];

      newFeatures.appendChild(liElement);
    }
    popupElement.replaceChild(newFeatures, oldFeatures);

    popupElement.querySelector('ul + p').textContent = feature.offer.description;
    popupElement.querySelector('.popup__avatar').src = feature.author.avatar;

    document.querySelector('.map').insertBefore(popupElement, document.querySelector('.map__filters-container'));

    return popupElement;
  };

  window.removePopup = function () {
    var map = document.querySelector('.map');
    var oldPopup = map.querySelector('.popup');

    if (oldPopup) {
      map.removeChild(oldPopup);
    }
  };

})();

