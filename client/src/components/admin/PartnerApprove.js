import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { adminStore } from "./adminStore";
import { Link } from "react-router-dom";

const PartnerApprove = observer(() => {
  useEffect(() => {
    adminStore.getPartnerApprove();
  }, []);
  const partnersApprove = adminStore.partnersApprove;
  console.log(partnersApprove);
  return (
    <div className="ml-200">
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ข้อมูลร้านอาหารได้รับการอนุมัติ
        </h3>
      </div>
      {partnersApprove.map((partner) => {
        return (
          <div
            key={partner._id}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
          >
            <div className="px-4 py-3 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                <Link to={`/admin/partnerverify/${partner._id}`}>
                  ร้าน{partner.restaurantName}
                </Link>
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    ชื่อ-นามสกุล
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {`${partner.firstname}  ${partner.lastname}`}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    เบอร์โทรศัพท์
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {partner.phoneNumber}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        );
      })}
    </div>
  );
});
export default PartnerApprove;
