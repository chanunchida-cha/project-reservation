import React, { useState, Fragment } from "react";
import { Radio } from "antd";
import TextField from "@mui/material/TextField";
import { Button } from "antd";

function EditRounds({
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRounds