import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";
import Information from "./CrudInfomation/Information";
import EditInformation from "./CrudInfomation/EditInformation";
import MenuData from "./CrudMenu/MenuData";

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
        <Route path={"/partner/menu"} exact component={MenuData} />
      </Switch>
    </div>
  );
}

export default ContentPartner;
