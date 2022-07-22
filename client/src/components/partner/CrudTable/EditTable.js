import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../../Store/partnerStore";
import { useParams, useHistory } from "react-router-dom";

const EditTable = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [partnerId, setPartnerId] = useState(null);
  const [table, setTable] = useState({
    table_no: "",
    seat: "",
  });
  useEffect(() => {
    const getTables = async () => {
      await partnerStore.getTableById(id);
      return (
        setPartnerId(partnerStore.table.partner_id),
        setTable({
          table_no: partnerStore.table.table_no,
          seat: partnerStore.table.seat,
        })
      );
    };
    getTables();
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
    await partnerStore.updateTable(id, table);
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

              <div>
                <button
                  type="submit"
                  className="  py-2 px-3 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default EditTable;
