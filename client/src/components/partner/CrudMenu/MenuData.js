import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { partnerStore } from "../../Store/partnerStore";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import SearchText from "../../SearchText/SearchText";

const MenuData = observer(() => {
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  useEffect(async () => {
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
            <button
              onClick={() => {
                history.push(`/partner/createmenu/${id}`);
              }}
              className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
            >
              เพิ่มข้อมูลเมนูอาหาร
            </button>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 sm:col-span-3">
              <SearchText value={searchText} onChangeValue={setSearchText} />
            </div>
          </div>
          {isMenu && (
            <div className="mb-2 mt-3  text-red-500">
              ** คุณยังไม่มีเมนูอาหาร กรุณาเพิ่มเมนูอาหาร **
            </div>
          )}
        </div>

        {menus
          .filter((menu) => {
            return menu.name.includes(searchText);
          })
          .map((menu) => {
            return (
              <div
                key={menu._id}
                className="bg-white mx-4 shadow overflow-hidden sm:rounded-lg mb-6"
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
                    <button
                      onClick={() => {
                        history.push(`/partner/editmenu/${menu._id}`);
                      }}
                      className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                    >
                      {<EditOutlined />}
                    </button>
                    <button
                      onClick={() => {
                        confirmDelete(menu._id, id);
                      }}
                      className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f] "
                    >
                      {<DeleteOutlined />}
                    </button>
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
                      <dt className="text-sm font-medium text-gray-500">
                        ราคา
                      </dt>
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
