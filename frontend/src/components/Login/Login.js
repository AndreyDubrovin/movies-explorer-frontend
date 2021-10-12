import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import apiServer from "../../utils/MainApi";
import {useFormWithValidation} from "../Validation/Validation";

function Login(props) {

  const validation = useFormWithValidation();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = validation.values;
    apiServer.login(password,email)
    .then((user) => {
      props.login(user);
    })
      .then(() => {
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`${err}`);
/*         props.registerStatus(false); */
      }

      );
    // .finally(() => editavatar.renderLoading(false));
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__logo"></div>
      <h1 className="form__title">Рады видеть!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input" name="email" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" value={validation.values.email} onChange={validation.handleChange}  required></input>
          <span className="error">{validation.errors.email}</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input" name="password" value={validation.values.password} onChange={validation.handleChange} minLength="8" required></input>
          <span className="error">{validation.errors.password}</span>
      </fieldset>
        <button className="form__button" disabled={!validation.isValid}>Войти</button>
        <p className="form__text">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>
      </form>
    </>
  );
}

export default Login;
