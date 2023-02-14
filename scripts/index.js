import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js"

const popUpProfile = document.querySelector('.popup_profile')
const popUpName = document.querySelector('.popup__text_type_name')
const popUpSubName = document.querySelector('.popup__text_type_subname')
const popUpTitle = document.querySelector('.popup__text_type_title')
const popUpLink = document.querySelector('.popup__text_type_link')
const profileName = document.querySelector('.profile__name')
const profileSubName = document.querySelector('.profile__subname')
const profileButtonCreate = document.querySelector('.profile__button-create')
const popupsButtonsCloses = document.querySelectorAll('.popup__button-close')
const popUpFormProfile = document.querySelector('.popup_profile .popup__form')
const popUpPhotoAddButton = document.querySelector('.profile__button')
const popUpCreate = document.querySelector('.popup_create')
const photoCards = document.querySelector('.photo-cards')
const popImage = document.querySelector('.popup__image')
const popCaption = document.querySelector('.popup__subimage')
const popUpImage = document.querySelector(".popup_image");
const title = document.querySelector('.popup__text_type_title');
const link = document.querySelector('.popup__text_type_link');
const formAddProfile = document.forms.addProfile
const formAddPhoto = document.forms.addPhoto
const popUps = document.querySelectorAll('.popup')
const settings = {
  inputSelectors: '.popup__text',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  buttonInactive: 'popup__button_inactive',
}

const profileValid = new FormValidator(settings, formAddProfile)
profileValid.enableValidation();

const cardValid = new FormValidator(settings, formAddPhoto)
cardValid.enableValidation();

//открытие поп-апа
function openModal(popUp) {
  popUp.classList.add('popup_open')
  document.addEventListener('keydown', closeByEscape);
}

//закрытие поп-апа
function closeModal(popUp) {
  popUp.classList.remove('popup_open')
  document.removeEventListener('keydown', closeByEscape);
}

//открытие поп-апа и появление добавленного текста в форме
profileButtonCreate.addEventListener('click', function() {
  openModal(popUpProfile)
  popUpName.value = profileName.textContent
  popUpSubName.value = profileSubName.textContent
  profileValid.resetValidation()
});

//добавлене текста при создании профиля и закрытие поп-апа
popUpFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popUpName.value
  profileSubName.textContent = popUpSubName.value
  closeModal(popUpProfile)
})

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener('click', function() {
  openModal(popUpCreate)
  popUpTitle.value = ''
  popUpLink.value = ''
  cardValid.resetValidation()
});

//массив из 6 карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => {
  addPhoto(item.name, item.link, '#photo-card-tepmlate')
})

function createCard(item, link, templateSelector) {
  const card = new Card(item, link, templateSelector, openPhoto)
  return card.generateCard()
}

function addPhoto(item, link, templateSelector){
  const card = createCard(item, link, templateSelector)
  photoCards.prepend(card)
}

//создаие нового места, добавление ссылки на картинку, добавление подписи для картинки
formAddPhoto.addEventListener('submit', function(evt) {
  evt.preventDefault()

  addPhoto(title.value, link.value, '#photo-card-tepmlate');
  closeModal(popUpCreate)

  evt.target.reset();
})

function openPhoto(evt) {
  popImage.src = evt.target.src;
  popImage.alt = evt.target.alt;
  popCaption.textContent = evt.target.alt;
  openModal(popUpImage);
}

// закрытие попапа по клавише Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open')
    closeModal(openedPopup)
  }
}

popUps.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            closeModal(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closeModal(popup)
        }
    })
})
