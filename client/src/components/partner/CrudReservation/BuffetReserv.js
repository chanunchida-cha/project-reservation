import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../partnerStore";
import { Button } from "antd";
import TextField from "@mui/material/TextField";
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
const BuffetReserv = observer((props) => {
  const [add, setAdd] = useState(false);
  const { id } = useParams();
  console.log(id);
  const daykey = props.location.state.day.key;

  useEffect(async () => {
    await partnerStore.getInformation(id);
  }, []);

  const partnerInfos = partnerStore.partnerInfo;
  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return days
          .filter((days) => {
            return days.key.includes(daykey);
          })
          .map((day) => {
            return (
              <div key={day.key} className="text-base">
                {day.i18n}:
                {partnerInfo.openday[day.key].type === "open"
                  ? "  เปิด"
                  : "  ปิด"}
                {partnerInfo.openday[day.key].type === "open" ? (
                  <>
                    {" "}
                    {partnerInfo.openday[day.key].start} น. -{" "}
                    {partnerInfo.openday[day.key].end} น.{" "}
                  </>
                ) : null}
                <div>
                  <div className="shadow mt-4  overflow-hidden sm:rounded-md">
                    <div className="px-4 py-4 bg-white sm:p-6">
                      <div>
                        <Button
                          className="text-base  mt-2 "
                          type="primary"
                          htmlType="submit"
                          onClick={()=>{setAdd(!add)}}
                        >
                          เพิ่มรอบเวลา
                        </Button>
                      </div>
                     { add && <div>
                        <div className="mt-3">
                          <TextField
                            name="start"
                            id="time"
                            label="เริ่มต้น"
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            sx={{ width: 150, marginRight: 2 }}
                          />
                          <TextField
                            name="end"
                            id="time"
                            label="หมดเวลา"
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                          />
                          <Button
                            className="text-base ml-2 mt-2 px-2"
                            type="primary"
                            htmlType="submit"
                          >
                            บันทึกข้อมูล
                          </Button>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
      })}

      {/* {partnerInfo.openday[day.key].type === "open" ? "  เปิด" : "  ปิด"}
      {partnerInfo.openday[day.key].type === "open" ? (
        <>
          {" "}
          {partnerInfo.openday[day.key].start} น. -{" "}
          {partnerInfo.openday[day.key].end} น.{" "}
        </>
      ) : null}
      <div className="shadow mt-4  overflow-hidden sm:rounded-md">
        <div className="px-4 py-4 bg-white sm:p-6">
          <div>
            <div className="mt-3">
              <TextField
                name="start"
                id="time"
                label="เวลาเปิด"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150, marginRight: 2 }}
              />
              <TextField
                name="end"
                id="time"
                label="เวลาปิด"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
});

export default BuffetReserv;
