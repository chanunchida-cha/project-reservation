import React, { useState } from "react";
import useSWR from "swr";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import TableReportDay from "./TableReportDay";
import TableReportWeek from "./TableReportWeek";

const labelsButton = ["รายวัน", "รายสัปดาห์", "รายเดือน", "รายปี"];
const fetcher = (url) => axios.get(url).then((res) => res.data);
function ReportAllday() {
  const [type, setType] = useState(labelsButton[0]);

  return (
    <div className="bg-white mx-6 px-4 py-4">
      <div>รายงาน</div>
      <div className="grid grid-cols-4 gap-2">
        {labelsButton.map((labelButton, index) => {
          return (
            <div className="col-span-1 flex justify-center" key={index}>
              <button
                className={
                  labelButton === type
                    ? "border-b py-2 font-semibold border-[#468CF0] "
                    : "hover:font-semibold"
                }
                onClick={() => {
                  setType(labelButton);
                }}
              >
                {labelButton}
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        {type === "รายวัน" ? (
          <TableReportDay />
        ) : type === "รายสัปดาห์" ? (
          <TableReportWeek />
        ) : null}
      </div>
    </div>
  );
}

export default ReportAllday;
