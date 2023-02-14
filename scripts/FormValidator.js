
class FormValidator {
  constructor(settings, formElement) {
    this._inputSelectors = settings.inputSelectors;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._buttonInactive = settings.buttonInactive;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    this._setEventListeners();
    };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement).filter(i => i.tagName !== "BUTTON")
    this._inputBtn = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        const arrBool = []
        this._inputList.forEach(item => {
          arrBool.push(item.validity.valid)
        })
        const isValid = arrBool.includes(false) ? false : true
        this._setSubmitButtonState(isValid, this._inputBtn)
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setSubmitButtonState(isFormValid, btn) {
    if (isFormValid) {
      btn.removeAttribute('disabled');
      btn.classList.remove(this._buttonInactive);
    } else {
      btn.setAttribute('disabled', true);
      btn.classList.add(this._buttonInactive);
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    console.log(inputElement)
    // try {
    //   errorElement.classList.remove(this._errorClass);
    //   errorElement.textContent = '';
    // } catch (error) {
    // }
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  resetValidation() {
    this._setSubmitButtonState(false, this._inputBtn)

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  };
}

export { FormValidator }
