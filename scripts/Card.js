class Card {
  constructor(titleValue, linkValue, templateSelector, openPhoto) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._templateSelector = templateSelector;
    this._openPhoto = openPhoto;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.photo-card__image').src = this._linkValue;
    this._element.querySelector('.photo-card__title').textContent = this._titleValue;
    this._element.querySelector('.photo-card__image').alt = this._titleValue;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__bin').addEventListener('click', (evt) => {
      evt.target.closest(".photo-card").remove()
    });

    this._element.querySelector('.photo-card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-card__like_type_on')
    });

    this._element.querySelector('.photo-card__image').addEventListener('click', this._openPhoto);
  }
}

export { Card }
