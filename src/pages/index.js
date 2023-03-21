import "./index.css";

import {
  popUpName,
  popUpSubName,
  profileButtonCreate,
  popUpPhotoAddButton,
  settings,
  param,
  profileAvatar,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api";
import PopupWithFormQuestion from "../components/PopupWithFormQuestion";

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
  avatar: ".profile__avatar",
});

const profilePopup = new PopupWithForm(
  ".popup_profile",
  handleProfileFormSubmit
);

const cardPopup = new PopupWithForm(".popup_create", handleCardFormSubmit);

const imagePopup = new PopupWithImage(".popup_image");

const avatarPopup = new PopupWithForm(".popup_avatar", handleAvatarSubmit);

const deleteCardPopup = new PopupWithFormQuestion(".popup_question");

profileButtonCreate.addEventListener("click", () => {
  profilePopup.open();
  const { about, name } = userProfile.getUserInfo();
  popUpName.value = name;
  popUpSubName.value = about;
  formValidators["addProfile"].resetValidation();
});

popUpPhotoAddButton.addEventListener("click", () => {
  cardPopup.open();
  formValidators["addPhoto"].resetValidation();
});

profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
  formValidators["addAvatar"].resetValidation();
});

const api = new Api(param);

api.getUserInfo().then((data) => {
  userProfile.setUserInfo(data);
  userProfile.setUserAvatar(data);
});

const cards = new Section(
  {
    renderer: (item) => {
      addPhoto(createCard(item));
    },
  },
  ".photo-cards"
);

api.getInitialCards().then((items) => {
  cards.renderItems(items);
});

function createCard(res) {
  res.user = userProfile.getUserInfo();
  const card = new Card(res, "#photo-card-template", {
    click: handleCardClick,
    like: (currentData, callback) => {
      if (card.isLike()) {
        api
          .deleteLike(currentData._id)
          .then((updatedCard) => callback(updatedCard.likes))
          .catch((err) => console.log(err));
      } else {
        api
          .setLike(currentData._id)
          .then((updatedCard) => callback(updatedCard.likes))
          .catch((err) => console.log(err));
      }
    },
    delete: (currentData, callback) => {
      deleteCardPopup.open();
      deleteCardPopup.setQuestion(() => {
        console.log(currentData._id);
        api
          .deleteCard(currentData._id)
          .then(() => {
            deleteCardPopup.close();
            callback();
          })
          .catch((err) => console.log(err));
      });
    },
  });

  return card.generateCard();
}

function addPhoto(cardElement) {
  cards.addItem(cardElement);
}

function handleCardFormSubmit(data) {
  api
    .addCard({ name: data.title, link: data.link })
    .then((res) => {
      const cardElement = createCard(res);
      addPhoto(cardElement);
    })
    .catch((err) => console.log(err));
}

function handleProfileFormSubmit({ name, about }) {
  api
    .setUserInfo({ name: name, about: about })
    .then((data) => {
      userProfile.setUserInfo(data);
    })
    .catch((err) => console.log(err));
}

function handleAvatarSubmit({ avatar }) {
  api
    .setAvatar({ avatar: avatar })
    .then((data) => {
      userProfile.setUserAvatar(data);
    })
    .catch((err) => console.log(err));
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}
