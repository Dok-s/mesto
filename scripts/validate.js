
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelectors));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      const inputs = formElement.querySelectorAll(settings.inputSelectors)
      const arrBool = []
      inputs.forEach(item => {
        arrBool.push(item.validity.valid)
      })
      const isValid = arrBool.includes(false) ? false : true
      const inputBtn = formElement.querySelector(settings.submitButtonSelector)
      setSubmitButtonState(isValid, inputBtn)
    });
  });
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelectors: '.popup__text',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
})

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
    formName.classList.remove('popup__text_type_error')
    formAbout.classList.remove('popup__text_type_error')
    popUpSpan.forEach((item) => {
      item.classList.remove('popup__text-error_active')
      item.textContent = ""
    })
  }
}
