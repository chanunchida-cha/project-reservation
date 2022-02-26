import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";
import Partner from "./components/Partner";
import PartnerRegis from "./components/PartnerRegis";

function MyRoute() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={"/"} exact component={App} />
        <Route path={"/register"} exact component={Register} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/partner"} exact component={Partner} />
        <Route path={"/partnerregister"} exact component={PartnerRegis} />
      </Switch>
    </BrowserRouter>
  );
}

export default MyRoute;
