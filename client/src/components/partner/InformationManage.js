import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Radio, Button } from "antd";
import { partnerStore } from "./partnerStore";
import { useHistory, useParams } from "react-router-dom";
import Openday from "./Openday";

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

const InformationManage = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const partner_id = partnerStore.partnerlogin._id;
  const [info, setInfo] = useState({
    description: "",
    address: "",
    contact: "",
  });
  const [image, setimage] = useState(null);
  const [preview, setPreview] = useState();
  const [imageChange, setImageChange] = useState(false);
  const { description, address, contact } = info;
  const [openday, setOpenday] = useState(startOpenday);

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

  const showPreview = (e) => {
    if (e.target.files[0]) {
      let imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      setImageChange(true);
      setPreview(objectUrl);
      console.log(objectUrl);
      setimage(imageFile);
    } else {
      setimage(image);
    }
  };

  async function createInformation(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("description", description);
    formData.append("partner_id", partner_id);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("image", image);
    formData.append("openday[monday][type]", openday.monday.type);
    formData.append("openday[monday][start]", openday.monday.start);
    formData.append("openday[monday][end]", openday.monday.end);
    formData.append("openday[tuesday][type]", openday.tuesday.type);
    formData.append("openday[tuesday][start]", openday.tuesday.start);
    formData.append("openday[tuesday][end]", openday.tuesday.end);
    formData.append("openday[wednesday][type]", openday.wednesday.type);
    formData.append("openday[wednesday][start]", openday.wednesday.start);
    formData.append("openday[wednesday][end]", openday.wednesday.end);
    formData.append("openday[thursday][type]", openday.thursday.type);
    formData.append("openday[thursday][start]", openday.thursday.start);
    formData.append("openday[thursday][end]", openday.thursday.end);
    formData.append("openday[friday][type]", openday.friday.type);
    formData.append("openday[friday][start]", openday.friday.start);
    formData.append("openday[friday][end]", openday.friday.end);
    formData.append("openday[saturday][type]", openday.saturday.type);
    formData.append("openday[saturday][start]", openday.saturday.start);
    formData.append("openday[saturday][end]", openday.saturday.end);
    formData.append("openday[sunday][type]", openday.sunday.type);
    formData.append("openday[sunday][start]", openday.sunday.start);
    formData.append("openday[sunday][end]", openday.sunday.end);
    await partnerStore.createInformation(formData);
    partnerStore.getInformation(id);
  }

  console.log(image);

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
