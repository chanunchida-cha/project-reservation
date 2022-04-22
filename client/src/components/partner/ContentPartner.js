import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePartner from "./HomePartner";

function ContentPartner() {
  return (
    <div>
      <Switch>
        <Route path={"/partner"} exact component={HomePartner} />
      </Switch>
    </div>
  );
}

export default ContentPartner;
