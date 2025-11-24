import React from "react";
import ReportStatCard from "../components/reports/ReportStatCard";
import {  MdOutlineCloudDownload } from "react-icons/md";
import { LuCalendarCheck, LuFileChartColumn } from "react-icons/lu";
import { RiFilePdfLine } from "react-icons/ri";
import ReportsTable from "../components/reports/ReportsTable";

const Reports = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {/* Heading  */}
      <div className="w-full h-fit flex flex-row justify-between items-center gap-10">
        {/* Heading and Description */}
        <div>
          <h1 className="font-poppins font-semibold lg:text-3xl text-2xl capitalize text-primary">
            reports
          </h1>
          <p className="text-subText/70 text-[14px] font-normal font-poppins">
            Generate and manage system reports
          </p>
        </div>

       
      </div>

      {/* Stat Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        <ReportStatCard
          title={"Total Reports"}
          amount={1247}
          percentage={12}
          icon={LuFileChartColumn}
          duration={"vs last month"}
          bg={"bg-[#F3E8FF]"}
          text={"text-primary"}
        />

        <ReportStatCard
          title={"Generated today"}
          amount={47}
          percentage={8}
          icon={LuCalendarCheck}
          duration={"vs yesterday"}
          bg={"bg-[#DBEAFE]"}
          text={"text-[#2563EB]"}
        />
        <ReportStatCard
          title={"download count"}
          amount={8932}
          percentage={24}
          icon={MdOutlineCloudDownload}
          duration={"vs last week"}
          bg={"bg-[#DCFCE7]"}
          text={"text-[#16A34A]"}
        />
        <ReportStatCard
          title={"popular format"}
          amount={"PDF"}
          percentage={68}
          icon={RiFilePdfLine}
          duration={"of all reports"}
          bg={"bg-[#FFEDD5]"}
          text={"text-[#EA580C]"}
        />


      </div>


      {/* reports Table */}
      <div className="w-full h-fit">
        <ReportsTable />
      </div>


    </div>
  );
};

export default Reports;
