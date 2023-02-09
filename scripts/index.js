import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js"

const popUpProfile = document.querySelector('.popup_profile')
const popUpName = document.querySelector('.popup__text_type_name')
const popUpSubName = document.querySelector('.popup__text_type_subname')
const profileName = document.querySelector('.profile__name')
const profileSubName = document.querySelector('.profile__subname')
const profileButtonCreate = document.querySelector('.profile__button-create')
const popupButtonClose = document.querySelector('.popup__button-close')
const popupButtonsClose = document.querySelectorAll('.popup__button-close')
const popUpForm = document.querySelector('.popup_profile .popup__form')
const popUpButtons = document.querySelectorAll('.popup__button')
const popUpPhotoAddButton = document.querySelector('.profile__button')
const popUpCreate = document.querySelector('.popup_create')
const popUpClose = document.querySelector('.popup_create .popup__button-close')
const popUpCreateForm = document.querySelector('.popup_create .popup__form')
const photoCards = document.querySelector('.photo-cards')
const photoLike = document.querySelector('.photo-card__like')
const photoCardImage = document.querySelector('.photo-card__image')
const photoLikes = document.querySelectorAll('.photo-card__like')
const photoCardCapton = document.querySelector('.photo-card__title')
const popImage = document.querySelector('.popup__image')
const popCaption = document.querySelector('.popup__subimage')
const popUpImage = document.querySelector(".popup_image");
const popUpBtnImageClose = document.querySelector(".popup_image .popup__button-close")
const photoCardBin = document.querySelector('.photo-card__bin')
const photoCardsBin = document.querySelectorAll('.photo-card__bin');
const photoCard = document.querySelector(('.photo-card'));
const title = document.querySelector('.popup__text_type_title');
const link = document.querySelector('.popup__text_type_link');
const photoCardTemplate = document.querySelector('#photo-card-tepmlate')
const popupContainers = document.querySelectorAll('.popup__container')
const popUps = document.querySelectorAll('.popup')
const formAddProfile = document.forms.addProfile
const formAddProfileBtn = formAddProfile.querySelector('.popup__button')
const formName = formAddProfile.elements.name
const formAbout = formAddProfile.elements.about
const formProfileNameError = formAddProfile.querySelector('.popup__text_type_name-error')
const formProfileAboutError = formAddProfile.querySelector('.popup__text_type_subname-error')
const formAddPhoto = document.forms.addPhoto
const formAddPhotoBtn = formAddPhoto.querySelector('.popup__button')
const formTitle = formAddPhoto.elements.title
const formLink = formAddPhoto.elements.link
const formAddPhotoTitleError = formAddPhoto.querySelector('.popup__text_type_title-error')
const formAddPhotoLinkError = formAddPhoto.querySelector('.popup__text_type_link-error')
const popUpSpans = document.querySelectorAll('.popup__span')
const buttonInactive = document.querySelector('.popup__button_inactive')
const formSelectors = document.querySelectorAll('.popup__form')
const settings = {
  inputSelectors: '.popup__text',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  buttonInactive: 'popup__button_inactive',
}


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
  if (popUpName.validity.valid && popUpSubName.validity.valid) {
    formAddProfileBtn.removeAttribute('disabled');
    formAddProfileBtn.classList.remove('popup__button_inactive')
  }
  checkInputProfile()
});

function checkInputProfile() {
  if (formName.validity.valid && formAbout.validity.valid) {
    formName.classList.remove('popup__text_type_error')
    formAbout.classList.remove('popup__text_type_error')
    popUpSpans.forEach((item) => {
      item.classList.remove('popup__text-error_active')
      item.textContent = ""
    })
  }
}

//слушатель с закрытием поп-апа при нажатии
popupButtonsClose.forEach(button => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closeModal(popup))
})

//добавлене текста при создании профиля и закрытие поп-апа
popUpForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popUpName.value
  profileSubName.textContent = popUpSubName.value
  closeModal(popUpProfile)
})

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener('click', function() {
  openModal(popUpCreate)
  formAddPhotoBtn.setAttribute('disabled', true);
  formAddPhotoBtn.classList.add('popup__button_inactive');
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

function addPhoto(item, link, templateSelector){
  const card = new Card(item, link, templateSelector, openPhoto)
  photoCards.prepend(card.generateCard())
}

//создаие нового места, добавление ссылки на картинку, добавление подписи для картинки
formAddPhoto.addEventListener('submit', function(evt) {
  evt.preventDefault()

  addPhoto(title.value, link.value, '#photo-card-tepmlate', openPhoto);
  closeModal(popUpCreate)

  evt.target.reset();
})

function openPhoto(evt) {
  popImage.src = evt.target.src;
  popImage.alt = evt.target.alt;
  popCaption.textContent = evt.target.alt;
  openModal(popUpImage);
}

//закрытие попапа вне области
window.onclick = function(event) {
  popupContainers.forEach((Container) => {
    popUps.forEach((popup) => {
      if (event.target !== Container && event.target === popup) {
        closeModal(popup)
      }
    })
  })
}

// закрытие попапа по клавише Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open')
    closeModal(openedPopup)
  }
}

formSelectors.forEach(formSelector => {
  const editPopValid = new FormValidator(settings, formSelector)
  editPopValid.enableValidation()
})
