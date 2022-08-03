import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomersData from "./CrudCustomer/CustomersData";
import HomeAdmin from "./HomeAdmin";
import PartnerApprove from "./CrudPartner/PartnerApprove";
import PartnerDisApprove from "./CrudPartner/PartnerDisApprove";
import PartnerVerify from "./CrudPartner/PartnerVerify";
import SinglePartner from "./CrudPartner/SinglePartner";
import SingleCustomerData from "./CrudCustomer/SingleCustomerData";
import CreateCustomer from "./CrudCustomer/CreateCustomer";
import EditCustomer from "./CrudCustomer/EditCustomer";
import CreatePartner from "./CrudPartner/CreatePartner";
import EditPartner from "./CrudPartner/EditPartner";
import AdminsData from "./CrudAdmin/AdminsData";
import CreateAdmin from "./CrudAdmin/CreateAdmin";
import SingleAdminData from "./CrudAdmin/SingleAdminData";
import EditAdmin from "./CrudAdmin/EditAdmin";
import EditPassword from "./EditPassword";
import Dashboard from "./Dashboard/Dashboard";
import Report from "./Report/Report";

function ContentAdmin() {
  return (
    <div>
      <Switch>
        <Route path={"/admin/dashboard/:id"} exact component={Dashboard} />
        <Route path={"/admin/edit/password"} exact component={EditPassword} />
        <Route path={"/admin/partnerverify"} exact component={PartnerVerify} />
        <Route path={"/admin/partner/:id"} exact component={SinglePartner} />
        <Route
          path={"/admin/partnerapprove"}
          exact
          component={PartnerApprove}
        />
        <Route
          path={"/admin/partnerdisapprove"}
          exact
          component={PartnerDisApprove}
        />
        <Route path={"/admin/customersdata"} exact component={CustomersData} />
        <Route
          path={"/admin/customersdata/:id"}
          exact
          component={SingleCustomerData}
        />
        <Route
          path={"/admin/createcustomer"}
          exact
          component={CreateCustomer}
        />
        <Route
          path={"/admin/editcustomer/:id"}
          exact
          component={EditCustomer}
        />
        <Route path={"/admin/createpartner"} exact component={CreatePartner} />
        <Route path={"/admin/editpartner/:id"} exact component={EditPartner} />
        <Route path={"/admin/adminsdata"} exact component={AdminsData} />
        <Route
          path={"/admin/adminsdata/:id"}
          exact
          component={SingleAdminData}
        />
        <Route path={"/admin/createadmin"} exact component={CreateAdmin} />
        <Route path={"/admin/editadmin/:id"} exact component={EditAdmin} />
        <Route path={"/admin/report/:id"} exact component={Report} />
      </Switch>
    </div>
  );
}

export default ContentAdmin;
