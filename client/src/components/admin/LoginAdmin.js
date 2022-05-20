import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "./adminStore";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const LoginAdmin = observer(() => {
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
    await adminStore.loginAdmin(login);
    history.push("/admin");
  }
  return (
    <div className=" min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10   bg-white shadow overflow-hidden  sm:rounded-lg p-6">
        <div>
          <h4 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            เข้าสู่ระบบผู้ดูแลระบบ
          </h4>
        </div>
        <form onSubmit={submitForm} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Username"
                value={username}
                onChange={onChangeInput}
              />
            </div>
            <div>
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-blue-400 group-hover:text-blue-300"
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
  );
});
export default LoginAdmin;
