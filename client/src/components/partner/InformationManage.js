import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Radio, Button } from "antd";
import { partnerStore } from "./partnerStore";
import { useHistory } from "react-router-dom";
import Openday from "./Openday";

const InformationManage = observer(() => {
  const history = useHistory();
  const [info, setInfo] = useState({
    description: "",
    address: "",
    contact: "",
  });
  const [openday, setOpenday] = useState({
    monday: {
      type: "",
      start: "",
      end: "",
    },
    tuesday: {
      type: "",
      start: "",
      end: "",
    },
    wednesday: {
      type: "",
      start: "",
      end: "",
    },
    thursday: {
      type: "",
      start: "",
      end: "",
    },
    friday: {
      type: "",
      start: "",
      end: "",
    },
    saturday: {
      type: "",
      start: "",
      end: "",
    },
    sunday: {
      type: "",
      start: "",
      end: "",
    },
  });

  const onChangeInfo = (event) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  };

  const onChangeMonday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      monday: {
        ...openday.monday,
        [name]: value,
      },
    });
  };
  const onChangeTuesday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      tuesday: {
        ...openday.tuesday,
        [name]: value,
      },
    });
  };
  const onChangeWednesday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      wednesday: {
        ...openday.wednesday,
        [name]: value,
      },
    });
  };

  const onChangeThursday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      thursday: {
        ...openday.thursday,
        [name]: value,
      },
    });
  };
  const onChangeFriday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      friday: {
        ...openday.friday,
        [name]: value,
      },
    });
  };

  const onChangeSaturday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      saturday: {
        ...openday.saturday,
        [name]: value,
      },
    });
  };

  const onChangesunday = (event) => {
    const { name, value } = event.target;
    setOpenday({
      ...openday,
      sunday: {
        ...openday.sunday,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
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
                    value={info.description}
                    onChange={onChangeInfo}
                    name="description"
                    id="description"
                    autoComplete="description"
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
                    value={info.address}
                    onChange={onChangeInfo}
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
                    name="contact"
                    id="contact"
                    value={info.contact}
                    onChange={onChangeInfo}
                    autoComplete="contact"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                  />
                </div>

                <Openday
                  openday={openday}
                  onChangeMonday={onChangeMonday}
                  onChangeTuesday={onChangeTuesday}
                  onChangeWednesday={onChangeWednesday}
                  onChangeThursday={onChangeThursday}
                  onChangeFriday={onChangeFriday}
                  onChangeSaturday={onChangeSaturday}
                  onChangesunday={onChangesunday}
                />
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
