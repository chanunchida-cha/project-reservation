import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../../Store/partnerStore";
import DashboardAllday from "./DashboardAllday";
import DashboardRound from "./DashboardRound";

const Dashboard = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    const getInfoData = async () => {
      await partnerStore.getInformation(id);
    };
    getInfoData();
  }, [id]);
  return (
    <>
      {partnerStore.partnerInfo.map((partnerInfo) => {
        return (
          <>
            {partnerInfo.type_rest === "allDay" ? (
              <DashboardAllday />
            ) : (
              <DashboardRound />
            )}
          </>
        );
      })}
    </>
  );
});

export default Dashboard;
