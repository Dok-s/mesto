import './index.css';

import {
  popUpName,
  popUpSubName,
  popUpTitle,
  popUpLink,
  profileButtonCreate,
  popUpPhotoAddButton,
  title,
  link,
  formAddProfile,
  formAddPhoto,
  settings,
  initialCards
} from '../utils/constants.js';

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

const profileValid = new FormValidator(settings, formAddProfile)
profileValid.enableValidation();

const cardValid = new FormValidator(settings, formAddPhoto)
cardValid.enableValidation();

const userProfile = new UserInfo({
  name: '.profile__name',
  about: '.profile__subname'
});

const profilePopup = new PopupWithForm('.popup_profile', formProfile);

const cardPopup = new PopupWithForm('.popup_create', formCard);

const imagePopup = new PopupWithImage('.popup_image');


//открытие поп-апа и появление добавленного текста в форме
profileButtonCreate.addEventListener('click', () => {
  profilePopup.open()
  popUpName.value = userProfile.getUserInfo().name
  popUpSubName.value = userProfile.getUserInfo().about
  profileValid.resetValidation()
});

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener('click', () => {
  cardPopup.open()
  popUpTitle.value = ''
  popUpLink.value = ''
  cardValid.resetValidation()
});

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    addPhoto(createCard(item.name, item.link));
  },
}, ".photo-cards");


function createCard(item, link ) {
  const card = new Card(item, link,'#photo-card-tepmlate', handleCardClick)
  return card.generateCard()
}

function addPhoto(cardElement){
  cards.addItem(cardElement);
}

cards.renderItems();


function formCard() {
  const cardElement = createCard(title.value, link.value);
  addPhoto(cardElement);
}

function formProfile(data) {
  userProfile.setUserInfo(data);
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

