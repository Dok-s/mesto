function checkValidBtn() {
  const formInputs = document.querySelectorAll('.popup__text')

}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation()

function setSubmitButtonState(isFormValid, btn) {
  if (isFormValid) {
    btn.removeAttribute('disabled');
    btn.classList.remove('popup__button_inactive');
  } else {
    btn.setAttribute('disabled', true);
    btn.classList.add('popup__button_inactive');
  }
}

function checkInputProfile() {
  if (formName.validity.valid && formAbout.validity.valid) {
    console.log('true')
    formName.classList.remove('popup__text_type_error')
    formAbout.classList.remove('popup__text_type_error')
    popUpSpan.forEach((item) => {
      item.classList.remove('popup__text-error_active')
      item.textContent = ""
    })
  }
}
