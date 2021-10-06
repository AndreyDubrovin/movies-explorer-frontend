import './Profile.css';
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <>
    <Header burger={props.burger}/>
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <div className="profile__container">
        <p className="profile__name">Имя</p>
        <input className="profile__text" type="text" value="text" disabled></input>
      </div>
      <div className="profile__container">
      <p className="profile__name">E-mail</p>
        <input className="profile__text" type="email" ></input>
      </div>
      <ul className="profile__links">
        <li><p className="profile__link">Редактировать</p></li>
        <li><Link to="/singout" className="profile__link profile__link_color_red">Выйти из аккаунта</Link></li>
      </ul>
    </main>
    </>

  );
}

export default Profile;
