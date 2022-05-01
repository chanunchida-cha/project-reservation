import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";
import InformationData from "./InformationData";
import InformationManage from "./InformationManage";
import Information from "./Information";
import EditInformation from "./EditInformation";

function ContentPartner() {
  return (
    <div>
      <Switch>
        <Route path={"/partner"} exact component={HomePartner} />
        <Route
          path={"/partner/information/:id"}
          exact
          component={Information}
        />
        <Route
          path={"/partner/editinformation/:id"}
          exact
          component={EditInformation}
        />
      </Switch>
    </div>
  );
}

export default ContentPartner;
