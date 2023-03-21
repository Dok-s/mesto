export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._data = {};
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    this._data = data;
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar(data) {
    this._data = data;
    this._avatar.src = data.avatar;
  }
}
