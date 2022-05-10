import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "../adminStore";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import SearchText from "../../SearchText/SearchText";

const PartnerVerify = observer(() => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    adminStore.getPartnerVarify();
  }, []);

  const partners = adminStore.partners;
  console.log(partners);
  const confirmDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        adminStore.deletePartner(id);
      }
    });
  };

  return (
    <div className="ml-200">
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ข้อมูลร้านอาหารรอการตรวจสอบ
        </h3>
        <div className="border-t border-gray-300" />
        <div className="mb-2 mt-2 ">
          <Button
            className="text-base"
            type="primary"
            onClick={() => {
              history.push("/admin/createpartner");
            }}
          >
            เพิ่มข้อมูลร้านอาหาร
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <SearchText value={searchText} onChangeValue={setSearchText} />
          </div>
        </div>
      </div>
      {partners
        .filter((partner) => {
          return partner.restaurantName.includes(searchText);
        })
        .map((partner) => {
          return (
            <div
              key={partner._id}
              className="bg-white shadow overflow-hidden mx-4 sm:rounded-lg mb-6"
            >
              <div className="grid grid-cols-2 ">
                <div className="px-4 py-3 sm:px-6   ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                    <Link to={`/admin/partner/${partner._id}`}>
                      ร้าน{partner.restaurantName}
                    </Link>
                  </h3>
                </div>
                <div className="px-4 py-3 text-right">
                  <Button
                    className="text-base  mr-3"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      history.push(`/admin/editpartner/${partner._id}`);
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
                      confirmDelete(partner._id);
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
                      {`${partner.firstname}  ${partner.lastname}`}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      เบอร์โทรศัพท์
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partner.phoneNumber}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
    </div>
  );
});

export default PartnerVerify;
