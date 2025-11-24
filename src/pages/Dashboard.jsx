import React from 'react';
import {
  dashboardKycData,
  dashboardSchemeData,
  dashboardStatData,
  recentActivities,
} from "../constants";
import StatCard from "../components/dashboard/StatCard";
import MonthlySchemeChart from "../components/dashboard/MonthlySchemeChart";
import { RiMoneyDollarCircleLine, RiUserLine } from "react-icons/ri";
import { FiAlertTriangle } from "react-icons/fi";
import { ShieldCheck } from "lucide-react";
import { AiOutlineAlert } from "react-icons/ai";
import CustomCoinIcon from "../custom-icons/DollarWithRing";
import { LuUserRoundPlus } from "react-icons/lu";

// Get the right icon for each activity
const getActivityIcon = (activity) => {
  if (activity.department === "user") {
    if (activity.message.toLowerCase().includes("registered"))
      return LuUserRoundPlus; // New user joined
    return RiUserLine;
  }

  if (activity.department === "kyc") return ShieldCheck;

  if (activity.department === "payments") {
    if (activity.message.toLowerCase().includes("overdue"))
      return AiOutlineAlert; // Payment overdue
    return RiMoneyDollarCircleLine;
  }

  if (activity.department === "schemes") return CustomCoinIcon;

  return FiAlertTriangle; // fallback
};

// Map type to Tailwind color
const getActivityColor = (activity) => {
  if (activity.type === "danger") return "text-red-500";
  if (activity.type === "info") return "text-blue-500";

  // success colors based on department
  if (activity.type === "success") {
    switch (activity.department) {
      case "user":
        return "text-[#2563EB]";
      case "kyc":
        return "text-[#411F47]";
      case "payments":
        return "text-[#16A34A]";
      case "schemes":
        return "text-[#D2AD6C]";
      default:
        return "text-[#16A34A]";
    }
  }

  return "text-gray-500"; // fallback
};

// Show relative time like "5 minutes ago"
const getRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = (now.getTime() - past.getTime()) / 1000; // seconds

  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {/* Stat cards */}
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStatData.map((itm, idx) => (
          <div key={idx} className="w-full h-fit">
            <StatCard item={itm} />
          </div>
        ))}
      </div>

      {/* Immediate actions */}
      <div className="w-full h-fit mt-2">
        <h3 className="text-lg font-poppins font-semibold tracking-normal text-[#411F47] mb-3">
          Requires immediate attention
        </h3>
        <div className="w-full h-fit flex lg:flex-row flex-col gap-4">
          {/* Overdue payments */}
          <div className="w-full h-fit lg:w-1/2 max-h-[380px] rounded-lg py-5 px-3.5 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F3F4F6]">
            <h4 className="font-semibold font-poppins text-primary text-base mb-4">
              Overdue Payments
            </h4>
            <div className="overflow-y-auto h-full max-h-64">
              <table className="w-full table-auto border-collapse">
                <thead className="border-b bg-white border-[#F3F4F6] sticky top-0">
                  <tr>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      user name
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      scheme
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      amount
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      due date
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardSchemeData.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {user.userName}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {user.scheme}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal text-[#DD8796] capitalize">
                        {user.amount}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {new Date(user.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        <button className="px-3.5 py-2 rounded-lg text-white text-[11px] font-normal text-center bg-[#411F47]">
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending KYC */}
          <div className="w-full h-fit lg:w-1/2 max-h-[380px] rounded-lg py-5 px-3.5 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F3F4F6] flex flex-col">
            <h4 className="font-semibold font-poppins text-[#411F47] text-base mb-4">
              Pending KYC
            </h4>
            <div className="overflow-y-auto h-full max-h-64">
              <table className="w-full table-auto border-collapse">
                <thead className="border-b bg-white border-[#F3F4F6] sticky top-0">
                  <tr>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      user name
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      date
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      id type
                    </th>
                    <th className="text-left tracking-[2px] text-xs font-poppins font-normal uppercase py-3 px-0.5">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardKycData.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {user.userName}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {new Date(user.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize">
                        {user.idType}
                      </td>
                      <td className="py-5 px-0.5 text-left tracking-tight text-sm font-poppins font-normal capitalize flex items-center gap-2">
                        <button className="px-3.5 py-2 rounded-lg text-white text-[11px] font-normal text-center bg-[#16A34A] capitalize">
                          view and approve
                        </button>
                        <button className="px-3.5 py-2 rounded-lg text-white text-[11px] font-normal text-center bg-[#DC2626] capitalize">
                          reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity + monthly VIP scheme */}
      <div className="w-full h-fit flex flex-col lg:flex-row gap-4">
        {/* Recent activity */}
        <div className="w-full h-full lg:w-1/2 rounded-lg py-5 px-3.5 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F3F4F6] flex flex-col">
          <h4 className="font-semibold font-poppins text-[#411F47] text-base mb-6 capitalize">
            recent activity
          </h4>
          <div className="w-full h-full max-h-[338px] flex flex-col gap-2 overflow-hidden overflow-y-scroll">
            {recentActivities.map((activity, idx) => {
              const Icon = getActivityIcon(activity);
              const colorClass = getActivityColor(activity);
              const relativeTime = getRelativeTime(activity.timestamp);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl"
                >
                  <div className="bg-[#F3F4F6] flex items-center justify-center rounded-full w-7 h-7 text-sm">
                    <Icon className={`w-[14px] ${colorClass}`} />
                  </div>
                  <div>
                    <p className="text-subText font-normal text-xs font-poppins">
                      {activity.message}
                    </p>
                    <span className="text-[#2A2A2A99] text-[10px]">
                      {relativeTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly VIP scheme */}
        <div className="w-full h-fit lg:w-1/2 rounded-lg py-5 px-3.5 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F3F4F6] flex flex-col">
          <h4 className="font-semibold font-poppins text-[#411F47] text-base mb-4 capitalize">
            monthly vip scheme
          </h4>
          <div className="w-full h-fit pb-5">
            <MonthlySchemeChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
