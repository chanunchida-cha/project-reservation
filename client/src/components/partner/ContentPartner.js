import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";
import Information from "./CrudInfomation/Information";
import EditInformation from "./CrudInfomation/EditInformation";
import MenuData from "./CrudMenu/MenuData";
import CreateMenu from "./CrudMenu/CreateMenu";
import EditMenu from "./CrudMenu/EditMenu";
import TableData from "./CrudTable/TableData";
import CreateTable from "./CrudTable/CreateTable";
import EditTable from "./CrudTable/EditTable";
import ReservData from "./CrudReservation/ReservData";
import CreateReservation from "./CrudReservation/CreateReservation";

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
        <Route path={"/partner/table/:id"} exact component={TableData} />
        <Route
          path={"/partner/createtable/:id"}
          exact
          component={CreateTable}
        />
        <Route path={"/partner/edittable/:id"} exact component={EditTable} />
        <Route
          path={"/partner/reservationdata/:id"}
          exact
          component={ReservData}
        />
        <Route
          path={"/partner/createreservation/:id"}
          exact
          component={CreateReservation}
        />
      </Switch>
    </div>
  );
}

export default ContentPartner;
