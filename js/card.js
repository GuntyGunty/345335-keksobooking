'use strict';

(function () {
  window.renderPopup = function (ad) {
    var articleElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
    articleElement.querySelector('h3').textContent = ad.offer.title;
    articleElement.querySelector('small').textContent = ad.offer.address;
    articleElement.querySelector('h3 + p + p').textContent = ad.offer.price + ' ₽/ночь';
    articleElement.querySelector('h4').textContent = window.utils.translate[ad.offer.type];
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
})();
