import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../../Store/partnerStore";
import ReportAllday from "./ReportAllday";
import ReportRound from "./ReportRound";

const Report=observer(() =>{
  const { id } = useParams();
  useEffect(() => {
    const getInfoData = async () => {
      await partnerStore.getInformation(id);
    };
    getInfoData();
  }, [id]);
  return (
    <div>{partnerStore.partnerInfo.map((partnerInfo) => {
      return (
        <>
          {partnerInfo.type_rest === "allDay" ? (
            <ReportAllday />
          ) : (
            <ReportRound />
          )}
        </>
      );
    })}</div>
  )
})

export default Report