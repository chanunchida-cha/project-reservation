import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import App from "./App";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import Partner from "./components/partner/Partner";
import PartnerRegis from "./components/partner/PartnerRegis";
import PartnerLogin from "./components/partner/PartnerLogin";
import HomePartner from "./components/partner/HomePartner";
import HomeAdmin from "./components/admin/HomeAdmin";
import Layout from "./components/Layout";
import Sidebar from "./components/admin/Sidebar";
import AllPartner from "./components/admin/AllPartner";
function MyRoute() {
  return (
    <Layout>
      <Switch>
        <Route path={"/"} exact component={App} />
        <Route path={"/register"} exact component={Register} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/partner"} exact component={Partner} />
        <Route path={"/partnerregister"} exact component={PartnerRegis} />
        <Route path={"/partnerlogin"} exact component={PartnerLogin} />
        <Route path={"/homepartner"} exact component={HomePartner} />
        <Route path={"/admin"} component={Sidebar} />
      </Switch>
    </Layout>
  );
}

export default MyRoute;
