import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Radio, Button } from "antd";
import { partnerStore } from "./partnerStore";
import { useParams, useHistory } from "react-router-dom";
import EditOpenday from "./EditOpenday";

const startOpenday = {
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
};
const EditInformation = observer(() => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  const partner_id = partnerStore.partnerlogin._id;
  const [info, setInfo] = useState({
    description: "",
    address: "",
    contact: "",
  });
  const { description, address, contact } = info;
  const [openday, setOpenday] = useState(startOpenday);
  useEffect(async () => {
    await partnerStore.getInformation(id);
    partnerStore.partnerInfo.map((info) => {
      return (
        setInfo({
          description: info.description,
          address: info.address,
          contact: info.contact,
        }),
        setOpenday({
          monday: {
            type: info.openday.monday.type,
            start: info.openday.monday.start,
            end: info.openday.monday.end,
          },
          tuesday: {
            type: info.openday.tuesday.type,
            start: info.openday.tuesday.start,
            end: info.openday.tuesday.end,
          },
          wednesday: {
            type: info.openday.wednesday.type,
            start: info.openday.wednesday.start,
            end: info.openday.wednesday.end,
          },
          thursday: {
            type: info.openday.thursday.type,
            start: info.openday.thursday.start,
            end: info.openday.thursday.end,
          },
          friday: {
            type: info.openday.friday.type,
            start: info.openday.friday.start,
            end: info.openday.friday.end,
          },
          saturday: {
            type: info.openday.saturday.type,
            start: info.openday.saturday.start,
            end: info.openday.saturday.end,
          },
          sunday: {
            type: info.openday.sunday.type,
            start: info.openday.sunday.start,
            end: info.openday.sunday.end,
          },
        })
      );
    });
  }, []);

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

  const infoId = partnerStore.partnerInfo.map((info) => {
    return info._id;
  });
  const infoIdString = infoId.toString();
  console.log(infoIdString);

  async function updateInformation(event) {
    event.preventDefault();
    await partnerStore.updateInformation(infoIdString, info, openday);
    partnerStore.getInformation(id);
    history.push(`/partner/information/${id}`);
  }
  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          แก้ไขข้อมูลทั่วไปของร้านอาหาร
        </h3>
        <form onSubmit={updateInformation}>
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
                    value={description}
                    onChange={onChangeInfo}
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
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
                    value={address}
                    onChange={onChangeInfo}
                    autoComplete="address"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
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
                    value={contact}
                    onChange={onChangeInfo}
                    autoComplete="contact"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <EditOpenday
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

export default EditInformation;
