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
import EditReservAllDay from "./CrudReservation/EditReservAllDay";
import EditReservRound from "./CrudReservation/EditReservRound";
import SingleAllDayReserv from "./CrudReservation/SingleAllDayReserv";
import SingleRoundReserv from "./CrudReservation/SingleRoundReserv";
import EditPassword from "./EditPassword";
import Dashboard from "./Dashboard/Dashboard";
import Report from "./Report/Report";

function ContentPartner() {
  return (
    <div>
      <Switch>
        <Route path={"/partner/dashboard/:id"} exact component={Dashboard} />
        <Route
          path={"/partner/information/:id"}
          exact
          component={Information}
        />
        <Route path={"/partner/edit/password"} exact component={EditPassword} />
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
        <Route
          path={"/partner/reservationdata/allday/edit/:partnerId/:id"}
          exact
          component={EditReservAllDay}
        />
        <Route
          path={"/partner/reservationdata/round/edit/:partnerId/:id"}
          exact
          component={EditReservRound}
        />
        <Route
          path={"/partner/reserv/allday/:id"}
          exact
          component={SingleAllDayReserv}
        />
        <Route
          path={"/partner/reserv/round/:id"}
          exact
          component={SingleRoundReserv}
        />
          <Route
          path={"/partner/report/:id"}
          exact
          component={Report}
        />
      </Switch>
    </div>
  );
}

export default ContentPartner;
