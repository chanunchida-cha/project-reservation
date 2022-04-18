import { Layout } from "antd";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import HomeAdmin from "./HomeAdmin";
import PartnerApprove from "./PartnerApprove";
import PartnerVerify from "./PartnerVerify";
import SinglePartnerVerify from "./SinglePartnerVerify";

function ContentAdmin() {
  return (
    <Layout>
      <Switch>
        <Route path={"/admin"} exact component={HomeAdmin} />
        <Route path={"/admin/partnerverify"} exact component={PartnerVerify} />
        <Route
          path={"/admin/partnerverify/:id"}
          exact
          component={SinglePartnerVerify}
        />
        <Route
          path={"/admin/partnerapprove"}
          exact
          component={PartnerApprove}
        />
      </Switch>
    </Layout>
  );
}

export default ContentAdmin;
