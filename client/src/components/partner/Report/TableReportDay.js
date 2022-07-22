import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams, useHistory } from "react-router-dom";

const fetcher = (url) => axios.get(url).then((res) => res.data);
function TableReportDay() {
  const { id } = useParams();
  const {
    data: countReservPerDay,
    error: errorReservPerDay,
    isValidating: loadingReservPerDay,
  } =  useSWR(
    `${process.env.REACT_APP_API_DASHBOARD}/get-count-allday-reserv-for-day/${id}`,
    fetcher
  );

  if (errorReservPerDay) return <div>failed to load</div>;
  if (loadingReservPerDay) {
    return <div>Loading...</div>;
  }

  console.log(countReservPerDay);
  return (
    <div className="w-2/4">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="h-[600px]  overflow-x-auto rounded-lg ">
          <div className="inline-block min-w-full shadow-md rounded-lg ">
            <table className="min-w-full table-auto leading-normal">
              <thead>
                <tr>
                  <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                    วัน/เดือน/ปี
                  </th>
                  <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                    จำนวนการจอง
                  </th>
                </tr>
              </thead>
              <tbody>
                {countReservPerDay.map((count, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {`${count._id.day}/${count._id.month}/${count._id.year}
                          `}
                        </p>
                      </td>
                      <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {count.count}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableReportDay;
