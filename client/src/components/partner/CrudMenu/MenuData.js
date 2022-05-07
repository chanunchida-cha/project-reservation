import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { partnerStore } from "../partnerStore";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const MenuData = observer(() => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  useEffect(async() => {
   await partnerStore.getMenuByRest(id);
  }, []);

  const menus = partnerStore.menus;
  const isMenu = menus.length == 0;

  const confirmDelete = (menu_id, id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        partnerStore.deleteMenu(menu_id, id);
      }
    });
  };

  return (
    <div>
      <div className="ml-200">
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            ข้อมูลเมนูอาหาร
          </h3>
          <div className="border-t border-gray-300" />

          <div className="mb-2 mt-2 ">
            <Button
              className="text-base"
              type="primary"
              onClick={() => {
                history.push(`/partner/createmenu/${id}`);
              }}
            >
              เพิ่มข้อมูลเมนูอาหาร
            </Button>
          </div>
          {isMenu && (
            <div className="mb-2 mt-3  text-red-500">
              ** คุณยังไม่มีเมนูอาหาร กรุณาเพิ่มเมนูอาหาร **
            </div>
          )}
        </div>

        {menus.map((menu) => {
          return (
            <div
              key={menu._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
            >
              <div className="grid grid-cols-2 ">
                <div className="px-4 py-3 sm:px-6   ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                    <Link to={`/partner/menu/${menu._id}`}>
                      เมนู {menu.name}
                    </Link>
                  </h3>
                </div>
                <div className="px-4 py-3 text-right">
                  <Button
                    className="text-base  mr-3"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      history.push(`/partner/editmenu/${menu._id}`);
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
                      confirmDelete(menu._id, id);
                    }}
                  >
                    {<DeleteOutlined />}
                  </Button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className=" bg-gray-50 px-4 py-3 sm:px-6  align-middle  ">
                  <dt className="text-sm font-medium text-gray-900"></dt>
                  <img
                    className=" align-center mt-4 rounded object-cover h-48 w-96"
                    src={`http://localhost:5500/uploads/${menu.image}`}
                  />
                </div>
                <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      คำอธิบาย
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {menu.description}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ราคา</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {menu.price} บาท
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
export default MenuData;
