import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const MyProfile = observer(() => {
  const history = useHistory();
  return (
    <div>
      <div className="mx-10 py-3 sm:px-6">
        <div className="mt-3 md:mt-0 md:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="grid grid-cols-2 ">
              <div className="px-4 py-3 sm:px-6   ">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  โปรไฟล์
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Profile.</p>
              </div>
              <div className="px-4 py-3 text-right">
                <button className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                onClick={()=>{
                  history.push("/myprofile/edit")
                }}
                >
                  {<EditOutlined />}
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    ชื่อ-นามสกุล:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {`${userStore.customer.firstname}  ${userStore.customer.lastname}`}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    เบอร์โทรศัพท์
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userStore.customer.phoneNumber}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userStore.customer.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userStore.customer.username}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyProfile;
