import React from "react";
import Navbar from "../Navbar";
import { observer } from "mobx-react-lite";
import { partnerStore } from "./partnerStore";
import { useHistory } from "react-router-dom";

const HomePartner = observer(() => {
  const username = partnerStore.partner;
  const history = useHistory();
  console.log(username.username);

  return <div>HomePartner</div>;
});

export default HomePartner;
