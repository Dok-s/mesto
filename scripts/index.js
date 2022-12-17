let popUp = document.querySelector('.popup')
let popUpName = document.querySelector('.popup__text_type_name')
let popUpSubName = document.querySelector('.popup__text_type_subname')
let profileName = document.querySelector('.profile__name')
let profileSubName = document.querySelector('.profile__subname')
let profileButtonCreate = document.querySelector('.profile__button-create')
let popupButtonClose = document.querySelector('.popup__button-close')
let popUpForm = document.querySelector('.popup__form')
let popUpButton = document.querySelector('.popup__button')


function modalOpen() {
  popUp.classList.add('popup_open')
  popUpName.value = profileName.textContent
  popUpSubName.value = profileSubName.textContent
}

function modalClose() {
  popUp.classList.remove('popup_open')
}

function addText(evt) {
  evt.preventDefault();
  profileName.textContent = popUpName.value
  profileSubName.textContent = popUpSubName.value
  modalClose()
}

profileButtonCreate.addEventListener('click', modalOpen)
popupButtonClose.addEventListener('click', modalClose)
popUpForm.addEventListener('submit', addText)
