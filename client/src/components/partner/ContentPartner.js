import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";
import Information from "./CrudInfomation/Information";
import EditInformation from "./CrudInfomation/EditInformation";
import MenuData from "./CrudMenu/MenuData";
import CreateMenu from "./CrudMenu/CreateMenu";
import EditMenu from "./CrudMenu/EditMenu";
import CreateReserv from "./CrudReservation/CreateReserv";

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
        <Route path={"/partner/createmenu/:id"} exact component={CreateMenu} />
        <Route path={"/partner/menu/:id"} exact component={MenuData} />
        <Route path={"/partner/editmenu/:id"} exact component={EditMenu} />
        <Route path={"/partner/reservation/:id"} exact component={CreateReserv} />
      </Switch>
    </div>
  );
}

export default ContentPartner;
