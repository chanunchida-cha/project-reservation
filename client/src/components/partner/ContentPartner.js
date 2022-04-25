import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";
import InformationManage from "./InformationManage";

function ContentPartner() {
  return (
    <div>
      <Switch>
        <Route path={"/partner"} exact component={HomePartner} />
        <Route
          path={"/partner/information"}
          exact
          component={InformationManage}
        />
      </Switch>
    </div>
  );
}

export default ContentPartner;
