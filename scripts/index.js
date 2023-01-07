const popUpProfile = document.querySelector('.popup_profile')
const popUpName = document.querySelector('.popup__text_type_name')
const popUpSubName = document.querySelector('.popup__text_type_subname')
const profileName = document.querySelector('.profile__name')
const profileSubName = document.querySelector('.profile__subname')
const profileButtonCreate = document.querySelector('.profile__button-create')
const popupButtonClose = document.querySelector('.popup__button-close')
const popUpForm = document.querySelector('.popup_profile .popup__form')
const popUpButton = document.querySelector('.popup__button')
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
const photoCardTemplate = document.querySelector('#photo-card-tepmlate').content;

//открытие поп-апа
function openModal(popUp) {
  popUp.classList.add('popup_open')
}

//закрытие поп-апа
function closeModal(popUp) {
  popUp.classList.remove('popup_open')
}

//добавлене текста при создании профиля и закрытие поп-апа
function addText(evt) {
  evt.preventDefault();
  profileName.textContent = popUpName.value
  profileSubName.textContent = popUpSubName.value
  closeModal(popUpProfile)
}

//открытие поп-апа и появление добавленного текста в форме
profileButtonCreate.addEventListener('click', function() {
  openModal(popUpProfile)
  popUpName.value = profileName.textContent
  popUpSubName.value = profileSubName.textContent
});

//слушатель с закрытием поп-апа при нажатии
popupButtonClose.addEventListener('click', function() {
  closeModal(popUpProfile)
});

//слушатель с открытием функции addText при нажатии
popUpForm.addEventListener('submit', addText);

//слушать с открытием поп-апа для добавления фото
popUpPhotoAddButton.addEventListener('click', function() {
  openModal(popUpCreate)
});

//слушатель с закрытием поп-апа для добавления фото
popUpClose.addEventListener('click', function() {
  closeModal(popUpCreate)
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

function createCard(titleValue,linkValue) {
  const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  const photo = photoCardElement.querySelector('.photo-card__image')
  photo.src = linkValue;
  photoCardElement.querySelector('.photo-card__title').textContent = titleValue;
  photo.alt = titleValue;
  //слушатель с удалением карточки при нажатии на корзину
  photoCardElement.querySelector('.photo-card__bin').addEventListener('click', function(evt) {
    evt.target.closest(".photo-card").remove()
  })
  //добавление/удаление сердечка
  photoCardElement.querySelector('.photo-card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo-card__like_type_on')
  })
  //открытие модального онка с картинкой и передача ссылки на нее и названия
  photo.addEventListener('click', function() {
    openModal(popUpImage);
    popImage.src = linkValue
    popImage.alt = titleValue
    popCaption.textContent = titleValue
  })
  return photoCardElement
}

function addPhoto(item, link){
  photoCards.prepend(createCard(item, link))
}

//создаие нового места, добавление ссылки на картинку, добавление подписи для картинки
function createPhoto(evt) {
  evt.preventDefault()

  addPhoto(title.value, link.value);
  closeModal(popUpCreate)

  evt.target.reset();
}
//слушатель создания карточки с новым местом
popUpCreateForm.addEventListener('submit', createPhoto);

//закрытие поп-апа с картинкой
popUpBtnImageClose.addEventListener('click', function() {
  closeModal(popUpImage)
});
