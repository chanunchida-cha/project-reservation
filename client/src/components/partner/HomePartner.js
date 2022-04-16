import React from "react";
import Navbar from "../Navbar";
import { partnerStore } from "./partnerStore";
import { useHistory } from "react-router-dom";

function HomePartner() {
  const username = partnerStore.username;
  const history = useHistory();
  if (username == undefined) {
    history.push("/");
  }
  return <div>HomePartner</div>;
}

export default HomePartner;
