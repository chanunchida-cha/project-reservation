import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { adminStore } from "../../Store/adminStore";
import { useParams } from "react-router-dom";

const EditCustomer = observer(() => {
  const { id } = useParams();
  const [info, setInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
  });
  useEffect(async () => {
    await adminStore.getCustomerById(id);
    setInfo({
      username: adminStore.customer.username,
      firstname: adminStore.customer.firstname,
      lastname: adminStore.customer.lastname,
      email: adminStore.customer.email,
      phoneNumber: adminStore.customer.phoneNumber,
      password: adminStore.customer.password,
      confirmPass: adminStore.customer.confirmPass,
    });
  }, []);

  console.log("info", info);

  function onChangeInput(event) {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }
  const {
    username,
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
    confirmPass,
  } = info;

  function editCustomerSubmit(e) {
    e.preventDefault();
    adminStore.editCustomer(id, info);
  }

  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          แก้ไขข้อมูลลูกค้า
        </h3>
        <form onSubmit={editCustomerSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                    disabled
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                    disabled
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
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-lg border-gray-300 rounded-md"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                แก้ไขข้อมูลลูกค้า
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditCustomer;
