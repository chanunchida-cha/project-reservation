import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import Partner from "./components/partner/Partner";
import PartnerRegis from "./components/partner/PartnerRegis";
import PartnerLogin from "./components/partner/PartnerLogin";

import Layout from "./components/Layout";
import LoginAdmin from "./components/admin/LoginAdmin";
import MyProfile from "./components/customer/MyProfile";
import EditProfile from "./components/customer/EditProfile";
import SingleRestaurant from "./components/indexPage/SingleRestaurant";
import MyReservation from "./components/indexPage/MyReservation";

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
        <Route path={"/loginadmin"} exact component={LoginAdmin} />
        <Route path={"/myprofile"} exact component={MyProfile} />
        <Route path={"/myprofile/edit"} exact component={EditProfile} />
        <Route path={"/restaurant/:id"} exact component={SingleRestaurant} />
        <Route
          path={"/myreservation/:type/:typecustomer/:id"}
          exact
          component={MyReservation}
        />
      </Switch>
    </Layout>
  );
}

export default MyRoute;
