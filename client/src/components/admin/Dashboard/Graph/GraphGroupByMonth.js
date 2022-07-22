import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams, useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const month = [
  { key: "1", i18n: "มกราคม" },
  { key: "2", i18n: "กุมภาพันธ์" },
  { key: "3", i18n: "มีนาคม" },
  { key: "4", i18n: "เมษายน" },
  { key: "5", i18n: "พฤษภาคม" },
  { key: "6", i18n: "มิถุนายน" },
  { key: "7", i18n: "กรกฎาคม" },
  { key: "8", i18n: "สิงหาคม" },
  { key: "9", i18n: "กันยายน" },
  { key: "10", i18n: "ตุลาคม" },
  { key: "11", i18n: "พฤศจิกายน" },
  { key: "12", i18n: "ธันวาคม" },
];

const fetcher = (url) => axios.get(url).then((res) => res.data);
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const startYear = new Date().getFullYear();
const years1 = Array.from(new Array(10), (val, index) => index + startYear);
const years2 = Array.from(new Array(10), (val, index) => startYear - index);
const selectYear = years1.concat(
  years2.filter((item) => years1.indexOf(item) < 0)
);
function GraphGroupByMonth() {
  const [year, setYear] = useState(startYear);
  const {
    data: countGroupPartnerForMonth,
    error: errorGroupPartnerForMonth,
    isValidating: loadingGroupPartnerForMonth,
  } = useSWR(
    `${process.env.REACT_APP_API_DASHBOARD_ADMIN}/get-count-group-partner-for-month`,
    fetcher
  );

  if (errorGroupPartnerForMonth) return <div>failed to load</div>;
  if (loadingGroupPartnerForMonth) {
    return <div>Loading...</div>;
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const labels = [];
  const label = [];
  // const labelsData = [];
  let dataSets = [];
  let datas = [];
  const sortLabelsYear = countGroupPartnerForMonth
    .slice()
    .sort((a, b) => a._id.year - b._id.year);
  const sortLabelsmonth = sortLabelsYear
    .slice()
    .sort((a, b) => a._id.month - b._id.month);

  datas = sortLabelsmonth.filter((label) => {
    let found = false;

    if (Number(year) === label._id.year) {
      found = true;
    }

    return found;
  });

  // const duplicateIds = datas
  //   .map((data) => data._id.month)
  //   .filter((data, i, dataIds) => dataIds.indexOf(data) !== i);

  //   console.log(duplicateIds);

//   const values = [{
//     id: 10,
//     name: 'someName1'
//   },
//   {
//     id: 10,
//     name: 'someName2'
//   },
//   {
//     id: 10,
//     name: 'someName2'
//   },
//   {
//     id: 11,
//     name: 'someName3'
//   },
//   {
//     id: 12,
//     name: 'someName4'
//   }
// ];

// const duplicateIds = values
//   .map(v => v.id)
//   .filter((v, i, vIds) => vIds.indexOf(v) !== i)
//   console.log(duplicateIds);
// const duplicates = values
//   .filter(obj => duplicateIds.includes(obj.id));
// console.log(duplicates)
// const duplicates = datas.filter((data)=>{duplicateIds.inCludes(data._id.month)})
  // for(const theMonth of month){
  //   for(const count of countGroupPartnerForMonth){
  //     if(theMonth.key === count._id.month){
  //       datas.push({

  //       })

  //     }
  //   }
  // }

  // labelsData.push(`ร้าน${resName.restaurantName}`);
  //     labels.push(`เดือน ${count._id.month} ปี ${count._id.year}`);

  // for (const count of datas) {
  //   for (const resName of count.information) {
  //     labels.push(`เดือน ${count._id.month} ปี ${count._id.year}`);
  //     label.push(`เดือน ${count._id.month} ปี ${count._id.year}`);
  //     dataSets.push({
  //       label: `ร้าน${resName.restaurantName}`,
  //       data: count.count,
  //     });
  //   }

  console.log(datas);
  const data = {
    labels: ["a,", "b"],
    datasets: [
      {
        label: "A",
        data: [1, 2],
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-3">
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
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {year}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text--[#189bff] ",
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
      <div>
        <Bar options={options} data={data} />;
      </div>
    </div>
  );
}

export default GraphGroupByMonth;
