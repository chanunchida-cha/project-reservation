import React, { useState } from "react";
import { adminStore } from "../../Store/adminStore";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

const CreateAdmin = observer(() => {
  const history = useHistory();
  const [admin, setAdmin] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
  });

  const {
    username,
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
    confirmPass,
  } = admin;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => {
      return {
        ...prevAdmin,
        [name]: value,
      };
    });
  }

  async function createAdmin(event) {
    event.preventDefault();
    await adminStore.createAdmin(admin);
    setAdmin({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPass: "",
    });
    await adminStore.getAdminsData();
    history.push("/admin/adminsdata");
  }

  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          เพิ่มข้อมูลผู้ดูแลระบบ
        </h3>
        <form onSubmit={createAdmin}>
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
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                เพิ่มข้อมูลผู้ดูแลระบบ
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default CreateAdmin;
