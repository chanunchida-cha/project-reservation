import React, { useState } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";

function SettingAlacart({alacart}) {
  console.log(alacart);
  const [reservLength, setReservLength] = useState();
  return (
    <div className="shadow mt-4  overflow-hidden sm:rounded-md">
      <div className="px-4 py-4 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4 sm:col-span-1">
            <label
              htmlFor="email-address"
              className="inline-block text-sm font-medium text-gray-700"
            >
              ระยะเวลาขั้นต่ำ/รอบการจอง
            </label>
            <input
              type="text"
              name="reservLength"
              id="name"
              autoComplete="name"
              placeholder="นาที"
              className="inline-block p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
              onChange={(event) => {
                setReservLength(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-3">
          <Button className="text-base" type="primary" htmlType="submit">
            บันทึกข้อมูล
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingAlacart;
