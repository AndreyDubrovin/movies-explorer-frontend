import './Header.css';
import NavTab from "../Main/NavTab";
import Promo from "../Main/Promo";
import { Route, Switch } from "react-router-dom";
import React from "react";

function Header(props) {


  return (
    <Switch>
      <Route exact path="/">
      <header className="header header_landing">
      <NavTab />
      <Promo />
    </header>
      </Route>
      <Route path="/*">
      <header className="header">
      <NavTab burger={props.burger}/>
    </header>
      </Route>
  </Switch>

  );
}

export default Header;
