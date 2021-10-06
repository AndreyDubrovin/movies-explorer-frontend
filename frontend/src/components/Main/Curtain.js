import "./Curtain.css";
import { Link, useHistory, NavLink } from "react-router-dom";

function Curtain(props) {
  const history = useHistory();
  function handleButtonClickProf() {
    history.push("/profile");
  }
  return (
            <div className={`curtain ${props.burger ? "curtain__active": ""}`}>
              <div className="curtain__container">
                <div className="curtain__close" onClick={props.curtainClose}></div>
                <div className="curtain__links">
                <Link  to="/" className="curtain__link">
                  Главная
                </Link>
                <NavLink  to="/movies" activeClassName="curtain__link_active" className="curtain__link">
                  Фильмы
                </NavLink>
                <NavLink  to="/saved-movies" activeClassName="curtain__link_active" className="curtain__link">
                  Сохранённые фильмы
                </NavLink>
                </div>
                <button
                  className="curtain__button-profile"
                  type="button"
                  onClick={handleButtonClickProf}
                >
                  Аккаунт
                </button>
                </div>
              </div>
  );
}

export default Curtain;
