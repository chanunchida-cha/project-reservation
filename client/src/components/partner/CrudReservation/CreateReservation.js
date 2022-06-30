import React, { useEffect, useState } from "react";
import { partnerStore } from "../../Store/partnerStore";
import { useParams, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import RoundsReserv from "./RoundsReserv";
import AllDayReserv from "./AllDayReserv";

const CreateReservation = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInformation(id);
    };
    getInfo();
  }, []);
  const partnerInfos = partnerStore.partnerInfo;
  console.log(partnerInfos);

  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return (
          <div key={partnerInfo._id}>
            {partnerInfo.type_rest && partnerInfo.type_rest === "rounds" ? (
              <RoundsReserv partnerInfo={partnerInfo} />
            ) : (
              <AllDayReserv partnerInfo={partnerInfo} />
            )}
          </div>
        );
      })}
    </div>
  );
});
export default CreateReservation;
