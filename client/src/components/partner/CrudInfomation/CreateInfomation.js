import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Radio } from "antd";
import TextField from "@mui/material/TextField";
import { Button } from "antd";
import { partnerStore } from "../partnerStore";
import { useParams } from "react-router-dom";

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

const CreateInfomation = observer(() => {
  const { id } = useParams();
  console.log(id);
  const [info, setInfo] = useState({
    description: "",
    address: "",
    contact: "",
  });

  const [image, setimage] = useState(null);
  const [preview, setPreview] = useState();
  const [openDay, setOpenDay] = useState({
    monday: {
      type: "",
    },
    tuesday: {
      type: "",
    },
    wednesday: {
      type: "",
    },
    thursday: {
      type: "",
    },
    friday: {
      type: "",
    },
    saturday: {
      type: "",
    },
    sunday: {
      type: "",
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

  const showPreview = (e) => {
    if (e.target.files[0]) {
      let imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      console.log(objectUrl);
      setimage(imageFile);
    } else {
      setimage(image);
    }
  };
  console.log(image);
  console.log(openDay);

  const createInformation = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("description", info.description);
    formData.append("partner_id", id);
    formData.append("address", info.address);
    formData.append("contact", info.contact);
    formData.append("image", image);
    for (const day of days) {
      console.log(`openday[${day.key}][type]`);
      formData.append(`openday[${day.key}][type]`, openDay[day.key].type);
      if (openDay[day.key].type === "open") {
        formData.append(`openday[${day.key}][start]`, openDay[day.key].start);
        formData.append(`openday[${day.key}][end]`, openDay[day.key].end);
      }
      console.log(openDay[day.key].type);
    }

    await partnerStore.createInformation(formData);
    partnerStore.getInformation(id);
  };

  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          จัดการข้อมูลทั่วไปของร้านอาหาร
        </h3>
        <form onSubmit={createInformation} encType="multipart/form-data">
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
                    value={info.address}
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
                    value={info.contact}
                    onChange={onChangeInfo}
                    autoComplete="contact"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    รูปภาพร้านอาหาร{" "}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div>
                        {image && (
                          <img
                            src={preview}
                            className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                          />
                        )}
                      </div>

                      {!image && (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <div className=" text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#1890ff] hover:text-[#40a9ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>อัพโหลดรูปภาพ</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            filename="image"
                            className="sr-only"
                            onChange={showPreview}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
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
                                setOpenDay({
                                  ...openDay,
                                  [day.key]: {
                                    type: e.target.value,
                                    start: "",
                                    end: "",
                                  },
                                });
                              } else {
                                setOpenDay({
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
                                  setOpenDay({
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
                                  setOpenDay({
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

export default CreateInfomation;
