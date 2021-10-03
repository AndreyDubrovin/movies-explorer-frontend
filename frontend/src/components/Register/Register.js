import "./Register.css";
import { Link} from "react-router-dom";




function Register() {
  return (
    <>
      <form className="form">
      <div className="form__logo"></div>
      <h1 className="form__title">Добро пожаловать!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-name">Имя</label>
          <input id="input-name" type="text" className="form__input"></input>
          <span className="error">ошибка</span>
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input"></input>
          <span className="error">ошибка</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input"></input>
          <span className="error">ошибка</span>
      </fieldset>
        <button className="form__button">Зарегистрироваться</button>
        <p className="form__text">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
      </form>
    </>
  );
}

export default Register;
