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
import api from "../../utils/MoviesApi";
import filterRequest from "../Movies/FilterRequest";

function App() {

  const [isBurgerClick, setBurgerClick] = React.useState(false);
  const [isloggedIn, setloggedIn] = React.useState(false);
  const [quantityCards, setQuantityCards] = React.useState(0);
  const [findResult, setfindResult] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [findNothing, setFindNothing] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      setfindResult(JSON.parse(localStorage.getItem('movies')));
      updateViewCards();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", updateViewCards);
    return () => {
      window.removeEventListener("resize", updateViewCards);
    };
  });

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

  React.useEffect(() => {
    apiServer.getMovies()
    .then((movies) =>{
      setSaveMovies(movies.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function updateViewCards() {
    if (window.innerWidth > 1279) setQuantityCards(12);
    if (window.innerWidth > 480 && window.innerWidth <1280) setQuantityCards(8);
    if (window.innerWidth > 319 && window.innerWidth < 481) setQuantityCards(5);
  }

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

  function toggleChange(status) {
    setChecked(status);
   }

  function handlerSearchButton(str) {
    setFindNothing(false);
    setLoading(true);
    api.getMovies()
      .then((movies) => {
        const result = filterRequest(movies,str,checked)
        localStorage.setItem('movies', JSON.stringify(result));
        setfindResult(result);
        updateViewCards();
        if (result.length === 0) {
          setFindNothing(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function handlerSearchButtonSaveMovies(str) {
    setFindNothing(false);
    setLoading(true);
    apiServer.getMovies()
    .then((movies) => {
      const result = filterRequest(movies.data,str,checked)
      setSaveMovies(result);
      updateViewCards();
      if (result.length === 0) {
        setFindNothing(true);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }
  function handleSaveCard(movieTarget) {
    const statusMovie = 'owner' in movieTarget ? saveMovies.filter((movie) => movie._id === movieTarget._id) : saveMovies.filter((movie) => movie.movieId === movieTarget.id);
    if (statusMovie.length > 0) {
      apiServer.delMovie(statusMovie[0]._id)
      .then(() =>{
        const newArray = 'owner' in movieTarget ? saveMovies.filter((movie) => movie._id !== movieTarget._id) : saveMovies.filter((movie) => movie.movieId !== movieTarget.id);
        setSaveMovies(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      apiServer.addMovies(movieTarget)
      .then((newCard) => {
        setSaveMovies([...saveMovies, newCard.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    }
}
        function handlerMoreButton() {
          let number = 0
          if (window.innerWidth > 1279) number = 4;
          if (window.innerWidth > 480 && window.innerWidth <1280) number = 2;
          if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
          if (findResult.length < quantityCards + number) {
            setQuantityCards(findResult.length + 1)
          } else {
            setQuantityCards(quantityCards + number);
          }
        }

        function profileEdit(name,email) {
          setcurrentUser({name,email});
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
              swit={true}
              nothing={findNothing}
              loading={loading}
              searchButton={handlerSearchButton}
              checkbox={toggleChange}
              movies={findResult}
              saveMovies={saveMovies}
              cardsView ={quantityCards}
              more={handlerMoreButton}
              loggedIn={isloggedIn}
              onSaveCard={handleSaveCard}
              burger={burgerClick}
              component={Movies}
            />
      </Route>
      <Route path="/saved-movies">
      <ProtectedRoute
              path="/saved-movies"
              nothing={findNothing}
              loading={loading}
              searchButton={handlerSearchButtonSaveMovies}
              checkbox={toggleChange}
              saveMovies={saveMovies}
              cardsView ={quantityCards}
              more={handlerMoreButton}
              loggedIn={isloggedIn}
              onSaveCard={handleSaveCard}
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
              profileEdit={profileEdit}
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
