import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import ReservAllDayTodayData from "./ReservAllDayTodayData";
import ReservAllDayAllData from "./ReservAllDayAllData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const types = [
  {
    key: "allReserv",
    i18n: "การจองทั้งหมด",
  },
  {
    key: "todayReserv",
    i18n: "การจองวันนี้",
  },
];
function ReservAllDayData() {
  const [selected, setSelected] = useState(types[0]);
  console.log(selected);
  return (
    <div>
      <div className="px-3">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ข้อมูลคิวการจอง
        </h3>
        <div className="border-t border-gray-300"></div>
      </div>
      <div className="w-96 px-3 mt-3">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-80 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{selected.i18n}</span>
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
                    {types.map((type, index) => (
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
                        value={type}
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
                                {type.i18n}
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
      {selected.key === "todayReserv" && <ReservAllDayTodayData />}
      {selected.key === "allReserv" && <ReservAllDayAllData />}
    </div>
  );
}

export default ReservAllDayData;
