import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { reservStore } from "../../Store/reservStore";
import Swal from "sweetalert2";

const initialStatus = ["pending", "arrived", "check out", "cancel"];
const ReservRoundAllData = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    reservStore.getRound(id);
  }, []);

  const confirmDelete = (reserv_id, partner_id) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.RoundDalete(reserv_id, partner_id);
      }
    });
  };

  const confirmUpdateStatus = (reserv_id, partner_id, status) => {
    console.log(reserv_id);
    console.log(status);
    Swal.fire({
      title: "ยืนยันการแก้ไขสถานะ",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.updateStatusRound(reserv_id, partner_id, status);
      }
    });
  };
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
                    <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        หมายเลขการจอง
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        วัน/เดือน/ปี
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        เวลา
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        จำนวนคน
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        โต๊ะ
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        ชื่อ-นามสกุล
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                        สถานะ
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservStore.roundReserv.map((reserv, index) => {
                      return (
                        <tr key={index}>
                            <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.reservNumber}
                            </p>
                          </td>
                          <td className="px-3 py-2 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap ">
                              {new Date(reserv.day).toLocaleDateString("en-GB")}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${reserv.start} - ${reserv.end}`}
                            </p>
                          </td>
                          <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.amount}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.table.map((table) => {
                                return `${table} `;
                              })}
                            </p>
                          </td>
                          {reserv.self_reserv && (
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {`${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                              </p>
                            </td>
                          )}
                          {reserv.customer.length > 0 && (
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {reserv.customer.map((customer) => {
                                  return `${customer.firstname}  ${customer.lastname} `;
                                })}
                              </p>
                            </td>
                          )}
                          <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm text-center ">
                            {initialStatus.map((initialStatus, index) => {
                              return (
                                <button
                                  key={index}
                                  name={initialStatus}
                                  value={initialStatus}
                                  id={reserv._id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // setStatus(initialStatus);

                                    confirmUpdateStatus(
                                      reserv._id,
                                      id,
                                      initialStatus
                                    );
                                  }}
                                  className={
                                    initialStatus === reserv.status
                                      ? "py-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff]"
                                      : "py-1 px-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#ffffff] hover:bg-[#d5d5d5] "
                                  }
                                >
                                  {initialStatus}
                                </button>
                              );
                            })}
                          </td>
                          <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm ">
                            <button
                              className="py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff]"
                              onClick={() => {
                                history.push(
                                  `/partner/reservationdata/round/edit/${id}/${reserv._id}`
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
export default ReservRoundAllData;