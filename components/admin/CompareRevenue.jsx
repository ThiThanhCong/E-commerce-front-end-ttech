"use client";

import {
  convertToVND,
  getCurrentMonth,
  getPreCurrentMonth,
} from "../../utils/until";
import { useEffect, useState } from "react";
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import { CiCreditCard1 } from "react-icons/ci";

const CompareRevenue = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  let currentValue = 9_000_000_000;
  let preValue = 10_000_000_000;
  const precent = (currentValue / (currentValue - preValue)).toFixed(2);

  return (
    <div className="text-white " suppressHydrationWarning>
      <div className="rounded-3xl border border-black/20 px-2 py-10 bg-white text-black">
        <div className="w-full px-8 top-8">
          <div className="flex justify-between">
            <div className="">
              <h1 className="font-light">Name</h1>
              <h1 className="font-medium tracking-widest">T-TECH</h1>
            </div>
            <div>
              <CiCreditCard1 size={30} />
            </div>
          </div>

          <div className="pt-1">
            <h1 className="font-light">
              <span>Doanh thu tháng </span>
              {getCurrentMonth()}
            </h1>
            <div className="flex items-end gap-3">
              <div className="font-bold text-[2rem] tracking-more-wider">
                {convertToVND(currentValue)}
              </div>
              <div>
                {precent > 1 ? (
                  <div className="flex items-center text-[1.2rem]  gap-1 ">
                    <BiLineChart size={15} color="green" /> {precent} %
                  </div>
                ) : (
                  <div className="flex items-center text-[1.2rem]  gap-1 ">
                    <BiLineChartDown size={15} color="red" /> {precent} %
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-1">
            <h1 className="font-light">
              <span>Doanh thu tháng </span>
              {getPreCurrentMonth()}
            </h1>
            <div className="font-bold text-[2rem] tracking-more-wider">
              {convertToVND(preValue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareRevenue;
