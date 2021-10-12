class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }

  register(name, password, email) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ name, password, email })
    }).then(this._getResponseData);
  }

  login(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    }).then(this._getResponseData);
  }

  logout() {
    return fetch(`${this.baseUrl}/users/signout`, {
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }

  editProfile(name, email) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ name, email })
    }).then(this._getResponseData);
  }
}
// конфиг api
const apiConfig = {
  baseUrl: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
};
//экспорт api
const apiServer = new Api(apiConfig);
export default apiServer;
