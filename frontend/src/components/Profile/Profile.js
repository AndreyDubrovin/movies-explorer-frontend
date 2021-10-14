import './Profile.css';
import Header from "../Header/Header";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from "react";
import {useFormWithValidation} from "../Validation/Validation";
import apiServer from "../../utils/MainApi";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const validation = useFormWithValidation(currentUser);
  const [text, setText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = validation.values;
    apiServer
      .editProfile(name,email)
      .then(() => {
        props.profileEdit(name,email);
        setText('Изменения выполнены');
      })
      .catch((err) => {
        setText(`${err}`);
      }
      );
  }
  return (
    <>
    <Header burger={props.burger}/>
    <main className="profile">
      <form onSubmit={handleSubmit} noValidate>
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <div className="profile__container">
        <p className="profile__name">Имя</p>
        <input className="profile__text" type="text" name="name" pattern="[а-яА-Яa-zA-Z\-\s]{2,30}" value={validation.values.name} onChange={validation.handleChange} required></input>
      </div>
      <span className="error-profile">{validation.errors.name}</span>
      <div className="profile__container">
      <p className="profile__name">E-mail</p>
        <input className="profile__text" type="email" name="email" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" value={validation.values.email} onChange={validation.handleChange} required></input>
      </div>
      <span className="error-profile">{validation.errors.email}</span>
      <ul className="profile__links">
      <li><p className="submit-error">{text}</p></li>
        <li><button className="profile__link profile__link-button" disabled={!validation.isValid}>Редактировать</button></li>
        <li><p className="profile__link profile__link_color_red" onClick={props.logout}>Выйти из аккаунта</p></li>
      </ul>
      </form>
    </main>
    </>

  );
}

export default Profile;
