import React from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const StatCard = ({ item }) => {
  const Icon = item.icon;

  const isPositive = item.percentage >= 0;
  const percentageBg = isPositive ? "bg-green-100" : "bg-red-100";
  const percentageText = isPositive ? "text-green-600" : "text-red-600";

  const chartData = [
    { value: 30 },
    { value: 50 },
    { value: 45 },
    { value: 60 },
    { value: 40 },
    { value: 70 },
    { value: 55 },
    { value: 30 },
    { value: 50 },
    { value: 45 },
    { value: 60 },
    { value: 40 },
    { value: 70 },
    { value: 55 },
  ];

  return (
    <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-col gap-4 p-5 bg-white lg:min-h-[220px] min-h-[200px] rounded-[12px] transition-all duration-300">
      {/* icon and percentage */}
      <div className="flex flex-row justify-between items-start">
        {/* icon */}
        <div className="w-[48px] aspect-square rounded-lg bg-gradient-to-br from-[#411F47] to-[#411F47CC] flex items-center justify-center text-white text-lg">
          <Icon />
        </div>

        <div
          className={`${percentageBg} ${percentageText} rounded-full flex gap-1 py-[4px] px-2 items-center text-xs font-poppins`}
        >
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          <span>{Math.abs(item.percentage)}%</span>
        </div>
      </div>

      {/* data and name */}
      <div className="w-full flex flex-col items-start">
        <h5
          className={`text-[24px] font-semibold ${
            isPositive ? "text-[#411F47]" : "text-[#DD8796]"
          }`}
        >
          {item.data}
        </h5>

        <p className="capitalize font-poppins text-xs text-[#2A2A2A]">
          {item.title}
        </p>
      </div>

      {/* mini bar chart */}
      {item.isGraph && (
        <div className="w-full h-10 mt-1 z-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="value" fill="#D2AD6C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatCard;
