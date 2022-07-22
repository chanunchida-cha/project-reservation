import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";

const Register = observer(() => {
  const [info, setInfo] = useState({
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
  } = info;

  function onChangeInput(event) {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  const registerSubmit = async (event) => {
    event.preventDefault();
    await userStore.createUser(info);

    setInfo({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPass: "",
    });
  };

  return (
    <div className="m-5 mt-20 flex justify-center">
      <div className=" bg-[#FAFAFA] pt-5 sm:p-5 xl:p-10 xl:px-20 w-full sm:w-full xl:w-3/5 rounded-md">
        <div className="grid place-items-center">
          <div>
            <h4 className="font-medium text-xl">สมัครสมาชิก</h4>
          </div>
          <form onSubmit={registerSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label htmlFor="firstname">ชื่อ:</label>
                  <input
                    type="text"
                    className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                    placeholder="ชื่อ"
                    name="firstname"
                    value={firstname}
                    onChange={onChangeInput}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastname">นามสกุล:</label>
                  <input
                    type="text"
                    className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                    placeholder="นามสกุล"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeInput}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">username:</label>
              <input
                type="text"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="username"
                name="username"
                value={username}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">เบอร์โทรศัพท์:</label>
              <input
                type="text"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="เบอร์โทรศัพท์"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="รหัสผ่าน"
                name="password"
                value={password}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">ยืนยันรหัสผ่าย:</label>
              <input
                type="password"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="ยืนยันรหัสผ่าน"
                name="confirmPass"
                value={confirmPass}
                onChange={onChangeInput}
                required
              />
            </div>
            <br />
            <div className="mt-3">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Register;
