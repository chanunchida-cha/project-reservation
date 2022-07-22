import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { useHistory, useParams } from "react-router-dom";
import ModalHistoryById from "./ModalHistoryById";

const HistoryReservation = observer(() => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState("");
  const [reserv_id, setReserv_id] = useState("");
  const [partner_id, setPartner_id] = useState("");
  useEffect(() => {
    const getReserv = async () => {
      await userStore.getAllDayReservPending(id);
      await userStore.getAllDayReservArrived(id);
      await userStore.getAllDayReservHistory(id);
      await userStore.getRoundReservPending(id);
      await userStore.getRoundReservArrived(id);
      await userStore.getRoundReservHistory(id);
    };
    getReserv();
  }, []);

  console.log(userStore.allDayReservPending);
  console.log(modal);
  console.log(reserv_id);
  if (modal) {
    return (
      <ModalHistoryById
        setModal={setModal}
        type={type}
        reserv_id={reserv_id}
        partner_id={partner_id}
      />
    );
  }
  return (
    <div className="bg-white ">
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div>
          <h4 class="text-xl font-extrabold tracking-tight text-gray-900 px-4 sm:text-2xl">
            การจองของฉัน
          </h4>
          <div className="grid grid-cols-4 md:grid md:grid-cols-4 bg-white  rounded-md px-4 py-4 w-96">
            <div className="col-span-2 font-semibold">ชื่อ - นามสกุล</div>
            <div className="col-span-2">
              {`${userStore.customer.firstname}  ${userStore.customer.lastname}`}
            </div>
            <div className="col-span-2 font-semibold">อีเมลล์</div>
            <div className="col-span-2 ">{`${userStore.customer.email}`}</div>
            <div className="col-span-2 font-semibold">เบอร์โทรศัพท์</div>
            <div className="col-span-2">{`${userStore.customer.phoneNumber}`}</div>
          </div>
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-2 h-full gap-4 sm:gap-6 lg:gap-8 ">
          <div className="col-span-2 bg-[#0b89ff75] rounded-md py-4 px-4">
            <div className=" sm:grid sm:grid-cols-2">
              <div className="col-span-1 text-base font-semibold ">
                จำนวนการจองทั้งหมด
              </div>
              <div className="col-span-1 text-base font-semibold flex justify-end ">
                {userStore.allDayHistory.length + userStore.roundHistory.length}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 border-t border-gray-200 ">
          <div className="col-span-2 pt-4 font-semibold">
            การจองที่กำลังจะเกิดขึ้น
          </div>
          {userStore.allDayReservPending.length === 0 &&
            userStore.roundReservPending.length === 0 && (
              <div className="text-red-500">ไม่มีการจองที่กำลังจะเกิดขึ้น</div>
            )}
          {(userStore.allDayReservPending.length > 0 ||
            userStore.roundReservPending.length > 0) && (
            <div className="col-span-1">
              {userStore.allDayReservPending.map((reserv) => {
                return reserv.partner.map((partner) => {
                  return (
                    <div
                      className="hover:bg-gray-50 shadow-md my-2 px-4 py-4"
                      onClick={() => {
                        setModal(true);
                        setType("allDay");
                        setReserv_id(reserv._id);
                        setPartner_id(partner._id);
                      }}
                    >
                      <div className="font-semibold">
                        {partner.restaurantName}
                      </div>
                      <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                      <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                        "en-GB"
                      )}`}</div>
                      <div>{reserv.amount} ที่นั่ง</div>
                      <div>{reserv.status}</div>
                    </div>
                  );
                });
              })}
            </div>
          )}
          <div className="col-span-1 ">
            {userStore.roundReservPending.map((reserv) => {
              return reserv.partner.map((partner) => {
                return (
                  <div
                    className=" hover:bg-gray-50  rounded-md shadow-md my-4 px-4 py-4"
                    onClick={() => {
                      setModal(true);
                      setType("rounds");
                      setReserv_id(reserv._id);
                      setPartner_id(partner._id);
                    }}
                  >
                    <div className="font-semibold">
                      {partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.amount} ที่นั่ง</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold">การจองที่กำลังดำเนินอยู่</div>
          <div className="col-span-2 pt-4">
            {userStore.allDayReservArrived.length === 0 &&
              userStore.roundReservArrived.length === 0 && (
                <div className="text-red-500">
                  ***ไม่มีการจองที่กำลังดำเนินอยู่***
                </div>
              )}
          </div>
          <div className="col-span-1">
            {userStore.allDayReservArrived.map((reserv) => {
              return reserv.partner.map((partner) => {
                return (
                  <div
                    className="hover:bg-gray-50 shadow-md my-2 px-4 py-4"
                    onClick={() => {
                      setModal(true);
                      setType("allDay");
                      setReserv_id(reserv._id);
                      setPartner_id(partner._id);
                    }}
                  >
                    <div className="font-semibold">
                      {partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              });
            })}
          </div>
          <div className="col-span-1 ">
            {userStore.roundReservArrived.map((reserv) => {
              return reserv.partner.map((partner) => {
                return (
                  <div
                    className="hover:bg-gray-50 rounded-md shadow-md my-4 px-4 py-4"
                    onClick={() => {
                      setModal(true);
                      setType("rounds");
                      setReserv_id(reserv._id);
                      setPartner_id(partner._id);
                    }}
                  >
                    <div className="font-semibold">
                      {partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold">ประวัติการจอง</div>
          <div className="col-span-2 pt-4">
            {userStore.allDayHistory.length === 0 &&
              userStore.roundHistory.length === 0 && (
                <div className="text-red-500">***ไม่มีประวัติการจอง***</div>
              )}
          </div>
          <div className="col-span-1">
            {userStore.allDayHistory.map((reserv) => {
              return reserv.partner.map((partner) => {
                return (
                  <div
                    className="hover:bg-gray-50 shadow-md my-2 px-4 py-4"
                    onClick={() => {
                      setModal(true);
                      setType("allDay");
                      setReserv_id(reserv._id);
                      setPartner_id(partner._id);
                    }}
                  >
                    <div className="font-semibold">
                      {partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              });
            })}
          </div>
          <div className="col-span-1 ">
            {userStore.roundHistory.map((reserv) => {
              return reserv.partner.map((partner) => {
                return (
                  <div
                    className="hover:bg-gray-50 rounded-md shadow-md my-4 px-4 py-4"
                    onClick={() => {
                      setModal(true);
                      setType("rounds");
                      setReserv_id(reserv._id);
                      setPartner_id(partner._id);
                    }}
                  >
                    <div className="font-semibold">
                      {partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default HistoryReservation;
