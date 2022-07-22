import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { partnerStore } from "../Store/partnerStore";
import { reservStore } from "../Store/reservStore";

const ModalHistoryById = observer(
  ({ setModal, type, reserv_id, partner_id }) => {
    useEffect(() => {
      const getReserv = async () => {
        if (type === "rounds") {
          await reservStore.getRoundById(reserv_id);
        }
        await reservStore.getAlldayById(reserv_id);
      };
      getReserv();
      const getInfoData = async () => {
        await partnerStore.getInformation(partner_id);
      };
      getInfoData();
    }, []);
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => {
          setModal(false);
        }}
      >
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              {(type === "allDay"
                ? reservStore.allDayReservById
                : reservStore.roundReservById
              ).map((reserv) => {
                return partnerStore.partnerInfo.map((partnerInfo) => {
                  return partnerInfo.information.map((info) => {
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
                            {`ร้าน${info.restaurantName}`}
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
                        </div>
                      </div>
                    );
                  });
                });
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ModalHistoryById;
