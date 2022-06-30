import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "../../Store/adminStore";
import { useHistory } from "react-router-dom";

const CreatePartner = observer(() => {
  const history = useHistory();
  const [partner, setPartner] = useState({
    restaurantName: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    confirmPass: "",
  });
  const {
    restaurantName,
    firstname,
    lastname,
    email,
    phoneNumber,
    address,
    username,
    password,
    confirmPass,
  } = partner;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setPartner((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  async function createPartner(event) {
    event.preventDefault();
    await adminStore.createPartner(partner);

    setPartner({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPass: "",
    });
    history.push("/admin/partnerverify");
  }

  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          เพิ่มข้อมูลร้านอาหาร
        </h3>
        <form onSubmit={createPartner}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อร้านอาหาร
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    id="restaurantName"
                    autoComplete="restaurantName"
                    value={restaurantName}
                    onChange={onChangeInput}
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    onChange={onChangeInput}
                    autoComplete="given-name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeInput}
                    id="lastname"
                    autoComplete="family-name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={onChangeInput}
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    อีเมล
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeInput}
                    id="email"
                    autoComplete="email"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onChangeInput}
                    id="phoneNumber"
                    autoComplete="phonenumber"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangeInput}
                    id="password"
                    autoComplete="password"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ยืนยันรหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="confirmPass"
                    value={confirmPass}
                    onChange={onChangeInput}
                    id="confirmPass"
                    autoComplete="confirmPass"
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
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={onChangeInput}
                    id="address"
                    autoComplete="address"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                เพิ่มข้อมูลร้านอาหาร
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default CreatePartner;
