import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "../adminStore";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import SearchText from "../../SearchText/SearchText";

const AdminsData = observer(() => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    adminStore.getAdminsData();
  }, []);
  const admins = adminStore.admins;

  const confirmDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        adminStore.deleteAdmin(id);
      }
    });
  };

  return (
    <div>
      <div className="ml-200">
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            ข้อมูลผู้ดูแลระบบ
          </h3>
          <div className="border-t border-gray-300" />

          <div className="mb-2 mt-2 ">
            <Button
              className="text-base"
              type="primary"
              onClick={() => {
                history.push("/admin/createadmin");
              }}
            >
              เพิ่มข้อมูลผู้ดูแลระบบ
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <SearchText value={searchText} onChangeValue={setSearchText} />
          </div>
        </div>
        </div>
        {admins.filter((admin)=>{
            return admin.firstname.includes(searchText);
        }).map((admin) => {
          return (
            <div
              key={admin._id}
              className="bg-white mx-4 shadow overflow-hidden sm:rounded-lg mb-6"
            >
              <div className="grid grid-cols-2 ">
                <div className="px-4 py-3 sm:px-6   ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                    <Link to={`/admin/adminsdata/${admin._id}`}>
                      คุณ {`${admin.firstname}  ${admin.lastname}`}
                    </Link>
                  </h3>
                </div>
                <div className="px-4 py-3 text-right">
                  <Button
                    className="text-base  mr-3"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      history.push(`/admin/editadmin/${admin._id}`);
                    }}
                  >
                    {<EditOutlined />}
                  </Button>
                  <Button
                    className="text-base"
                    type="primary"
                    danger
                    htmlType="submit"
                    onClick={() => {
                      confirmDelete(admin._id);
                    }}
                  >
                    {<DeleteOutlined />}
                  </Button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      ชื่อ-นามสกุล
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {`${admin.firstname}  ${admin.lastname}`}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">อีเมล</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {admin.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      เบอร์โทรศัพท์
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {admin.phoneNumber}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200" />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default AdminsData;
