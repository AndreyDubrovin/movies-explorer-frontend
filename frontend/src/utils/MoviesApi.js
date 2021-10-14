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

  getMovies() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
    }).then(this._getResponseData);
  }
}
// конфиг api
const apiConfig = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

//экспорт api
const api = new Api(apiConfig);
export default api;
