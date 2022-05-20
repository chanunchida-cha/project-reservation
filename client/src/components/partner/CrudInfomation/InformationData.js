import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import { partnerStore } from "../partnerStore";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

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

const InformationData = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [end, setEnd] = useState("");
  console.log(id);

  useEffect(() => {
    partnerStore.getInformation(id);
  }, []);

  const partnerInfos = partnerStore.partnerInfo;
  const convertTime = (t, tLength) => {
    const time = t.split(":");
    const num = tLength;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    const hoursEnd = Number(time[0]) + rhours;
    const minutesEnd = Number(time[1]) + rminutes;

    if (minutesEnd >= 60) {
      const rmin = Math.floor(minutesEnd / 60);
      const timeEnd = hoursEnd + rmin;
      const minEnd = Math.round((hours - rhours) * 60) - Number(time[1]);

      return (
        <div>
          {timeEnd}:{minEnd}
        </div>
      );
    } else {
      const timeEnd = hoursEnd;

      return (
        <div>
          {timeEnd}:{minutesEnd}
        </div>
      );
    }
  };

  return (
    <div>
      {partnerInfos.map((partnerInfo) => {
        return partnerInfo.information.map((info) => {
          return (
            <div
              key={partnerInfo._id}
              className=" mt-3 bg-white shadow overflow-hidden sm:rounded-lg mx-20"
            >
              <div className="grid grid-cols-2 ">
                <div className="px-4 py-3 sm:px-6   ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                    ร้าน {`${info.restaurantName} `}
                  </h3>
                </div>
                <div className="px-4 py-3 text-right">
                  <Button
                    className="text-base  mr-3"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      history.push(`/partner/editinformation/${id}`);
                    }}
                  >
                    {<EditOutlined />}
                  </Button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      รายละเอียดร้าน
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.description}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      ที่ตั้งร้านอาหาร
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.address}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      ข้อมูลติดต่อ
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.contact}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      ประเภทร้านอาหาร
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.type_rest === "rounds"
                        ? "เปิดเป็นรอบเวลา"
                        : "เปิดทั้งวัน"}
                    </dd>
                  </div>
                  {partnerInfo.type_rest === "rounds" ? (
                    <>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                          วันเปิด-ปิดร้านอาหาร
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {days.map((day) => {
                            return (
                              <div className="mb-3" key={day.key}>
                                {day.i18n}:
                                {partnerInfo.openday[day.key].type === "open"
                                  ? "  เปิด"
                                  : "  ปิด"}
                              </div>
                            );
                          })}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                          รอบเวลาที่เปิด
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {partnerInfo.rounds.map((round, index) => {
                            return (
                              <div className="mb-3" key={index}>
                                {`รอบที่ ${index + 1} เวลา ${round.start} - ${
                                  round.end
                                } น.`}
                              </div>
                            );
                          })}
                        </dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                          ระยะเวลาขั้นต่ำ/รอบการจอง
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {partnerInfo.time_length} นาที
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                          เวลาเปิด-ปิดร้านอาหาร
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {days.map((day) => {
                            return (
                              <div className="mb-3" key={day.key}>
                                {day.i18n}:
                                {partnerInfo.openday[day.key].type === "open"
                                  ? "  เปิด"
                                  : "  ปิด"}
                                <div>
                                  {partnerInfo.openday[day.key].type ===
                                  "open" ? (
                                    <>
                                      {" "}
                                      เวลา {
                                        partnerInfo.openday[day.key].start
                                      }{" "}
                                      น. - {partnerInfo.openday[day.key].end} น.{" "}
                                      {/* {convertTime(
                                        partnerInfo.openday[day.key].start,
                                        partnerInfo.time_length
                                      )} */}
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </dd>
                      </div>
                    </>
                  )}
                  <div className=" bg-gray-50 px-4 py-3 sm:px-6  align-middle  ">
                    <dt className="text-sm font-medium text-gray-900">
                      รูปภาพร้านอาหาร
                    </dt>
                    <img
                      className=" mt-4 rounded object-cover h-48 w-96"
                      src={`http://localhost:5500/uploads/${partnerInfo.image}`}
                    />
                  </div>
                </dl>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
});

export default InformationData;
