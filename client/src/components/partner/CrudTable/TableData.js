import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { partnerStore } from "../../Store/partnerStore";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const TableData = observer(() => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    await partnerStore.getTableByRest(id);
  }, []);

  const confirmDelete = (table_id, id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        partnerStore.deleteTable(table_id, id);
      }
    });
  };
  console.log(partnerStore.tables);
  const isTable = partnerStore.tables.length > 0;

  return (
    <div className="mt-3 md:mt-0 md:col-span-2">
      <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
        ข้อมูลโต๊ะอาหาร
      </h3>
      <div className="border-t border-gray-300" />
      <div className="mb-2 mt-2">
        <button
          onClick={() => {
            history.push(`/partner/createtable/${id}`);
          }}
          className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
        >
          เพิ่มข้อมูลโต๊ะอาหาร
        </button>
      </div>
      {isTable && (
        <div className="shadow mt-4  overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <div className="text-gray-500">
              **หมายเหตุ สีเขียว = ว่าง , สีแดง = ไม่ว่าง
            </div>
            <div className="grid grid-cols-1 mt-3 gap-4 sm:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-4 ">
              {partnerStore.tables.map((table) => {
                return (
                  <div
                    key={table._id}
                    className=" inline-flex rounded-lg bg-white shadow-md overflow-hidden"
                  >
                    <div className={"p-4 bg-[#00B5B4] "}>
                      <div className=" uppercase tracking-wider text-sm">
                        โต๊ะ
                      </div>
                      <div className=" text-lg">{table.table_no}</div>
                    </div>
                    <div className="pl-4 py-2 ">
                      <div className="text-base ">
                        จำนวนที่นั่ง {table.seat}
                      </div>
                    </div>
                    <div className="flex justify-end items-end pb-2 pr-5 pl-5">
                      <button
                        onClick={() => {
                          history.push(`/partner/edittable/${table._id}`);
                        }}
                        className=" p-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                      >
                        {<EditOutlined />}
                      </button>
                      <button
                        onClick={() => {
                          confirmDelete(table._id, id);
                        }}
                        className=" p-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f] "
                      >
                        {<DeleteOutlined />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
export default TableData;
