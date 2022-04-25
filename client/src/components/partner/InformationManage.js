import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Radio, Button } from "antd";
import { partnerStore } from "./partnerStore";
import { useHistory } from "react-router-dom";

const startday = [
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัส",
  "วันศุกร์",
  "วันเสาร์",
  "วันอาทิตย์",
];

const InformationManage = observer(() => {
  const history = useHistory();
  const [days, setDays] = useState(startday);
  const [value, setValue] = useState("");

  const onValueChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          จัดการข้อมูลทั่วไปของร้านอาหาร
        </h3>
        <form>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    คำอธิบายร้านอาหาร
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    name="restaurantName"
                    id="restaurantName"
                    autoComplete="restaurantName"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ที่ตั้งร้านอาหาร
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ข้อมูลติดต่อ
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="phonenumber"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    เวลาเปิด-ปิดร้าน
                  </label>
                  <div className="mt-2 bg-white shadow-sm border-gray-300 rounded-md p-3 ">
                    {days.map((day) => {
                      return (
                        <div className="mt-3 mb-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {day}
                          </label>
                          <Radio.Group onChange={onValueChange} value={value}>
                            <Radio value={"open"}>เปิด</Radio>
                            <Radio value={"close"}>ไม่เปิด</Radio>
                          </Radio.Group>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button className="text-base" type="primary" htmlType="submit">
                บันทึกข้อมูล
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default InformationManage;
