import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { CiWavePulse1 } from "react-icons/ci";
import { faker } from "@faker-js/faker";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const data_visitor = labels.map(() =>
  faker.number.int({ min: 100, max: 1_000_000 })
);

const data_customer = labels.map(() =>
  faker.number.int({ min: 100, max: 1_000_000 })
);

export const data = {
  labels: labels,
  datasets: [
    {
      label: "Visitors",
      data: data_visitor,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Customers",
      data: data_customer,
      backgroundColor: "#60a5fa50",
      borderColor: "#1d4ed8",
      borderWidth: 1,
    },
  ],
};

const AdminVisitorChart = () => {
  return (
    <div className="w-[45vw] mt-4 bg-white rounded-2xl p-10 border border-black/20">
      <div className="flex flex-col w-full">
        <div className="text-[1.5rem] font-bold flex items-center gap-2">
          <CiWavePulse1 size={25} />
          <div>Lượng khách thăm quan / mua hàng</div>
        </div>
      </div>

      <Radar data={data} options={options} />
    </div>
  );
};

export default AdminVisitorChart;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};
