import React from "react";

const NotificationStatCard = ({
  title,
  amount,
  percentage,
  icon,
  duration,
  bg,
  text,
}) => {
  const Icon = icon;
  return (
    <div className="w-full h-fit border border-[#DEDFE1] shadow-xl hover:drop-shadow-2xl drop-shadow-[#0000000D] flex flex-col  justify-between gap-4 p-5.5 bg-white rounded-[12px] transition-all duration-300">
      {/* data  */}

      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="overflow-hidden pr-1">
          <p className="text-[12.5px] whitespace-nowrap text-subText/70 font-poppins capitallize ">
            {title}
          </p>

          <h3 className="text-subText font-semibold text-[24px]  ">{amount}</h3>
        </div>

        {/* icon  */}

        <div className={`${bg} ${text} text-base p-3.5 rounded-lg`}>
          <Icon />
        </div>
      </div>

      <div className="text-[12px] whitespace-nowrap text-subText/70 flex flex-row items-center gap-0.75 ">
        <div
          className={` whitespace-nowrap flex flex-row text-[12px] items-center gap-0.5 p-1 px-1.75 rounded-full ${
            percentage < 0
              ? "text-[#DC2626] bg-[#FEE2E2]"
              : "text-[#16A34A] bg-[#DCFCE7]"
          }`}
        >
          {percentage > 0 ? "+" : ""} {percentage}%
        </div>{" "}
        {duration}
      </div>
    </div>
  );
};

export default NotificationStatCard;
