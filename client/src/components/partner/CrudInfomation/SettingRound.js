import React from "react";
import { Radio } from "antd";
import TextField from "@mui/material/TextField";

function SettingRound({
  days,
  openDay,
  onChangeValue,
  inputFields,
  handleChangeInput,
  handleAddFields,
  handleRemoveFields,
}) {
  return (
    <div>
      <div className="col-span-6 sm:col-span-6">
        <label
          htmlFor="openDay"
          className="block text-sm font-medium text-gray-700"
        >
          เวลาเปิด-ปิดร้าน
        </label>
        <div className="mt-2 bg-white shadow-sm border-gray-300 rounded-md p-3 ">
          {days.map((day) => {
            return (
              <div key={day.key} className="mt-3 mb-2">
                <label
                  htmlFor={day.key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {day.i18n}
                </label>
                <Radio.Group
                  name="type"
                  onChange={(e) => {
                    if (e.target.value === "open") {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                        },
                      });
                    } else {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                        },
                      });
                    }
                  }}
                  value={openDay[day.key].type}
                >
                  <Radio value={"open"}>เปิด</Radio>
                  <Radio value={"close"}>ไม่เปิด</Radio>
                </Radio.Group>
              </div>
            );
          })}

          <div className="">
            เพิ่มรอบเวลา
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
                    <button
                      onClick={handleAddFields}
                      className=" py-2 px-3 border ml-2 mt-2 border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                    >
                      เพิ่มรอบการจอง
                    </button>
                    <button
                      disabled={inputFields.length === 1}
                      onClick={() => handleRemoveFields(index)}
                      className=" py-2 px-3 border ml-2 mt-2 border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f] "
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingRound;
