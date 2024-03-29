import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { reservStore } from "../../Store/reservStore";
import { partnerStore } from "../../Store/partnerStore";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditReservAllDay = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const { partnerId } = useParams();
  const [selfReserv, setSelfReserv] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState("");
  const [table, setTable] = useState([]);
  const [customerId, setCustomerId] = useState("");

  console.log(table);
  const dateTime = new Date(date);
  const dateSent = new Date(date).toLocaleDateString().split("/").join("-");
  const day = `${dateSent}z`;
  const startTime = `${dateTime.getFullYear()}  ${
    dateTime.getMonth() + 1
  } ${dateTime.getDate()} ${start} GMT+0700 (Indochina Time)`;
  useEffect(() => {
    const getReservs = async () => {
      await partnerStore.getTableByRest(partnerId);
      await reservStore.getAlldayById(id);
      reservStore.allDayReservById.map((reserv) => {
        if (reserv.customer_id) {
          reserv.customer.map((customer) => {
            return (
              setSelfReserv({
                firstname: customer.firstname,
                lastname: customer.lastname,
                phoneNumber: customer.phoneNumber,
              }),
              setAmount(reserv.amount),
              setDate(new Date(reserv.day).toLocaleString()),
              setStart(reserv.start),
              setTable(reserv.table),
              setCustomerId(reserv.customer_id)
            );
          });
        } else if (selfReserv) {
          return (
            setSelfReserv({
              firstname: reserv.self_reserv.firstname,
              lastname: reserv.self_reserv.lastname,
              phoneNumber: reserv.self_reserv.phoneNumber,
            }),
            setAmount(reserv.amount),
            setDate(new Date(reserv.day).toLocaleString()),
            setStart(reserv.start),
            setTable(reserv.table)
          );
        }
      });
    };
    getReservs();
  }, []);
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setSelfReserv((prevSelfReserv) => {
      return {
        ...prevSelfReserv,
        [name]: value,
      };
    });
  };
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const onChangeTable = (event) => {
    setTable(event.target.value);
  };
  console.log(partnerId);
  console.log("dateTime", dateTime);
  console.log("startTime", startTime);
  console.log("selfReserv", selfReserv);
  console.log("amount", amount);
  console.log("table", table);
  console.log(customerId);
  if (typeof table === "string") {
    const tables = table.split(",");
    setTable(tables);
  }

  const editAllDayReserv = async (event) => {
    event.preventDefault();
    if (customerId) {
      await reservStore.customerAllDayUpdate(
        id,
        partnerId,
        customerId,
        amount,
        day,
        startTime,
        table
      );
    } else if (!customerId) {
      await reservStore.selfAllDayUpdate(
        id,
        partnerId,
        selfReserv,
        amount,
        day,
        startTime,
        table
      );
    }
  };

  console.log(day);
  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          แก้ไขข้อมูลการจอง
        </h3>
        <div className="border-t border-gray-300" />
        <form onSubmit={editAllDayReserv}>
          <div className="mt-3 shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5  bg-white sm:p-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    disabled={customerId ? true : false}
                    value={selfReserv.firstname}
                    onChange={onChangeValue}
                    autoComplete="given-name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={selfReserv.lastname}
                    disabled={customerId ? true : false}
                    onChange={onChangeValue}
                    autoComplete="family-name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={selfReserv.phoneNumber}
                    onChange={onChangeValue}
                    autoComplete="given-name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6"></div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    จำนวนคน
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={onChangeAmount}
                    autoComplete="family-name"
                    className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6  sm:col-span-6"></div>

                <div className="col-span-6  sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    วันที่ต้องการจอง
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={2}>
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        UTC
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <div className="col-span-6  sm:col-span-6"></div>

                <div className="col-span-6 sm:col-span-6 ">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    เวลาที่ต้องการจอง
                  </label>
                  <div>
                    <Stack>
                      <TextField
                        name="start"
                        id="time"
                        type="time"
                        value={start}
                        onChange={(e) => {
                          setStart(e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Stack>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-6 "></div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    โต๊ะ
                  </label>
                  <Listbox value={table} onChange={setTable} multiple>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                          เลือกโต๊ะ
                        </Listbox.Label>
                        <div className="mt-1 relative">
                          <Listbox.Button className="relative w-80 h-10 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {table.map((theTable) => theTable).join(",")}
                              </span>
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
                            <Listbox.Options className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-20 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {partnerStore.tables.map((table, index) => (
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
                                  value={table.table_no}
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
                                          {table.table_no}
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
                  {/* <input
                    type="text"
                    name="table"
                    id="table"
                    value={table}
                    onChange={onChangeTable}
                    autoComplete="family-name"
                    className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border-gray-300 rounded-md"
                  /> */}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditReservAllDay;
