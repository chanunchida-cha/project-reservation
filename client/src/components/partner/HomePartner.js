import React from "react";
import Navbar from "../Navbar";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../Store/partnerStore";
import { useHistory } from "react-router-dom";

const HomePartner = observer(() => {
  const username = partnerStore.partnerlogin;
  const history = useHistory();
  console.log(username.username);

  return <div>HomePartner</div>;
});

export default HomePartner;
