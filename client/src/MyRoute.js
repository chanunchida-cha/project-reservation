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
import EditReservAllDay from "./components/partner/CrudReservation/EditReservAllDay";
import EditMyReservationAllday from "./components/indexPage/EditMyReservationAllday";
import EditMyReservationRounds from "./components/indexPage/EditMyReservationRounds";
import HistoryReservation from "./components/customer/HistoryReservation";
import EditPassword from "./components/customer/EditPassword";

function MyRoute() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} exact component={App} />
        <Route path={"/register"} exact component={Register} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/registerpartner"} exact component={PartnerRegis} />
        <Route path={"/loginpartner"} exact component={PartnerLogin} />
        <Route path={"/loginadmin"} exact component={LoginAdmin} />
        <Route path={"/myprofile"} exact component={MyProfile} />
        <Route path={"/myprofile/edit"} exact component={EditProfile} />
        <Route
          path={"/myprofile/edit/password"}
          exact
          component={EditPassword}
        />
        <Route
          path={"/myhistoryreservation/:id"}
          exact
          component={HistoryReservation}
        />
        <Route path={"/restaurant/:id"} exact component={SingleRestaurant} />
        <Route
          path={"/myreservation/:type/:partner_id/:id"}
          exact
          component={MyReservation}
        />
        <Route
          path={"/editmyreservation/allDay/:partner_id/:id"}
          exact
          component={EditMyReservationAllday}
        />
        <Route
          path={"/editmyreservation/rounds/:partner_id/:id"}
          exact
          component={EditMyReservationRounds}
        />
      </Switch>
    </Layout>
  );
}

export default MyRoute;
