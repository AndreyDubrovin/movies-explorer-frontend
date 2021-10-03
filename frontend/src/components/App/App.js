import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Curtain from "../Main/Curtain";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App() {

  const [isBurgerClick, setBurgerClick] = React.useState(false);

  function burgerClick() {
    setBurgerClick(true);
  }

  function closeClick() {
    setBurgerClick(false);
  }
  return (
    <div className="page">
      <Curtain burger={isBurgerClick} curtainClose={closeClick} />
      <Switch>
      <Route exact path="/">
      <Main/>
      </Route>
      <Route path="/movies">
      <Movies burger={burgerClick}/>
      </Route>
      <Route path="/saved-movies">
      <SavedMovies burger={burgerClick}/>
      </Route>
      <Route path="/signup">
      <Register/>
      </Route>
      <Route path="/signin">
      <Login/>
      </Route>
      <Route path="/profile">
      <Profile burger={burgerClick}/>
      </Route>
      <Route path="*">
    <PageNotFound />
  </Route>

  </Switch>

    </div>
  );
}

export default App;
