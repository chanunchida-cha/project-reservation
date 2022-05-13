import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../partnerStore";
import { Button } from "antd";
const days = [
  {
    key: "monday",
    i18n: "วันจันทร์",
  },
  {
    key: "tuesday",
    i18n: "วันอังคาร",
  },
  {
    key: "wednesday",
    i18n: "วันพุธ",
  },
  {
    key: "thursday",
    i18n: "วันพฤหัสบดี",
  },
  {
    key: "friday",
    i18n: "วันศุกร์",
  },
  {
    key: "saturday",
    i18n: "วันเสาร์",
  },
  {
    key: "sunday",
    i18n: "วันอาทิตย์",
  },
];

const SettingBuffet = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [info, setInfo] = useState({
    day: {},
    partnerInfo: {},
  });
  console.log(id);

  useEffect(() => {
    partnerStore.getInformation(id);
  }, []);
  const partnerInfos = partnerStore.partnerInfo;
  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return (
          <div
            key={partnerInfo._id}
            className=" mt-3  bg-white shadow overflow-hidden sm:rounded-lg "
          >
            <div className="grid grid-cols-2 ">
              <div className="px-4 py-3 sm:px-6   ">
                {days.map((day) => {
                  return (
                    <div className="containter mb-3" key={day.key}>
                      <div
                        className={
                          partnerInfo.openday[day.key].type === "open"
                            ? "bg-[#E6F7FF] p-3 rounded-lg  relative  transition duration-500"
                            : "bg-[#F0F2F5] p-3 rounded-lg  relative  transition duration-500"
                        }
                      >
                        <p className=" leading-6 tracking-normal">
                          {day.i18n}:
                          {partnerInfo.openday[day.key].type === "open"
                            ? "  เปิด"
                            : "  ปิด"}
                          {partnerInfo.openday[day.key].type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday[day.key].start} น. -{" "}
                              {partnerInfo.openday[day.key].end} น.{" "}
                            </>
                          ) : null}
                        </p>
                        {partnerInfo.openday[day.key].type === "open" ? (
                          <button
                            className="  py-1 px-2 mt-2 bg-[#189bff] text-white rounded-md"
                            onClick={() => {
                              history.push({
                                pathname: `/partner/buffetreserv/${id}`,
                                state: { day: day },
                              });
                            }}
                          >
                            จัดการรอบการจอง
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SettingBuffet;
