import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reservStore } from "../../Store/reservStore";

const SingleAllDayReserv = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    const getSingleAllday = async () => {
      await reservStore.getAlldayById(id);
    };
    getSingleAllday();
  }, []);
  return (
    <>
      <div className="mb-3 ml-6 mt-3">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ข้อมูลคิวการจอง
        </h3>
      </div>
      {reservStore.allDayReservById.map((reserv, index) => {
        return (
          <div
            className="bg-white mx-4 shadow overflow-hidden sm:rounded-lg"
            key={index}
          >
            <div className="px-4 py-3 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-[#1890ff]">
                {`หมายเลขคิวการจอง ${reserv.reservNumber}`}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {" "}
                    ชื่อ-นามสกุล
                  </dt>
                  {reserv.self_reserv && (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {`${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                    </dd>
                  )}
                  {reserv.customer.length > 0 && (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {reserv.customer.map((customer) => {
                        return `${customer.firstname}  ${customer.lastname} `;
                      })}
                    </dd>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    ข้อมูลติดต่อ
                  </dt>
                  {reserv.self_reserv && (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {`${reserv.self_reserv.phoneNumber} `}
                    </dd>
                  )}
                  {reserv.customer.length > 0 && (
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {reserv.customer.map((customer) => {
                        return `${customer.phoneNumber} `;
                      })}
                    </dd>
                  )}
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    วัน/เดือน/ปี
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(reserv.day).toLocaleDateString("en-GB")}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">เวลา</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {`${reserv.start} - ${reserv.end}`}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">จำนวนคน</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {reserv.amount}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">โต๊ะ</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {reserv.table.map((table) => {
                      return `${table} `;
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        );
      })}
    </>
  );
});

export default SingleAllDayReserv;
