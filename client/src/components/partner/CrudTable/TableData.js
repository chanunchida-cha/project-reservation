import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { partnerStore } from "../partnerStore";
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
        <Button
          className="text-base rounded-md"
          type="primary"
          onClick={() => {
            history.push(`/partner/createtable/${id}`);
          }}
        >
          เพิ่มข้อมูลเมนูอาหาร
        </Button>
      </div>
      {isTable && (
        <div className="shadow  overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <div className="grid grid-cols-1 mt-3 gap-4 sm:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-4 ">
              {partnerStore.tables.map((table) => {
                return (
                  <div>
                    <div class=" inline-flex rounded-lg bg-white shadow-md overflow-hidden">
                      <div
                        class={
                          table.status === "free"
                            ? "p-4 bg-[#00B5B4] "
                            : "p-4 bg-[#db3b2d] "
                        }
                      >
                        <div class=" uppercase tracking-wider text-sm">
                          โต๊ะ
                        </div>
                        <div class=" text-lg">{table.table_no}</div>
                      </div>
                      <div class="pl-4 py-2 ">
                        <div class="text-base ">จำนวนที่นั่ง {table.seat}</div>
                        <div class="text-sm text-gray-600 ">
                          {table.description}
                        </div>
                      </div>
                      <div class="flex justify-end items-end pb-2 pr-5 pl-2">
                        <Button
                          className="text-sm  mr-3"
                          type="primary"
                          htmlType="submit"
                          size="small"
                          onClick={() => {
                            history.push(`/partner/edittable/${table._id}`);
                          }}
                        >
                          {<EditOutlined />}
                        </Button>
                        <Button
                          className="text-sm"
                          type="primary"
                          size="small"
                          danger
                          htmlType="submit"
                          onClick={() => {
                            confirmDelete(table._id, id);
                          }}
                        >
                          {<DeleteOutlined />}
                        </Button>
                      </div>
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
