import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../Store/partnerStore";

const PartnerRegis = observer(() => {
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

  async function registerSubmit(event) {
    event.preventDefault();
    await partnerStore.createPartner(partner);
  }

  return (
    <div className="m-20  flex justify-center">
      <div className=" bg-[#FAFAFA] pt-5 sm:p-5 xl:p-10 xl:px-20 w-full sm:w-full xl:w-3/5 rounded-md">
        <div className="grid place-items-center">
          <div>
            <h4 className="font-medium text-xl">สมัครพาร์ทเนอร์</h4>
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
              <label htmlFor="restaurantName">ชื่อร้านอาหาร:</label>
              <input
                type="text"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="ชื่อร้านอาหาร"
                name="restaurantName"
                value={restaurantName}
                onChange={onChangeInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">ที่อยู่:</label>
              <input
                type="text"
                className="appearance-none border-2 border-[#ececec] rounded w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-[#f7b9ba]"
                placeholder="ที่อยู่"
                name="address"
                value={address}
                onChange={onChangeInput}
                required
              />
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

export default PartnerRegis;
