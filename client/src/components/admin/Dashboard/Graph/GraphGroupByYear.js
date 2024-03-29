import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams, useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  getPastelColor,
  getHsl,
  getHsla,
  getRgb,
  getRgba,
  getHex,
} from "pastel-color";
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
function GraphGroupByYear() {
  const [year, setYear] = useState(startYear);
  const {
    data: countGroupPartnerForYear,
    error: errorGroupPartnerForYear,
    isValidating: loadingGroupPartnerForYear,
  } = useSWR(
    `${process.env.REACT_APP_API_DASHBOARD_ADMIN}/get-count-group-partner-for-year`,
    fetcher
  );

  if (errorGroupPartnerForYear) return <div>failed to load</div>;
  if (loadingGroupPartnerForYear) {
    return <div>Loading...</div>;
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        suggestedMin: 0,

        suggestedMax: 100,
        ticks: {
          // forces step size to be 50 units
          stepSize: 10,
        },
      },
    },
  };

  const sortLabelsYear = countGroupPartnerForYear
    .slice()
    .sort((a, b) => a._id.year - b._id.year);

  const filterLabelsYear = sortLabelsYear.filter((label) => {
    let found = false;

    if (Number(year) === label._id.year) {
      found = true;
    }

    return found;
  });

  const groupLabel = filterLabelsYear.reduce((group, data) => {
    const { year } = data._id;
    const key = `${year}`;
    group[key] = group[key] ?? [];
    group[key].push(data);
    return group;
  }, {});

  const groupByCategory = filterLabelsYear.reduce((group, data) => {
    const { restaurantName } = data.information;
    group[restaurantName] = group[restaurantName] ?? [];
    group[restaurantName].push(data.count);
    return group;
  }, {});

  const labels = Object.keys(groupLabel);
  console.log("groupByCategory", groupByCategory);
  const dataSets = [];
  console.log(getPastelColor());
  Object.keys(groupByCategory).forEach((key) =>
    dataSets.push({
      label: key,
      data: groupByCategory[key],
      backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    })
  );

  console.log(dataSets);
  const data = {
    labels: labels,
    datasets: [...dataSets],
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

export default GraphGroupByYear;
