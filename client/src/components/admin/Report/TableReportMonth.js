import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Radio } from "antd";
const startYear = new Date().getFullYear();
const years1 = Array.from(new Array(10), (val, index) => index + startYear);
const years2 = Array.from(new Array(10), (val, index) => startYear - index);
const selectYear = years1.concat(
  years2.filter((item) => years1.indexOf(item) < 0)
);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (url) => axios.get(url).then((res) => res.data);
function TableReportMonth() {
    const { id } = useParams();
  const [type, setType] = useState("all");
  const [year, setYear] = useState(startYear);
  const {
    data: countReservPerMonth,
    error: errorReservPerMonth,
    isValidating: loadingReservPerMonth,
  } = useSWR(
    `${process.env.REACT_APP_API_DASHBOARD_ADMIN}/get-count-group-partner-for-month`,
    fetcher
  );
  if (errorReservPerMonth) return <div>failed to load</div>;
  if (loadingReservPerMonth) {
    return <div>Loading...</div>;
  }

  const sortLabelsDay = countReservPerMonth
    .slice()
    .sort((a, b) => a._id.day - b._id.day);
  const sortLabelsMonth = sortLabelsDay
    .slice()
    .sort((a, b) => a._id.month - b._id.month);
  const sortLabelsYear = sortLabelsMonth
    .slice()
    .sort((a, b) => a._id.year - b._id.year);

  const dataSets = sortLabelsYear.filter((label) => {
    let found = false;

    if (Number(year) === label._id.year) {
      found = true;
    }

    return found;
  });

  return (
    <div className="w-full mt-4">
    <div>
      <Radio.Group
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type}
      >
        <Radio value={"all"}>รายงานทั้งหมด</Radio>
        <Radio value={"filter"}>เลือกตามปีที่ต้องการ</Radio>
      </Radio.Group>
    </div>
    {type === "filter" && (
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-2">
          <Listbox value={year} onChange={setYear}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  เลือกปีที่ต้องการ
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">{year}</span>
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
                      {selectYear.map((year, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-[#189bff] "
                                : " text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={year}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold"
                                      : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {year}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active
                                      ? "text-white"
                                      : "text--[#189bff] ",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    )}
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="h-[600px]  overflow-x-auto rounded-lg ">
        <div className="inline-block min-w-full shadow-md rounded-lg ">
          <table className="min-w-full table-auto leading-normal">
            <thead>
              <tr>
                <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                  เดือน/ปี
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                 ชื่อร้านอาหาร
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                  จำนวนการจอง
                </th>
              </tr>
            </thead>
            <tbody>
              {(type === "all" ? sortLabelsYear : dataSets).map((count, index) => {
                return (
                  <tr key={index}>
                    <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {`เดือนที่${count._id.month} ปี${count._id.year}
                        `}
                      </p>
                    </td>
                    <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {`ร้าน${count.information.restaurantName}
                        `}
                      </p>
                    </td>
                    <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {count.count}
                      </p>
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
  )
}

export default TableReportMonth