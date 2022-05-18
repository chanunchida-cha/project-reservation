import React, { useState } from "react";
import { Radio } from "antd";
import TextField from "@mui/material/TextField";

function SettingAllDay({
  days,
  openDay,
  onChangeValue,
  timeLength,
  onTimeLengthChange,
}) {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-1 sm:col-span-1 ">
        <label
          htmlFor="email-address"
          className=" text-sm font-medium text-gray-700"
        >
          ระยะเวลาขั้นต่ำ/รอบการจอง
        </label>
        <input
          type="number"
          name="timeLength"
          id="timeLength"
          value={timeLength}
          onChange={(event) => {
            onTimeLengthChange(event.target.value);
          }}
          autoComplete="timeLength"
          className="p-2  mt-1 shadow-md w-80 lg:text-sm border-gray-500 rounded-md"
        />
      </div>

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
                          start: "",
                          end: "",
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

                {openDay[day.key].type === "open" && (
                  <div className="mt-3">
                    <TextField
                      name="start"
                      id="time"
                      label="เวลาเปิด"
                      type="time"
                      onChange={(e) => {
                        onChangeValue({
                          ...openDay,
                          [day.key]: {
                            ...openDay[day.key],
                            start: e.target.value,
                            end: openDay[day.key].end,
                          },
                        });
                      }}
                      value={openDay[day.key].start}
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
                      onChange={(e) => {
                        onChangeValue({
                          ...openDay,
                          [day.key]: {
                            ...openDay[day.key],
                            start: openDay[day.key].start,
                            end: e.target.value,
                          },
                        });
                      }}
                      value={openDay[day.key].end}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingAllDay;
