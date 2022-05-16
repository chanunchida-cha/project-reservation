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
  console.log(props);
  const [inputFields, setInputFields] = useState([
    {
      start: "",
      end: "",
    },
  ]);
  const { id } = useParams();
  console.log(id);
  const day = props.location.state.day;
  const daykey = day.key

  useEffect(async () => {
    await partnerStore.getInformation(id);
  }, []);
  const handleChangeInput = (index, event) => {
    const newInputFields = inputFields.map((inputField, id) => {
      if (index === id) {
        inputField[event.target.name] = event.target.value;
      }
      return inputField;
    });

    setInputFields(newInputFields);
    console.log(inputFields);
  };

  const handleAddFields = (event) => {
    event.preventDefault();
    setInputFields([...inputFields, { start: "", end: "" }]);
  };

  const handleRemoveFields = (index,event) => {
     event.preventDefault();
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const partnerInfos = partnerStore.partnerInfo;
  return (
    <>
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
              </div>
            );
          });
      })}

      <div>
        <div className="shadow mt-4  overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <form>
              {inputFields.map((inputField, index) => {
                return (
                  <div key={index}>
                    <div className="mt-3">
                      <TextField
                        name="start"
                        value={inputField.start}
                        onChange={(event) => {
                          handleChangeInput(index, event);
                        }}
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
                        value={inputField.end}
                        onChange={(event) => {
                          handleChangeInput(index, event);
                        }}
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
                        onClick={handleAddFields}
                      >
                        เพิ่มรอบการจอง
                      </Button>
                      <Button
                        className="text-base ml-2 mt-2 px-2"
                        type="primary"
                        htmlType="submit"
                        danger
                        disabled={inputFields.length === 1}
                        onClick={() => handleRemoveFields(index)}
                      >
                        ลบ
                      </Button>
                      <div>
                        {inputFields.length === index + 1 && (
                          <Button
                            className="text-base ml-2 mt-2 px-2"
                            type="primary"
                            htmlType="submit"
                          >
                            บันทึกข้อมูล
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export default BuffetReserv;
