import React, { useEffect, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../partnerStore";
import { Button } from "antd";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import TextField from "@mui/material/TextField";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SettingBuffet = observer(({ buffet }) => {
  const [selected, setSelected] = useState(days[0]);
  const [inputFields, setInputFields] = useState([
    {
      start: "",
      end: "",
    },
  ]);
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    partnerStore.getInformation(id);
  }, []);

  console.log(inputFields);
  const handleChangeInput = (index, event) => {
    const newInputFields = inputFields.map((inputField, id) => {
      if (index === id) {
        inputField[event.target.name] = event.target.value;
      }
      return inputField;
    });

    setInputFields(newInputFields);
    console.log(inputFields);
  };

  const handleAddFields = (event) => {
    event.preventDefault();
    setInputFields([...inputFields, { start: "", end: "" }]);
  };

  const handleRemoveFields = (event, index) => {
    event.preventDefault();
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  console.log(selected);
  const partnerInfos = partnerStore.partnerInfo;
  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return (
          <div
            key={partnerInfo._id}
            className=" mt-3 pb-5 pt-2 bg-white shadow overflow-hidden sm:rounded-lg "
          >
            <div className="grid grid-cols-2 ">
              <div className="px-4 py-3 sm:px-6   ">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium text-gray-700">
                        เลือกวันที่ต้องการ
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="relative w-80 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">
                              {selected.i18n}
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
                          <Listbox.Options className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {days.map((day, index) => {
                              return (
                                <div key={index}>
                                  {partnerInfo.openday[day.key].type ===
                                  "open" ? (
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
                                      value={day}
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
                                              {day.i18n}
                                              {partnerInfo.openday[day.key]
                                                .type === "open"
                                                ? "  เปิด"
                                                : "  ปิด"}{" "}
                                              {
                                                partnerInfo.openday[day.key]
                                                  .start
                                              }{" "}
                                              น. -{" "}
                                              {partnerInfo.openday[day.key].end}{" "}
                                              น.{" "}
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
                                  ) : null}
                                </div>
                              );
                            })}
                          </Listbox.Options>
                        </Transition>
                      </div>
                      <div className="mt-4">
                        <div key={selected.key} className="text-md">
                          {selected.i18n}:
                          {partnerInfo.openday[selected.key].type === "open"
                            ? "  เปิด"
                            : "  ปิด"}
                          {partnerInfo.openday[selected.key].type === "open" ? (
                            <>
                              {" "}
                              {partnerInfo.openday[selected.key].start} น. -{" "}
                              {partnerInfo.openday[selected.key].end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <form>
                        {inputFields.map((inputField, index) => {
                          return (
                            <div key={index}>
                              <div className="mt-4">
                                <TextField
                                  name="start"
                                  value={inputField.start}
                                  onChange={(event) => {
                                    handleChangeInput(index, event);
                                  }}
                                  id="time"
                                  label="เริ่มต้น"
                                  type="time"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    step: 300, // 5 min
                                  }}
                                  sx={{ width: 150, marginRight: 2 }}
                                />
                                <TextField
                                  name="end"
                                  value={inputField.end}
                                  onChange={(event) => {
                                    handleChangeInput(index, event);
                                  }}
                                  id="time"
                                  label="หมดเวลา"
                                  type="time"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    step: 300, // 5 min
                                  }}
                                  sx={{ width: 150 }}
                                />
                                <Button
                                  className="text-base ml-2 mt-2 px-2"
                                  type="primary"
                                  htmlType="submit"
                                  onClick={handleAddFields}
                                >
                                  เพิ่มรอบการจอง
                                </Button>
                                <Button
                                  className="text-base ml-2 mt-2 px-2"
                                  type="primary"
                                  htmlType="submit"
                                  danger
                                  disabled={inputFields.length === 1}
                                  onClick={(event) =>
                                    handleRemoveFields(event, index)
                                  }
                                >
                                  ลบ
                                </Button>
                                <div>
                                  {inputFields.length === index + 1 && (
                                    <Button
                                      className="text-base ml-2 mt-3 px-2"
                                      type="primary"
                                      htmlType="submit"
                                    >
                                      บันทึกข้อมูล
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </form>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SettingBuffet;
