const popUpName = document.querySelector(".popup__text_type_name");
const popUpSubName = document.querySelector(".popup__text_type_subname");
const profileButtonCreate = document.querySelector(".profile__button-create");
const popUpPhotoAddButton = document.querySelector(".profile__button");
const profileAvatar = document.querySelector(".profile__avatar");

const settings = {
  inputSelectors: ".popup__text",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
  buttonInactive: "popup__button_inactive",
  formSelector: ".popup__form",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const param = {
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "50465666-9d1e-410e-8dca-ad2040da320a",
    "Content-Type": "application/json",
  },
};

export {
  popUpName,
  popUpSubName,
  profileButtonCreate,
  popUpPhotoAddButton,
  settings,
  initialCards,
  param,
  profileAvatar,
};
