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
import ReservationData from "./CrudReservation/ReservationData";
import SettingReserv from "./CrudReservation/SettingReserv";
import BuffetReserv from "./CrudReservation/BuffetReserv";

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
          path={"/partner/reservation/:id"}
          exact
          component={ReservationData}
        />
        <Route
          path={"/partner/settingreservation/:id"}
          exact
          component={SettingReserv}
        />
        <Route path={"/partner/buffetreserv/:id"} exact component={BuffetReserv} />
      </Switch>
    </div>
  );
}

export default ContentPartner;
