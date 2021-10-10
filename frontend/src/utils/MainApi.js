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

  register(name, password, email) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, password, email })
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
