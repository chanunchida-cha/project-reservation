import React, { useState, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { reservStore } from "../../Store/reservStore";
import Swal from "sweetalert2";
import SearchText from "../../SearchText/SearchText";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

const initialStatus = ["pending", "arrived", "check out", "cancel"];
const ReservAllDayAllData = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState();

  useEffect(() => {
    const getAllday = async () => {
      await reservStore.getAllday(id);
    };
    getAllday();
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

  const confirmUpdateStatus = (reserv_id, partner_id, status) => {
    console.log(reserv_id);
    console.log(status);
    Swal.fire({
      title: "ยืนยันการแก้ไขสถานะ",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.updateStatusAllDay(reserv_id, partner_id, status);
      }
    });
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  console.log(selected);
  return (
    <div>
      <div className="px-4 sm:px-6">
        <div className="">
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="mb-2 w-1/5">
                <SearchText value={searchText} onChangeValue={setSearchText} />
              </div>
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal ">
                  <thead>
                    <tr>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-white  text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
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
                    {reservStore.allDayReserv
                      .filter((reserv) => {
                        return reserv.reservNumber.includes(searchText);
                      })
                      .map((reserv, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-1 py-2 border-b  border-gray-200 bg-white hover:bg-slate-500 text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                <Link
                                  to={`/partner/reserv/allday/${reserv._id}`}
                                >
                                  {" "}
                                  {reserv.reservNumber}
                                </Link>
                              </p>
                            </td>
                            <td className="px-3 py-2 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {new Date(reserv.day).toLocaleDateString(
                                  "en-GB"
                                )}
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
                                {reserv.table
                                  .map((table) => {
                                    return table;
                                  })
                                  .join(", ")}
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
                              <Listbox value={selected} onChange={setSelected}>
                                {({ open }) => (
                                  <>
                                    <div className="mt-1 ">
                                      <Listbox.Button className="relative w-40 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <span className="flex items-center">
                                          {reserv.status}
                                        </span>
                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                          <SelectorIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </Listbox.Button>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <Listbox.Options className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                          {initialStatus.map((type, index) => (
                                            <Listbox.Option
                                              onClick={() => {
                                                confirmUpdateStatus(
                                                  reserv._id,
                                                  id,
                                                  type
                                                );
                                              }}
                                              key={index}
                                              className={
                                                "cursor-default hover:bg-[#c2c2c2] select-none relative py-2 pl-3 pr-9"
                                              }
                                              value={type}
                                            >
                                              <>
                                                <div className="flex items-center">
                                                  <span
                                                    className={classNames(
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
                                                    {type}
                                                  </span>
                                                </div>
                                                <>
                                                  <span
                                                    className={classNames(
                                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                  ></span>
                                                </>
                                              </>
                                            </Listbox.Option>
                                          ))}
                                        </Listbox.Options>
                                      </Transition>
                                    </div>
                                  </>
                                )}
                              </Listbox>
                            </td>
                            <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm ">
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
