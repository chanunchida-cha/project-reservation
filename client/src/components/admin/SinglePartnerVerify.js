import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { adminStore } from "./adminStore";
import { useParams, useHistory } from "react-router-dom";
import { Radio, Button } from "antd";

const SinglePartnerVerify = observer(() => {
  const { id } = useParams();
  const history = useHistory();
  const [value, setValue] = useState("approve");
  const [note, setNote] = useState("");
  console.log(value);

  const onValueChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onNoteChange = (e) => {
    setNote(e.target.value);
    console.log(note);
  };

  useEffect(() => {
    adminStore.getPartnerVarifyById(id);
  }, []);

  const {
    _id,
    restaurantName,
    firstname,
    lastname,
    username,
    email,
    phoneNumber,
    address,
    status,
  } = adminStore.partner;
  const isNote = adminStore.partner.note;
  const isVerify = status === "verification";
  const statusDisapprove = value === "disapprove";
  const disapprove = status === "disapprove";

  function updateStatus(e) {
    e.preventDefault();
    adminStore.updateStatusPartner(_id, value, note);
    history.push("/admin/partnerapprove");
    console.log(_id, value, note);
  }
  return (
    <div
      key={_id}
      className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
    >
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ร้าน{restaurantName}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">ชื่อ-นามสกุล</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${firstname}  ${lastname}`}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {username}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">เบอร์โทรศัพท์</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {phoneNumber}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">E-mail</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {email}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">ที่อยู่ร้าน</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {address}
            </dd>
          </div>
        </dl>
      </div>
      {isNote && disapprove && (
        <div>
          <div class="border-t border-gray-200" />
          <div class="px-4 py-2 sm:px-6">
            <p class="mt-1 max-w-2xl text-sm text-red-500">
              หมายเหตุ* {adminStore.partner.note}
            </p>
          </div>
        </div>
      )}
      {isVerify && (
        <div className="ml-6 mb-3">
          <form onSubmit={updateStatus}>
            <Radio.Group onChange={onValueChange} value={value}>
              <Radio value={"approve"}>อนุมัติ</Radio>
              <Radio value={"disapprove"}>ไม่อนุมัติ</Radio>
            </Radio.Group>
            {statusDisapprove && (
              <div className="m-2 mr-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  หมายเหตุ{" "}
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows="4"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="หมายเหตุ"
                    onChange={onNoteChange}
                  ></textarea>
                </div>
              </div>
            )}
            <Button className="ml-2" type="primary" htmlType="submit">
              บันทึก
            </Button>
          </form>
        </div>
      )}
    </div>
  );
});

export default SinglePartnerVerify;
