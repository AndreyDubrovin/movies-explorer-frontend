import "./Login.css";
import { Link } from "react-router-dom";




function Login() {
  return (
    <>
      <form className="form">
      <div className="form__logo"></div>
      <h1 className="form__title">Рады видеть!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input"></input>
          <span className="error">ошибка</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input"></input>
          <span className="error">ошибка</span>
      </fieldset>
        <button className="form__button">Войти</button>
        <p className="form__text">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>
      </form>
    </>
  );
}

export default Login;
