import "./Register.css";
import {Link , useHistory} from "react-router-dom";
import React from "react";
import apiServer from "../../utils/MainApi"


function Register(props) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }


  function handleSubmit(e) {
    e.preventDefault();
    const { name, password, email } = state;
    apiServer
      .register(name,password,email)
/*       .then(() => {
        props.registerStatus(true);
      }) */
      .then(() => {
        history.push('/signin');
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
      <form className="form" onSubmit={handleSubmit}>
      <div className="form__logo"></div>
      <h1 className="form__title">Добро пожаловать!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-name">Имя</label>
          <input id="input-name" type="text" className="form__input" name="name" value={state.name} onChange={handleInputChange}></input>
          <span className="error">ошибка</span>
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input" name="email" value={state.email} onChange={handleInputChange}></input>
          <span className="error">ошибка</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input" name="password" value={state.password} onChange={handleInputChange}></input>
          <span className="error">ошибка</span>
      </fieldset>
        <button className="form__button">Зарегистрироваться</button>
        <p className="form__text">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
      </form>
    </>
  );
}

export default Register;
