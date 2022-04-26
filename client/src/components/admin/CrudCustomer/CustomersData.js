import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { adminStore } from "../adminStore";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const CustomersData = observer(() => {
  const history = useHistory();

  useEffect(() => {
    adminStore.getCustomersData();
  }, []);
  const customers = adminStore.customers;

  const confirmDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        adminStore.deleteCustomer(id);
      }
    });
  };

  return (
    <div>
      <div className="ml-200">
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            ข้อมูลลูกค้า
          </h3>
          <div className="border-t border-gray-300" />

          <div className="mb-2 mt-2 ">
            <Button
              className="text-base"
              type="primary"
              onClick={() => {
                history.push("/admin/createcustomer");
              }}
            >
              เพิ่มข้อมูลลูกค้า
            </Button>
          </div>
        </div>
        {customers.map((customer) => {
          return (
            <div
              key={customer._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
            >
              <div className="grid grid-cols-2 ">
                <div className="px-4 py-3 sm:px-6   ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                    <Link to={`/admin/customersdata/${customer._id}`}>
                      คุณ {`${customer.firstname}  ${customer.lastname}`}
                    </Link>
                  </h3>
                </div>
                <div className="px-4 py-3 text-right">
                  <Button
                    className="text-base  mr-3"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      history.push(`/admin/editcustomer/${customer._id}`);
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
                      confirmDelete(customer._id);
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
                      {`${customer.firstname}  ${customer.lastname}`}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">อีเมล</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customer.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      เบอร์โทรศัพท์
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {customer.phoneNumber}
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

export default CustomersData;
