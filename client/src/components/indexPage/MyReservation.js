import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { partnerStore } from "../Store/partnerStore";
import { reservStore } from "../Store/reservStore";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const MyReservation = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const { partner_id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    const getReserv = async () => {
      if (type === "rounds") {
        await reservStore.getRoundById(id);
      }
      await reservStore.getAlldayById(id);
    };
    getReserv();
    const getInfoData = async () => {
      await partnerStore.getInformation(partner_id);
    };
    getInfoData();
  }, []);

  console.log(type);

  const confirmUpdateStatus = (reserv_id, partner_id, status, type) => {
    console.log(reserv_id);
    console.log(status);
    Swal.fire({
      title: "ยืนยันยกเลิกการจอง",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        if (type === "allDay") {
          reservStore.updateStatusAllDay(reserv_id, partner_id, status);
        } else {
          reservStore.updateStatusRound(reserv_id, partner_id, status);
        }
      }
    });
  };
  return (
    <div className="mt-20 mx-full sm:mt-32 sm:mx-96 md:mt-32 md:mx-20 lg:mt-32 lg:mx-96 ">
      {(type === "allDay"
        ? reservStore.allDayReservById
        : reservStore.roundReservById
      ).map((reserv) => {
        return partnerStore.partnerInfo.map((partnerInfo) => {
         
            return (
              <div
                className="bg-white shadow overflow-hidden sm:bg-white sm:shadow sm:overflow-hidden sm:rounded-lg "
                key={partnerInfo._id}
              >
                <div
                  className={
                    reserv.status === "cancel"
                      ? "px-4 bg-[#5c5959] py-4 sm:px-6"
                      : "px-4 bg-[#1890ff] py-4 sm:px-6"
                  }
                >
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {reserv.status === "cancel"
                      ? "การจองถูกยกเลิก"
                      : "ยืนยันการจอง"}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-white">
                    {reserv.status === "cancel"
                      ? null
                      : "** กรุณาแสดงหน้ารายละเอียดการจองนี้แก่ร้านอาหาร **"}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <div className="px-4 py-2 text-base  sm:px-4">
                    รายละเอียดการจอง
                  </div>
                  <div className="px-4 py-2  sm:px-4">
                    {`ร้าน${partnerInfo.information.restaurantName}`}
                  </div>
                  <div className="px-4 py-2   sm:px-4">{`หมายเลขการจอง: ${reserv.reservNumber}`}</div>
                  {reserv.self_reserv && (
                    <>
                      <div className="px-4 py-2   sm:px-4">
                        {`ชื่อ-นามสกุล: ${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                      </div>
                      <div className="px-4 py-2   sm:px-4">
                        {`เบอร์โทรศัพท์: ${reserv.self_reserv.phoneNumber} `}
                      </div>
                    </>
                  )}
                  {reserv.customer.length > 0 && (
                    <div className="px-4 py-2   sm:px-4">
                      {reserv.customer.map((customer) => {
                        return `ชื่อ-นามสกุล: ${customer.firstname}  ${customer.lastname} `;
                      })}
                    </div>
                  )}
                  <div className="px-4 py-2   sm:px-4">{`วัน/เดือน/ปี:  ${new Date(
                    reserv.day
                  ).toLocaleDateString("en-GB")}`}</div>
                  <div className="px-4 py-2   sm:px-4">{`เวลา:   ${reserv.start} - ${reserv.end}`}</div>
                  <div className="px-4 py-2   sm:px-4">{`จำนวน:   ${reserv.amount}`}</div>
                  <div className="px-4 py-2  sm:px-4 text-gray-500">{`ติดต่อสอบถาม  ${partnerInfo.contact}`}</div>
                  <div className="px-4 py-2 grid grid-cols-3 sm:px-4">
                    <div className="col-span-12 col-start-1 flex  justify-start">
                      <button
                        disabled={reserv.status === "cancel"}
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f] disabled:opacity-75 disabled:bg-gray-300"
                        onClick={() => {
                          confirmUpdateStatus(
                            reserv._id,
                            partner_id,
                            "cancel",
                            type
                          );
                        }}
                      >
                        ยกเลิกการจอง
                      </button>
                    </div>
                    <div className="border-t col-span-12 my-2"></div>
                    <div className="col-span-12 col-start-1 flex  justify-end">
                      <button
                        disabled={reserv.status === "cancel"}
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] disabled:opacity-75 disabled:bg-gray-300"
                        onClick={() => {
                          history.push(
                            `/editmyreservation/${type}/${reserv.partner_id}/${reserv._id} `
                          );
                        }}
                      >
                        แก้ไขข้อมูลการจอง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
    
      })}
    </div>
  );
});

export default MyReservation;
