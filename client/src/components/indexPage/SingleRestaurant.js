import React, { useEffect, useState } from "react";
import "../../App.css";
import { observer } from "mobx-react-lite";
import { userStore } from "../Store/userStore";
import { reservStore } from "../Store/reservStore";
import { useParams, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import {
  LocationMarkerIcon,
  UsersIcon,
  CalendarIcon,
  IdentificationIcon,
} from "@heroicons/react/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import ModalReserv from "./ModalReserv";
import { partnerStore } from "../Store/partnerStore";

const days = [
  {
    key: "monday",
    i18n: "วันจันทร์",
  },
  {
    key: "tuesday",
    i18n: "วันอังคาร",
  },
  {
    key: "wednesday",
    i18n: "วันพุธ",
  },
  {
    key: "thursday",
    i18n: "วันพฤหัสบดี",
  },
  {
    key: "friday",
    i18n: "วันศุกร์",
  },
  {
    key: "saturday",
    i18n: "วันเสาร์",
  },
  {
    key: "sunday",
    i18n: "วันอาทิตย์",
  },
];

const SingleRestaurant = observer(() => {
  const { id } = useParams();
  const history = useHistory();
  const [selfReserv, setSelfReserv] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });
  const [navbar, setNavbar] = useState(true);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [reservModal, setReservModal] = useState(false);
  const [start, setStart] = useState("");
  const [timeRound, setTimeRound] = useState({
    start: "",
    end: "",
  });
  const scrollNav = () => {
    if (window.scrollY > 200) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  useEffect(() => {
    const getSingleRestaurant = async () => {
      await partnerStore.getInformation(id);
      await partnerStore.getMenuByRest(id);
    };
    getSingleRestaurant();
    window.addEventListener("scroll", scrollNav);
    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, [id]);

  const menu = partnerStore.menus;
  //------------onChangeValue
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };
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

  const dateTime = new Date();
  const dateSent = new Date(date).toISOString().split("T");
  const day = `${dateSent[0]}z`;
  const startTime = `${dateTime.getFullYear()}  ${
    dateTime.getMonth() + 1
  } ${dateTime.getDate()} ${start} GMT+0700 (Indochina Time)`;

  //-------reserv function
  const createReserv = async (event, type) => {
    event.preventDefault();
    try {
      if (type === "allDay" && !userStore.customer.username) {
        await reservStore.selfAllDayReserv(
          id,
          selfReserv,
          amount,
          day,
          startTime
        );
      } else if (type === "allDay" && userStore.customer.username) {
        await reservStore.customerAllDayReserv(
          id,
          userStore.customer._id,
          amount,
          day,
          startTime
        );
      } else if (type === "rounds" && !userStore.customer.username) {
        await reservStore.selfRoundReserv(
          id,
          selfReserv,
          amount,
          day,
          timeRound.start,
          timeRound.end
        );
      } else if (type === "rounds" && userStore.customer.username) {
        await reservStore.customerRoundReserv(
          id,
          userStore.customer._id,
          amount,
          day,
          timeRound.start,
          timeRound.end
        );
      }
      history.push(
        `/myreservation/${type}/${reservStore.thisReserv.partner_id}/${reservStore.thisReserv._id} `
      );
    } catch (err) {
      console.log(err);
    }
  };

  //------------reserv on mobile
  let reservElement = null;
  if (reservModal) {
    reservElement = (
      <ModalReserv
        userStore={userStore}
        partnerStore={partnerStore}
        setReservModal={setReservModal}
        setStep={setStep}
        setSelfReserv={setSelfReserv}
        setAmount={setAmount}
        setStart={setStart}
        setTimeRound={setTimeRound}
        step={step}
        amount={amount}
        onChangeAmount={onChangeAmount}
        date={date}
        handleChange={handleChange}
        start={start}
        timeRound={timeRound}
        selfReserv={selfReserv}
        onChangeValue={onChangeValue}
        createReserv={createReserv}
      />
    );
  }

  console.log(step);
  return (
    <>
      {partnerStore.partnerInfo.map((restaurant) => {
        return restaurant.information.map((info) => {
          return (
            <div className="bg-white  " key={restaurant._id}>
              {reservElement}
              <div
                className={
                  navbar
                    ? "hidden sm:fixed sm:top-40 sm:m-2 sm:w-1/4 sm:left-2/4 sm:ml-56 bg-white shadow-lg p-2 rounded-lg lg:grid "
                    : "hidden sm:fixed sm:top-0 sm:m-2 sm:w-1/4 sm:left-2/4 sm:ml-56 bg-white  shadow-lg p-2 rounded-lg lg:grid"
                }
              >
                <div
                  className={
                    step === 1
                      ? "grid p-2 h-40 grid-cols-5 sm:grid sm:grid-cols-6 sm:grid-rows-3"
                      : "grid p-2 grid-cols-5 sm:grid sm:grid-cols-6 sm:grid-rows-4"
                  }
                >
                  <div className="text-base  border-b border-gray-300 pt-4 text-center grid col-span-6 font-semibold ">
                    จองคิวร้านอาหาร
                  </div>
                  {step === 1 && (
                    <div className="text-base  justify-center pt-4 text-center  col-span-6 font-semibold ">
                      <button
                        className=" py-1 px-4 border border-transparent text-sm h-10 w-48 font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                        onClick={() => {
                          setStep(step + 1);
                        }}
                      >
                        จองคิวร้านอาหาร
                      </button>
                    </div>
                  )}
                  {step > 1 && (
                    <>
                      <div
                        className={
                          step === 2
                            ? "mt-2 col-span-2 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-2 flex justify-center "
                        }
                      >
                        <UsersIcon className=" w-5 h-5" />
                      </div>
                      <div
                        className={
                          step === 3
                            ? "mt-2 col-span-2 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-2 flex justify-center "
                        }
                      >
                        <CalendarIcon className=" w-5 h-5" />
                      </div>
                      <div
                        className={
                          step === 4
                            ? "mt-2 col-span-2 flex justify-center text-[#1890ff] "
                            : "mt-2 col-span-2 flex justify-center "
                        }
                      >
                        <IdentificationIcon className=" w-5 h-5" />
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <div className="pb-2 text-center col-span-6 font-semibold ">
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
                      <div className="col-span-6 flex justify-center">
                        ระบุวันที่และเวลา
                      </div>
                      <div className="col-span-6 ">
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
                      <div className="mt-3 col-span-6 ">
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
                        <>
                          {restaurant.rounds.map((round, index) => {
                            return (
                              <button
                                key={index}
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
                        </>
                      )}
                    </>
                  )}
                  {step === 4 && (
                    <>
                      {!userStore.customer.username && (
                        <>
                          {" "}
                          <div className="text-center col-span-6 font-semibold">
                            ข้อมูลส่วนตัว
                          </div>
                          <div className="text-center col-span-6 ">
                            <button
                              className="py-1 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                              onClick={() => {
                                history.push("/login");
                              }}
                            >
                              เข้าสู่ระบบ/สมัครสมาชิก
                            </button>
                          </div>
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
                          <div className="col-span-2 pt-2">เบอร์โทรศัพท์:</div>
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
                        </>
                      )}
                      {userStore.customer.username && (
                        <>
                          {" "}
                          <div className="text-center col-span-6 font-semibold">
                            ข้อมูลส่วนตัว
                          </div>
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
                              value={userStore.customer.lastname}
                              // onChange={onChangeValue}
                              autoComplete="given-name"
                              className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                            />
                          </div>
                          <div className="col-span-2 pt-2">เบอร์โทรศัพท์:</div>
                          <div className="col-span-4">
                            <input
                              type="text"
                              name="phoneNumber"
                              id="phoneNumber"
                              placeholder="เบอร์โทรศัพท์"
                              value={userStore.customer.phoneNumber}
                              // onChange={onChangeValue}
                              autoComplete="given-name"
                              className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {step > 1 && (
                    <>
                      <div className="col-span-2 col-start-1 mt-4 flex justify-center">
                        {" "}
                        <button
                          disabled={step === 2 ? true : false}
                          className={
                            "px-3 border  border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                          }
                          onClick={() => {
                            setStep(step - 1);
                          }}
                        >
                          ย้อนกลับ
                        </button>
                      </div>
                      {step !== 4 && (
                        <div className="col-span-2 col-start-5 mt-4 flex justify-center">
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
                    </>
                  )}
                </div>
              </div>
              <div className="pt-20 ">
                <div key={restaurant._id}>
                  <nav aria-label="Breadcrumb">
                    <ol
                      role="list"
                      className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                      <li className="text-lg">
                        <a
                          aria-current="page"
                          className="font-medium text-black hover:text-gray-600"
                        >
                          {`ร้าน${info.restaurantName}`}
                        </a>
                      </li>
                    </ol>
                  </nav>

                  <div className="flex max-w-2xl mx-auto px-4 lg:flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8 text-gray-500">
                    <div>
                      <LocationMarkerIcon className="w-5 h-5" />
                    </div>
                    <div>{`${restaurant.address} `}</div>
                    <div className="hidden sm:flex lg:flex">{` / ประเภทร้านอาหาร: ${
                      restaurant.type_rest === "rounds"
                        ? "เปิดเป็นรอบเวลา"
                        : "เปิดทั้งวัน"
                    }`}</div>
                  </div>

                  <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl  lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-4  lg:border-gray-200 ">
                      <img
                        src={`http://localhost:5500/uploads/${restaurant.image}`}
                        className={
                          menu.length > 0
                            ? "h-60 w-full  rounded-lg object-center object-cover"
                            : "w-full h-96  rounded-lg object-center object-cover"
                        }
                      />
                    </div>

                    {partnerStore.menus.length > 0 && (
                      <div className="hidden h-44 lg:grid lg:col-span-4 lg:pt-4 ">
                        <Swiper
                          slidesPerView={3}
                          spaceBetween={30}
                          loop={true}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                          modules={[Pagination, Navigation]}
                          className="mySwiper "
                        >
                          {partnerStore.menus.map((menu) => {
                            return (
                              <SwiperSlide>
                                {" "}
                                <img
                                  key={id}
                                  src={`http://localhost:5500/uploads/${menu.image}`}
                                  className="w-full h-32 object-center object-cover rounded-lg sm:h-30"
                                />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    )}
                    <div className="  lg:col-span-4  mt-4 p-3 pl-6 bg-white shadow-lg rounded-lg lg:border-gray-200">
                      <div className="grid grid-cols-5 sm:grid sm:grid-cols-6  lg:grid lg:grid-cols-6">
                        <div className="text-base col-span-6 ">
                          ข้อมูลร้านอาหาร
                        </div>

                        <div className="pt-2 col-span-2">ติดต่อ: </div>
                        <div className="pt-2 col-span-4">
                          {restaurant.contact}
                        </div>

                        <div className="pt-2 col-span-2">วันเปิดร้าน:</div>
                        {restaurant.type_rest === "rounds" ? (
                          <div className="pt-2 col-span-4">
                            {days.map((day) => {
                              return (
                                <div className="mb-3" key={day.key}>
                                  {day.i18n}:
                                  {restaurant.openday[day.key].type === "open"
                                    ? "  เปิด"
                                    : "  ปิด"}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="col-span-4">
                            {days.map((day) => {
                              return (
                                <div className="mb-3 " key={day.key}>
                                  {day.i18n}:
                                  {restaurant.openday[day.key].type === "open"
                                    ? "  เปิด "
                                    : "  ปิด "}
                                  {restaurant.openday[day.key].type ===
                                  "open" ? (
                                    <>
                                      {restaurant.openday[day.key].start} น. -{" "}
                                      {restaurant.openday[day.key].end} น.{" "}
                                    </>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {restaurant.type_rest === "rounds" ? (
                          <>
                            <div className="col-span-2">รอบเวลา:</div>
                            <div className="col-span-4">
                              {restaurant.rounds
                                .map(
                                  (round) =>
                                    `${round.start} - ${round.end} น.  `
                                )
                                .join(", ")}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>

                    {menu.length > 0 && (
                      <div
                        className={
                          " sm:mb-20  lg:grid lg:col-span-4 lg:mb-20 mt-4 p-3 pl-6 bg-white shadow-lg rounded-lg lg:border-gray-200 "
                        }
                      >
                        <div className="grid grid-cols-6 sm:grid sm:grid-cols-12  lg:grid lg:grid-cols-12">
                          <div className="text-base col-span-12">เมนูอาหาร</div>
                          {menu.map((theMenu) => {
                            return (
                              <>
                                <div className=" col-span-1 h-20 w-2 sm:col-span-1 sm:h-20 sm:w-2 lg:col-span-1 lg:h-20 lg:w-2  bg-[#1890ff] "></div>
                                <div className=" col-span-3 h-10 sm:col-span-3 sm:h-10 lg:col-span-3 lg:h-10 ">
                                  <img
                                    key={id}
                                    src={`http://localhost:5500/uploads/${theMenu.image}`}
                                    className="w-24 sm:py-2 lg:py-2 h-16 sm:w-28 sm:h-20 object-center object-cover rounded-lg sm:h-30"
                                  />
                                </div>
                                <div className="col-span-6 h-10 sm:col-span-6 sm:h-10 lg:col-span-6 lg:h-10 ">
                                  {theMenu.name}
                                  <div className="text-sm text-gray-400">
                                    {theMenu.description}
                                  </div>
                                </div>
                                <div className=" col-span-2 h-10 ">
                                  {`ราคา ${theMenu.price} บาท`}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {menu.length <= 0 && (
                      <div className="hidden sm:mb-20  lg:grid lg:col-span-4 lg:mb-20 mt-4 p-3 pl-6   rounded-lg lg:border-gray-200 "></div>
                    )}

                    <div className="    p-3 pl-6 bg-white shadow-lg rounded-lg sm:hidden lg:hidden"></div>
                  </div>

                  <div className="flex justify-center fixed bottom-0 w-full  p-2 bg-white shadow-lg  rounded-t-lg lg:border-gray-200  lg:hidden">
                    <button
                      className=" py-1 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                      onClick={() => {
                        setReservModal(true);
                        setStep(step + 1);
                      }}
                    >
                      จองคิวร้านอาหาร
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      })}
    </>
  );
});

export default SingleRestaurant;
