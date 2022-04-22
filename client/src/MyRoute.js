import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import Partner from "./components/partner/Partner";
import PartnerRegis from "./components/partner/PartnerRegis";
import PartnerLogin from "./components/partner/PartnerLogin";
import HomePartner from "./components/partner/HomePartner";
import Layout from "./components/Layout";

function MyRoute() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} exact component={App} />
        <Route path={"/register"} exact component={Register} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/joinpartner"} exact component={Partner} />
        <Route path={"/registerpartner"} exact component={PartnerRegis} />
        <Route path={"/loginpartner"} exact component={PartnerLogin} />
      </Switch>
    </Layout>
  );
}

export default MyRoute;
