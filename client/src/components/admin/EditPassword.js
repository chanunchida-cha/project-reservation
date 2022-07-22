import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "../Store/adminStore";
import { useHistory } from "react-router-dom";

const EditPassword = observer(() => {
  const history = useHistory();
  const [allPassword, setAllPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  function onChangeInput(event) {
    const { name, value } = event.target;
    setAllPassword((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    await adminStore.resetPassword(allPassword);
    history.push("/loginadmin");
  };
  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          แก้ไขรหัสผ่าน
        </h3>
        <form onSubmit={resetPassword}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    รหัสผ่านปัจจุบัน
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={allPassword.oldPassword}
                    onChange={onChangeInput}
                    id="oldPassword"
                    autoComplete="oldPassword"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                 
                  />
                </div>

                <div className="col-span-6 sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    รหัสผ่านใหม่
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={allPassword.newPassword}
                    onChange={onChangeInput}
                    id="newPassword"
                    autoComplete="newPassword"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                 
                  />
                </div>

                <div className="col-span-6 sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ยืนยันรหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={allPassword.confirmPassword}
                    onChange={onChangeInput}
                    id="confirmPassword"
                    autoComplete="confirmPassword"
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
                แก้ไขรหัสผ่าน
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditPassword;
