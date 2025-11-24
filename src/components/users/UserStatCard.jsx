import React from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const UserStatCard = ({ item }) => {
  const Icon = item.icon;
  const bgColor = hexToRgba(item.color, 0.12);

  const isPositive = item.percentage >= 0;
  const percentageText = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-col gap-4 p-5 bg-white rounded-[12px] transition-all duration-300">
      {/* icon and percentage */}
      <div className="flex flex-row justify-between items-center">
        {/* icon */}
        <div
          className="w-[48px] aspect-square rounded-lg flex items-center justify-center text-white text-lg"
          style={{
            backgroundColor: bgColor,
            color: item.color,
          }}
        >
          <Icon />
        </div>

        <div
          className={`${percentageText} rounded-full flex gap-1 py-[4px] px-2 items-center text-sm font-poppins`}
        >
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          <span>
            {isPositive
              ? `+${Math.abs(item.percentage)}%`
              : `-${Math.abs(item.percentage)}%`}
          </span>
        </div>
      </div>

      {/* data and name */}
      <div className="w-full flex flex-col items-start">
        <h5 className="text-[24px] font-semibold text-primary">
          {item.data}
        </h5>
        <p className="capitalize font-poppins text-xs text-subText/70">
          {item.title}
        </p>
      </div>
    </div>
  );
};

export default UserStatCard;
