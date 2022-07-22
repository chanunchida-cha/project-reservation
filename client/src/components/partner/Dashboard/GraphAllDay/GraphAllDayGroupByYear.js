import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams, useHistory } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const fetcher = (url) => axios.get(url).then((res) => res.data);
function GraphAllDayGroupByYear() {
  const { id } = useParams();
  const {
    data: countReservPerYear,
    error: errorReservPerYear,
    isValidating: loadingReservPerYear,
  } = useSWR(
    `${process.env.REACT_APP_API_DASHBOARD}/get-count-allday-reserv-for-year/${id}`,
    fetcher
  );

  if (errorReservPerYear) return <div>failed to load</div>;
  if (loadingReservPerYear) {
    return <div>Loading...</div>;
  }

  console.log(countReservPerYear);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        suggestedMin: 0,

        suggestedMax: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const labels = [];
  const datas = [];
  const sortLabelsYear = countReservPerYear
    .slice()
    .sort((a, b) => a._id - b._id);

  for (const count of sortLabelsYear) {
    labels.push(`ปี ${count._id}`);
    datas.push(count.count);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "จำนวนการจอง / วัน",
        data: datas,
        backgroundColor: "#6295EF",
      },
    ],
  };
  return (
    <div className="w-full">
      <Bar options={options} data={data} />
    </div>
  );
}

export default GraphAllDayGroupByYear;
