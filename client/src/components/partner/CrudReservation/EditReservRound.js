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

const EditReservRound = observer(() => {
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
  const [timeRound, setTimeRound] = useState({
    start: "",
    end: "",
  });
  const [table, setTable] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const dateTime = new Date(date);
  useEffect(async () => {
    await partnerStore.getInformation(partnerId);
    await reservStore.getRoundById(id);
    reservStore.roundReservById.map((reserv) => {
      if (reserv.customer.length > 0) {
        reserv.customer.map((customer) => {
          return (
            setSelfReserv({
              firstname: customer.firstname,
              lastname: customer.lastname,
              phoneNumber: customer.phoneNumber,
            }),
            setAmount(reserv.amount),
            setDate(new Date(reserv.day).toLocaleString()),
            setTimeRound({
              start: reserv.start,
              end: reserv.end,
            }),
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
          setTimeRound({
            start: reserv.start,
            end: reserv.end,
          }),
          setTable(reserv.table)
        );
      }
    });
  }, []);
  const partnerInfos = partnerStore.partnerInfo;
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

  if (typeof table === "string") {
    const tables = table.split(",");
    setTable(tables);
  }

  console.log(customerId);
  console.log(dateTime);
  console.log(timeRound);

  const editRoundReserv = async (event) => {
    event.preventDefault();
    if (customerId) {
      await reservStore.customerRoundUpdate(
        id,
        partnerId,
        customerId,
        amount,
        dateTime,
        timeRound.start,
        timeRound.end,
        table
      );
    } else if (!customerId) {
      await reservStore.selfRoundUpdate(
        id,
        partnerId,
        selfReserv,
        amount,
        dateTime,
        timeRound.start,
        timeRound.end,
        table
      );
    }
  };
  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          เพิ่มคิวการจอง
        </h3>
        <div className="border-t border-gray-300" />
        <form onSubmit={editRoundReserv}>
          <div className="mt-3 shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
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
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    โต๊ะ
                  </label>
                  <input
                    type="text"
                    name="table"
                    id="table"
                    value={table}
                    onChange={onChangeTable}
                    autoComplete="family-name"
                    className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-12 ">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    รอบเวลาที่ต้องการจอง
                  </label>
                </div>

                {partnerInfos.map((partnerInfo) => {
                  return partnerInfo.rounds.map((round, index) => {
                    // console.log("round", round);
                    return (
                      <div key={index} className="col-span-3 sm:col-span-2  ">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setTimeRound({
                                start: round.start,
                                end: round.end,
                              });
                            }}
                            className={
                              round.start === timeRound.start
                                ? " py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                                : "py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#ffffff] hover:bg-[#d5d5d5] "
                            }
                          >
                            {`${round.start} - ${round.end} น.`}
                          </button>
                        </label>
                      </div>
                    );
                  });
                })}
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

export default EditReservRound;
