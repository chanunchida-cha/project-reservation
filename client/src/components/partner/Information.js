import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "./partnerStore";
import InformationData from "./InformationData";
import InformationManage from "./InformationManage";

const Information = observer(() => {
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    partnerStore.getInformation(id);
  }, []);

  const partnerInfo = partnerStore.partnerInfo.length;
  console.log(partnerInfo);

  if (partnerInfo > 0) {
    return <InformationData />;
  }
  return <InformationManage />;
});

export default Information;
