import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { reservStore } from "../../Store/reservStore";
import Swal from "sweetalert2";

const ReservAllDayAllData = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    reservStore.getAllday(id);
  }, []);
  const confirmDelete = (reserv_id, partner_id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.allDayDalete(reserv_id, partner_id);
      }
    });
  };

  console.log(reservStore.allDayReserv);
  return (
    <div>
      <div className="px-4 py-3 sm:px-6">
        <div className="">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-md font-semibold text-gray-700 uppercase tracking-wider">
                        วัน/เดือน/ปี
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-md font-semibold text-gray-700 uppercase tracking-wider">
                        เวลา
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-md font-semibold text-gray-700 uppercase tracking-wider">
                        จำนวนคน
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-md font-semibold text-gray-700 uppercase tracking-wider">
                        โต๊ะ
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-md font-semibold text-gray-700 uppercase tracking-wider">
                        ชื่อ-นามสกุล
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservStore.allDayReserv.map((reserv, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {new Date(reserv.day).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${reserv.start} - ${reserv.end}`}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.amount}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.table}
                            </p>
                          </td>
                          {reserv.self_reserv && (
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {`${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                              </p>
                            </td>
                          )}
                          {reserv.customer.length > 0 && (
                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {reserv.customer.map((customer) => {
                                  return `${customer.firstname}  ${customer.lastname} `;
                                })}
                              </p>
                            </td>
                          )}
                          <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm ">
                            <button
                              className="py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff]"
                              onClick={() => {
                                history.push(
                                  `/partner/reservationdata/allday/edit/${id}/${reserv._id}`
                                );
                              }}
                            >
                              แก้ไข
                            </button>
                            <button
                              className="py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f]"
                              onClick={() => {
                                confirmDelete(reserv._id, id);
                              }}
                            >
                              ลบ
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ReservAllDayAllData;
