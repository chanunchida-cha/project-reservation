import React from "react";
import TextField from "@mui/material/TextField";
import { useParams, useHistory } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import {
  UsersIcon,
  CalendarIcon,
  IdentificationIcon,
  XIcon,
} from "@heroicons/react/solid";

function ModalReserv({
  partnerStore,
  userStore,
  setReservModal,
  setStep,
  setSelfReserv,
  setAmount,
  setStart,
  setTimeRound,
  step,
  amount,
  onChangeAmount,
  date,
  handleChange,
  start,
  timeRound,
  selfReserv,
  onChangeValue,
  createReserv,
}) {
  const history = useHistory();
  return (
    <>
      {partnerStore.partnerInfo.map((restaurant) => {
        return (
          <div
            className="relative z-10   lg:hidden   "
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div className="fixed top-20 bg-white h-full w-full rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  sm:w-full md:w-full">
                  <div className="text-base  border-b border-white pt-4 flex justify-end mr-5 font-semibold ">
                    <XIcon
                      className="h-5 w-5 hover:text-gray-500"
                      onClick={() => {
                        setReservModal(false);
                        setStep(1);
                        setSelfReserv({
                          firstname: "",
                          lastname: "",
                          phoneNumber: "",
                        });
                        setAmount("");
                        setStart("");
                        setTimeRound({
                          start: "",
                          end: "",
                        });
                      }}
                    />
                  </div>
                  <div className="text-base  border-b border-white pt-4 text-center   font-semibold ">
                    จองคิวร้านอาหาร
                  </div>
                  {step > 1 && (
                    <div className="grid grid-cols-3">
                      <div
                        className={
                          step === 2
                            ? "mt-2 col-span-1 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-1 flex justify-center "
                        }
                      >
                        <UsersIcon className=" w-5 h-5" />
                      </div>
                      <div
                        className={
                          step === 3
                            ? "mt-2 col-span-1 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-1 flex justify-center "
                        }
                      >
                        <CalendarIcon className=" w-5 h-5" />
                      </div>
                      <div
                        className={
                          step === 4
                            ? "mt-2 col-span-1 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-1 flex justify-center "
                        }
                      >
                        <IdentificationIcon className=" w-5 h-5" />
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="mt-4 mx-3 pb-2 text-center col-span-6 font-semibold ">
                      <div>ระบุจำนวนคน</div>
                      <div>
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          value={amount}
                          onChange={onChangeAmount}
                          autoComplete="family-name"
                          className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <>
                      <div className=" mt-4 flex justify-center font-semibold ">
                        ระบุวันที่และเวลา
                      </div>
                      <div className="mt-4 mx-3 ">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={2}>
                            <DesktopDatePicker
                              label="วัน/เดือน/ปี ต้องการจอง"
                              inputFormat="dd/MM/yyyy"
                              UTC
                              value={date}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                      <div className="mt-4 mx-3 col-span-6 ">
                        {restaurant.type_rest === "allDay" && (
                          <Stack>
                            <TextField
                              label="เวลาที่ต้องการจอง"
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
                        )}
                      </div>

                      {restaurant.type_rest === "rounds" && (
                        <div className="grid grid-cols-6">
                          {restaurant.rounds.map((round, index) => {
                            return (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTimeRound({
                                    start: round.start,
                                    end: round.end,
                                  });
                                }}
                                className={
                                  timeRound.start === round.start
                                    ? " py-2  border col-span-2 mt-2 mx-2 border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                                    : "py-2  border col-span-2 mt-2 mx-2 border-transparent text-sm font-medium rounded-md text-black bg-[#ffffff] hover:bg-[#d5d5d5] "
                                }
                              >
                                {`${round.start} - ${round.end}`}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                  {step === 4 && (
                    <>
                      {!userStore.customer.username && (
                        <>
                          {" "}
                          <div className="mt-4 text-center col-span-6 font-semibold">
                            ข้อมูลส่วนตัว
                          </div>
                          <div className=" mt-4 text-center col-span-6 ">
                            <button
                              className="py-1 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                              onClick={() => {
                                history.push("/login");
                              }}
                            >
                              เข้าสู่ระบบ/สมัครสมาชิก
                            </button>
                          </div>
                          <div className="mt-4 mx-3">
                            <div className="col-span-2 pt-2">ชื่อ:</div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="ชื่อ"
                                value={selfReserv.firstname}
                                onChange={onChangeValue}
                                autoComplete="given-name"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                            <div className="col-span-2 pt-2">นามสกุล:</div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="นามสกุล"
                                value={selfReserv.lastname}
                                onChange={onChangeValue}
                                autoComplete="given-name"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                            <div className="col-span-2 pt-2">
                              เบอร์โทรศัพท์:
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="เบอร์โทรศัพท์"
                                value={selfReserv.phoneNumber}
                                onChange={onChangeValue}
                                autoComplete="given-name"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {userStore.customer.username && (
                        <>
                          {" "}
                          <div className="mt-4 text-center col-span-6 font-semibold">
                            ข้อมูลส่วนตัว
                          </div>
                          <div className="mx-3">
                            <div className="col-span-2 pt-2">ชื่อ:</div>
                            <div className="col-span-4">
                              <input
                                disabled
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="ชื่อ"
                                value={userStore.customer.firstname}
                                // onChange={onChangeValue}
                                autoComplete="firstname"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                            <div className="col-span-2 pt-2">นามสกุล:</div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="นามสกุล"
                                value={userStore.customer.lastname}
                                // onChange={onChangeValue}
                                autoComplete="lastname"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                            <div className="col-span-2 pt-2">
                              เบอร์โทรศัพท์:
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="เบอร์โทรศัพท์"
                                value={userStore.customer.phoneNumber}
                                // onChange={onChangeValue}
                                autoComplete="phoneNumber"
                                className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <div className="bg-white px-4 py-3 sm:px-6 ">
                    {step >= 2 && (
                      <div className="grid grid-cols-2 sm:grid sm:grid-cols-2 md:grid md:grid-cols-2">
                        <div className="col-span-1 col-start-1 mt-4 flex justify-start  sm:flex sm:justify-start md:col-span-1 md:col-start-1z">
                          {" "}
                          <button
                            disabled={step === 2}
                            className={
                              "disabled:opacity-75 px-3 border  border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                            }
                            onClick={() => {
                              setStep(step - 1);
                            }}
                          >
                            ย้อนกลับ
                          </button>
                        </div>
                        {step !== 4 && (
                          <div className="col-span-1 col-start-5 mt-4 flex justify-end">
                            <button
                              disabled={
                                step === 2
                                  ? amount === ""
                                  : step === 3
                                  ? restaurant.type_rest === "rounds"
                                    ? timeRound.start === ""
                                    : start === ""
                                  : null
                              }
                              className={
                                "disabled:opacity-75 px-3 border border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff]"
                              }
                              onClick={() => {
                                setStep(step + 1);
                              }}
                            >
                              ถัดไป
                            </button>
                          </div>
                        )}
                        {step === 4 && (
                          <div className="col-span-2 col-start-5 mt-4 flex justify-center">
                            <button
                              disabled={
                                step === 4
                                  ? userStore.customer.username
                                    ? false
                                    : selfReserv.firstname === "" ||
                                      selfReserv.lastname === "" ||
                                      selfReserv.phoneNumber === ""
                                  : false
                              }
                              className={
                                "disabled:opacity-75 px-3 border border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff]"
                              }
                              onClick={(event) => {
                                createReserv(event, restaurant.type_rest);
                              }}
                            >
                              จองคิว
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ModalReserv;
