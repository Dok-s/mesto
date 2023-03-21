export default class Card {
  constructor(res, templateSelector, handleCard) {
    this._titleValue = res.name;
    this._linkValue = res.link;
    this._likes = res.likes;
    this._res = res;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCard.click;
    this._handleCardLike = handleCard.like;
    this._handleCardDelete = handleCard.delete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".photo-card__image");
    this._cardImage.src = this._linkValue;
    this._element.querySelector(".photo-card__title").textContent =
      this._titleValue;
    this._cardImage.alt = this._titleValue;

    this._like = this._element.querySelector(".photo-card__like");
    this._likeCounter = this._element.querySelector(
      ".photo-card__like-counter"
    );
    this._likeCounter.textContent = this._likes.length;
    this._bin = this._element.querySelector(".photo-card__bin");

    if (!this._isOwner()) {
      this._bin.remove();
    }

    this.toogleLike();
    this._setEventListeners();

    return this._element;
  }

  _isOwner() {
    return this._res.user._id === this._res.owner._id;
  }

  isLike() {
    return this._res.likes.some((item) => {
      return item._id === this._res.user._id;
    });
  }

  toogleLike() {
    if (this.isLike()) {
      this._like.classList.add("photo-card__like_type_on");
    } else {
      this._like.classList.remove("photo-card__like_type_on");
    }
  }

  _handleLike() {
    this._handleCardLike(this._res, (updatedLike) => {
      this._res.likes = updatedLike;
      this.toogleLike();
      this._likeCounter.textContent = this._res.likes.length;
    });
  }

  _deleteCard() {
    this._element.closest(".photo-card").remove();
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () => {
      this._handleCardDelete(this._res, (evt) => {
        this._deleteCard();
      });
    });

    this._like.addEventListener("click", () => {
      this._handleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._titleValue, this._linkValue);
    });
  }
}
