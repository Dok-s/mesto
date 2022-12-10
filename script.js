let popupOpen = document.querySelector('.popup-open');
let profileButton = document.querySelector('.profile__button-create');
let popUp = document.querySelector(".popup");
let popUpBtnClose = document.querySelector(".popup__button-close");
let popUpBtn = document.querySelector(".popup__button");
let profileName = document.querySelector(".profile__name");
let profileSubName = document.querySelector(".profile__subname");
let profileInfo = document.querySelector(".profile__info");
const popupForm = document.forms.addProfile;
const nameTitle = popupForm.elements.name;
const subname = popupForm.elements.about;


profileButton.addEventListener('click', openModal);
popUpBtnClose.addEventListener('click', closeModal);

function openModal() {
  popUp.classList.remove("popup-open");
  nameTitle.value = profileName.textContent;
  subname.value = profileSubName.textContent;
}

function closeModal() {
  popUp.classList.add("popup-open");
}

function addInfo (event) {
  event.preventDefault();
  profileName.textContent = nameTitle.value;
  profileSubName.textContent = subname.value;
  closeModal()
}

// function add (event) {
//   event.preventDefault();
//   profileName.textContent = event.target.name.value;
//   profileSubName.textContent = event.target.about.value;
//   console.log(event.target.name.value);
//   closeModal()
// } МОЖНО ЛИ ТАКУЮ ФУНКЦИЮ ИСПОЛЬЗОВАТЬ ВМЕСТО addInfo ?

popupForm.addEventListener('submit', addInfo);
