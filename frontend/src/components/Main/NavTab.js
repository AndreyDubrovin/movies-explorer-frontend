import "./NavTab.css";

import { Route, Link, Switch, useHistory } from "react-router-dom";
function NavTab(props) {
  const history = useHistory();

  function handleButtonClickEnter() {
    history.push("/signin");
  }

  function handleButtonClickProf() {
    history.push("/profile");
  }

  function menuClick() {
    props.burger();
  }

  return (
    <Switch>
      <Route exact path="/">
        <div className="header-menu">
          <div className="header-menu__logo"></div>
          <nav className="header-menu__nav">
            <Link to="/signup" className="header-menu__link">
              Регистрация
            </Link>
            <button
              className="header-menu__button-enter"
              type="button"
              onClick={handleButtonClickEnter}
            >
              Войти
            </button>
          </nav>
        </div>
      </Route>
      <Route path="/*">
        <div className="header-menu">
          <div className="header-menu__logo"></div>
          <nav className="header-menu__nav">
                <div className="header-menu__links">
                <Link  to="/movies" className="header-menu__link-black">
                  Фильмы
                </Link>
                <Link  to="/saved-movies" className="header-menu__link-black">
                  Сохранённые фильмы
                </Link>
                </div>
                <button
                  className="header-menu__button-profile"
                  type="button"
                  onClick={handleButtonClickProf}
                >
                  Аккаунт
                </button>
          </nav>
          <div className="header-menu__burger" onClick={menuClick}></div>
        </div>
      </Route>
    </Switch>
  );
}

export default NavTab;
