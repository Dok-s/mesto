import Popup from "./Popup.js";

export default class PopupWithFormQuestion extends Popup {
  constructor(popupSeletor) {
    super(popupSeletor);
    this._form = this._popup.querySelector(".popup__form");
    this._question = () => {};
    this.setEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._question();
    });
    super.setEventListeners();
  }

  setQuestion(data) {
    this._question = data;
  }
}
