import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomersData from "./CustomersData";
import HomeAdmin from "./HomeAdmin";
import PartnerApprove from "./PartnerApprove";
import PartnerDisApprove from "./PartnerDisApprove";
import PartnerVerify from "./PartnerVerify";
import SinglePartnerVerify from "./SinglePartnerVerify";
import SingleCustomerData from "./SingleCustomerData";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import CreatePartner from "./CreatePartner";
import EditPartner from "./EditPartner";
import AdminsData from "./AdminsData";
import CreateAdmin from "./CreateAdmin";
import SingleAdminData from "./SingleAdminData";
import EditAdmin from "./EditAdmin";

function ContentAdmin() {
  return (
    <div>
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
      </Switch>
    </div>
  );
}

export default ContentAdmin;
