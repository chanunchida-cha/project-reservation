import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../partnerStore";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "antd";

const EditTable = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [partnerId, setPartnerId] = useState(null);
  const [table, setTable] = useState({
    table_no: "",
    seat: "",
    description: "",
  });
  useEffect(async () => {
    await partnerStore.getTableById(id);
    return (
      setPartnerId(partnerStore.table.partner_id),
      setTable({
        table_no: partnerStore.table.table_no,
        seat: partnerStore.table.seat,
        description: partnerStore.table.description,
      })
    );
  }, []);
  const onChange = (event) => {
    const { name, value } = event.target;
    setTable((prevTable) => {
      return {
        ...prevTable,
        [name]: value,
      };
    });
  };
  console.log(id);
  console.log(partnerId);
  console.log(table);

  const editTable = async (event) => {
    event.preventDefault();
    await partnerStore.updateTable(id, partnerId, table);
    partnerStore.getTableByRest(partnerId);
    history.push(`/partner/table/${partnerId}`);
  };
  return (
    <div className="mt-3 md:mt-0 md:col-span-2">
      <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
        เพิ่มข้อมูลโต๊ะอาหาร
      </h3>
      <form onSubmit={editTable} encType="multipart/form-data">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
            <div className="grid grid-cols-6 mt-3 gap-6">
              <div className="col-span-2  sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  หมายเลขโต๊ะ
                </label>
                <input
                  type="text"
                  name="table_no"
                  id="table_no"
                  autoComplete="table_no"
                  value={table.table_no}
                  onChange={onChange}
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  จำนวนที่นั่ง
                </label>
                <input
                  type="text"
                  name="seat"
                  id="seat"
                  autoComplete="seat"
                  value={table.seat}
                  onChange={onChange}
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  คำอธิบายเพิ่มเติม
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="description"
                  value={table.description}
                  onChange={onChange}
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Button className="text-base" type="primary" htmlType="submit">
                  บันทึกข้อมูล
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default EditTable;
