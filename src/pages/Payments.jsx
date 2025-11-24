import React from "react";
import { RiDownloadLine } from "react-icons/ri";
import PaymentStatCard from "../components/payments/PaymentStatCard";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineAlert } from "react-icons/ai";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import PaymentsTable from "../components/payments/PaymentsTable";


const Payments = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {/* Heading and Add Scheme Button */}
      <div className="w-full h-fit flex flex-row justify-between items-center gap-10">
        {/* Heading and Description */}
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl text-2xl capitalize text-primary">
            payment management
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins">
            Track and manage all customer payments and installments
          </p>
        </div>

        {/* Add Scheme Button */}
        <button className="flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group hover:scale-103 transition-all duration-300 overflow-hidden active:scale-95">
          <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
          <RiDownloadLine />{" "}
          <span className="hidden md:block">Export Report</span>
        </button>
      </div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PaymentStatCard
          title={"Total Payments"}
          amount={124000}
          percentage={12}
          icon={HiOutlineCurrencyDollar}
        />

        <PaymentStatCard
          title={"Pending Payments"}
          amount={124000}
          percentage={-3.2}
          icon={LuClock3}
        />

        <PaymentStatCard
          title={"Overdue Payments"}
          amount={124000}
          percentage={-8.7}
          icon={AiOutlineAlert}
        />

        <PaymentStatCard
          title={"Completed today"}
          amount={124000}
          percentage={18.7}
          icon={MdOutlineCheckCircleOutline}
        />
      </div>

      {/* payments Table */}
      <div className="w-full h-fit">
        <PaymentsTable />
      </div>

    </div>
  );
};

export default Payments;
