import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { partnerStore } from "../../Store/partnerStore";
import ReservAllDayData from "./ReservAllDayData";
import ReservRoundData from "./ReservRoundData";

const ReservData = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInformation(id);
    };
    getInfo();
  }, []);
  const partnerInfos = partnerStore.partnerInfo;

  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return (
          <div key={partnerInfo._id}>
            {partnerInfo.type_rest && partnerInfo.type_rest === "allDay" ? (
              <ReservAllDayData />
            ) : (
              <ReservRoundData />
            )}
          </div>
        );
      })}
    </div>
  );
});
export default ReservData;
