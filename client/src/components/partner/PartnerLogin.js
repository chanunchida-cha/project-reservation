import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../Store/partnerStore";
import { useHistory } from "react-router-dom";

const PartnerLogin = observer(() => {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { username, password } = login;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setLogin((prevLog) => {
      return {
        ...prevLog,
        [name]: value,
      };
    });
  }
  async function submitForm(event) {
    event.preventDefault();
    await partnerStore.loginPartner(login);
    history.push("/partner");
  }

  return (
    <div className="m-20 flex justify-center">
      <div className=" bg-[#FAFAFA] pt-10 sm:p-10 xl:p-20 xl:px-40 w-full sm:w-full xl:w-3/5 rounded-md">
        <div className="grid place-items-center">
          <div>
            <h4 className="font-medium text-xl">เข้าสู่ระบบ</h4>
          </div>
          <form onSubmit={submitForm}>
            <div className="w-full">
              <label htmlFor="email-address">ยูสเซอร์เนม</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="กรุณากรอกยูสเซอร์เนมของคุณ"
                value={username}
                onChange={onChangeInput}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="กรุณากรอกรหัสผ่านของคุณ"
                value={password}
                onChange={onChangeInput}
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#ff5f62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-white group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default PartnerLogin;
