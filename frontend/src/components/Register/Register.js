import "./Register.css";
import {Link, useHistory} from "react-router-dom";
import React from "react";
import apiServer from "../../utils/MainApi";
import {useFormWithValidation} from "../Validation/Validation";


function Register() {
  const validation = useFormWithValidation();
  const history = useHistory();

  console.log(validation.values.name)


  function handleSubmit(e) {
    e.preventDefault();
    const { name, password, email } = validation.values;
    apiServer
      .register(name,password,email)
/*       .then(() => {
        props.registerStatus(true);
      }) */
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
      <h1 className="form__title">Добро пожаловать!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-name">Имя</label>
          <input id="input-name" type="text" className="form__input" name="name" pattern="[а-яА-Яa-zA-Z\-\s]{2,30}" value={validation.values.name} onChange={validation.handleChange} required></input>
          <span className="error">{validation.errors.name}</span>
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input" name="email" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" value={validation.values.email} onChange={validation.handleChange}  required></input>
          <span className="error">{validation.errors.email}</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input" name="password" value={validation.values.password} onChange={validation.handleChange} minLength="8" required></input>
          <span className="error">{validation.errors.password}</span>
      </fieldset>
        <button className="form__button" disabled={!validation.isValid}>Зарегистрироваться</button>
        <p className="form__text">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
      </form>
    </>
  );
}

export default Register;
