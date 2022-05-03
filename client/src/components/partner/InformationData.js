import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams, useHistory } from "react-router-dom";
import { partnerStore } from "./partnerStore";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const InformationData = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    partnerStore.getInformation(id);
  }, []);

  const partnerInfos = partnerStore.partnerInfo;
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
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      รายละเอียดร้าน
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.description}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      ที่ตั้งร้านอาหาร
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.address}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      ข้อมูลติดต่อ
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {partnerInfo.contact}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      เวลาเปิด-ปิดร้านอาหาร
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="mb-3">
                        วันจันทร์ :
                        {partnerInfo.openday.monday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.monday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.monday.start} น. -{" "}
                              {partnerInfo.openday.monday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันอังคาร :
                        {partnerInfo.openday.tuesday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.tuesday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.tuesday.start} น. -{" "}
                              {partnerInfo.openday.tuesday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันพุธ :
                        {partnerInfo.openday.wednesday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.wednesday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.wednesday.start} น. -{" "}
                              {partnerInfo.openday.wednesday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันพฤหัสบดี :
                        {partnerInfo.openday.thursday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.thursday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.thursday.start} น. -{" "}
                              {partnerInfo.openday.thursday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันศุกร์ :
                        {partnerInfo.openday.friday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.friday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.friday.start} น. -{" "}
                              {partnerInfo.openday.friday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันเสาร์ :
                        {partnerInfo.openday.saturday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.saturday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.saturday.start} น. -{" "}
                              {partnerInfo.openday.saturday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        วันอาทิตย์ :
                        {partnerInfo.openday.sunday.type === "open"
                          ? "  เปิด"
                          : "  ปิด"}
                        <div>
                          {partnerInfo.openday.sunday.type === "open" ? (
                            <>
                              {" "}
                              เวลา {partnerInfo.openday.sunday.start} น. -{" "}
                              {partnerInfo.openday.sunday.end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              <div >
                <img
                  src={`http://localhost:5500/uploads/${partnerInfo.image}`}
                />
              </div>
            </div>
          );
        });
      })}
    </div>
  );
});

export default InformationData;
