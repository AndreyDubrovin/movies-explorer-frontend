import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Curtain from "../Main/Curtain";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Switch, useHistory  } from "react-router-dom";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import apiServer from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [isBurgerClick, setBurgerClick] = React.useState(false);
  const [isloggedIn, setloggedIn] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const history = useHistory();


  React.useEffect(() => {
    apiServer
      .getUserInfo()
      .then((userInfo) => {
        if (userInfo) {
          setloggedIn(true);
          setcurrentUser(userInfo.data);
          history.push("/movies");
        }
      })
      .catch((err) =>
        console.log(`Ошибка получения данных о пользователе: ${err}`)
      );
    // .finally(() => editavatar.renderLoading(false));
  }, [history]);

  function burgerClick() {
    setBurgerClick(true);
  }

  function closeClick() {
    setBurgerClick(false);
  }

  function onLogin(user) {
    setcurrentUser(user.data);
    setloggedIn(true);
  }

  function logout() {
    apiServer.logout()
    .then(() => {
        setloggedIn(false);
        history.push("/");
      })
    .catch((err) =>
      console.log(`Ошибка: ${err}`)
    );
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Curtain burger={isBurgerClick} curtainClose={closeClick} />
      <Switch>
      <Route exact path="/">
      <Main/>
      </Route>
      <Route path="/movies">
      <ProtectedRoute
              path="/movies"
              loggedIn={isloggedIn}
              burger={burgerClick}
              component={Movies}
            />
      </Route>
      <Route path="/saved-movies">
      <ProtectedRoute
              path="/saved-movies"
              loggedIn={isloggedIn}
              burger={burgerClick}
              component={SavedMovies}
            />
      </Route>
      <Route path="/signup">
      <Register/>
      </Route>
      <Route path="/signin">
      <Login login={onLogin}/>
      </Route>
      <Route path="/profile">
      <ProtectedRoute
              path="/profile"
              loggedIn={isloggedIn}
              logout={logout}
              burger={burgerClick}
              component={Profile}
            />
      </Route>
      <Route path="*">
    <PageNotFound />
  </Route>
  </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
