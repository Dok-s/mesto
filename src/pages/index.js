import "./index.css";

import {
  popUpName,
  popUpSubName,
  profileButtonCreate,
  popUpPhotoAddButton,
  settings,
  initialCards,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

const formValidators = {};

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

const userProfile = new UserInfo({
  name: ".profile__name",
  about: ".profile__subname",
});

const profilePopup = new PopupWithForm(
  ".popup_profile",
  handleProfileFormSubmit
);

const cardPopup = new PopupWithForm(".popup_create", handleCardFormSubmit);

const imagePopup = new PopupWithImage(".popup_image");

//открытие поп-апа и появление добавленного текста в форме
profileButtonCreate.addEventListener("click", () => {
  profilePopup.open();
  const { about, name } = userProfile.getUserInfo();
  popUpName.value = name;
  popUpSubName.value = about;
  formValidators["addProfile"].resetValidation();
});

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener("click", () => {
  cardPopup.open();
  formValidators["addPhoto"].resetValidation();
});

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addPhoto(createCard(item.name, item.link));
    },
  },
  ".photo-cards"
);

function createCard(item, link) {
  const card = new Card(item, link, "#photo-card-tepmlate", handleCardClick);
  return card.generateCard();
}

function addPhoto(cardElement) {
  cards.addItem(cardElement);
}

cards.renderItems();

function handleCardFormSubmit(data) {
  const cardElement = createCard(data.title, data.link);
  addPhoto(cardElement);
}

function handleProfileFormSubmit(data) {
  userProfile.setUserInfo(data);
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}
