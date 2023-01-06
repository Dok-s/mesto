let popUp = document.querySelector('.popup')
let popUpName = document.querySelector('.popup__text_type_name')
let popUpSubName = document.querySelector('.popup__text_type_subname')
let profileName = document.querySelector('.profile__name')
let profileSubName = document.querySelector('.profile__subname')
let profileButtonCreate = document.querySelector('.profile__button-create')
let popupButtonClose = document.querySelector('.popup__button-close')
let popUpForm = document.querySelector('.popup_profile .popup__form')
let popUpButton = document.querySelector('.popup__button')
let popUpPhotoAddButton = document.querySelector('.profile__button')
let popUpCreate = document.querySelector('.popup_create')
let popUpClose = document.querySelector('.popup_create .popup__button-close')
let popUpCreateForm = document.querySelector('.popup_create .popup__form')
let photoCards = document.querySelector('.photo-cards')
let photoLike = document.querySelector('.photo-card__like')
let photoCardImage = document.querySelector('.photo-card__image')
let photoLikes = document.querySelectorAll('.photo-card__like')
let popUpSubImage = document.querySelectorAll('.popup__subimage')
let photoCardCapton = document.querySelector('.photo-card__title')
let popImage = document.querySelector('.popup__image')
let popCaption = document.querySelector('.popup__subimage')
let popUpImage = document.querySelector(".popup_image");
let popUpBtnImageClose = document.querySelector(".popup_image .popup__button-close")

//открытие поп-апа
function modalOpen(popUp) {
  popUp.classList.add('popup_open')
}

//закрытие поп-апа
function modalClose(popUp) {
  popUp.classList.remove('popup_open')
}

//добавлене текста при создании профиля и закрытие поп-апа
function addText(evt) {
  evt.preventDefault();
  profileName.textContent = popUpName.value
  profileSubName.textContent = popUpSubName.value
  modalClose(popUp)
}

//открытие поп-апа и появление добавленного текста в форме
profileButtonCreate.addEventListener('click', function() {
  modalOpen(popUp)
  popUpName.value = profileName.textContent
  popUpSubName.value = profileSubName.textContent
});

//слушатель с закрытием поп-апа при нажатии
popupButtonClose.addEventListener('click', function() {
  modalClose(popUp)
});

//слушатель с открытием функции addText при нажатии
popUpForm.addEventListener('submit', addText);

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener('click', function() {
  modalOpen(popUpCreate)
});

//слушатель с закрытием поп-апа для добавления фото
popUpClose.addEventListener('click', function() {
  modalClose(popUpCreate)
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

//перебор каждой карточки и открытие функции addPhoto
initialCards.forEach(item => {
  addPhoto(item.name, item.link)
})

//создание карточки из template
function addPhoto(titleValue, linkValue) {
  const photoCardTemplate = document.querySelector('#photo-card-tepmlate').content;
  const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);

  let photo = photoCardElement.querySelector('.photo-card__image')
  photo.src = linkValue;
  photoCardElement.querySelector('.photo-card__title').textContent = titleValue;
  photo.alt = titleValue;
  //слушатель с удалением карточки при нажатии на корзину
  photoCardElement.querySelector('.photo-card__bin').addEventListener('click', function(evt) {
    evt.target.parentElement.remove()
  })
  //добавление/удаление сердечка
  photoCardElement.querySelector('.photo-card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo-card__like_type_on')
  })
  //открытие модального онка с картинкой и передача ссылки на нее и названия
  photo.addEventListener('click', function() {
    modalOpen(popUpImage);
    popImage.src = linkValue
    popCaption.textContent = titleValue
  })
  //добавление карточки на страницу первым элементом
  photoCards.prepend(photoCardElement);

  //закрытие поп-апа
  modalClose(popUpCreate)
}

//создаие нового места, добавление ссылки на картинку, добавление подписи для картинки
function popForm(evt) {
  evt.preventDefault()
  const title = document.querySelector('.popup__text_type_title');
  const link = document.querySelector('.popup__text_type_link');

  addPhoto(title.value, link.value);

  document.querySelector('.popup__subimage').textContent = title.value

  title.value = "";
  link.value = "";
  modalClose()
}
//слушатель создания карточки с новым местом
popUpCreateForm.addEventListener('submit', popForm);

//удаление карточки по нажатию на 'корзину'
const removeBin = (event) => {
  event.target.parentElement.remove()
}

let photoCardBin = document.querySelector('.photo-card__bin')
let photoCardsBin = document.querySelectorAll('.photo-card__bin');
let photoCard = document.querySelector(('.photo-card'));

//перебор карточек с корзинами и слушатель с кликом
photoCardsBin.forEach(photoCardBin => {
  photoCardBin.addEventListener('click', removeBin)
})

//закрытие поп-апа с картинкой
popUpBtnImageClose.addEventListener('click', function() {
  modalClose(popUpImage)
});
