import React from 'react';
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "May", policies: 45 },
  { month: "Jun", policies: 60 },
  { month: "Jul", policies: 55 },
  { month: "Aug", policies: 70 },
  { month: "Sep", policies: 80 },
  { month: "Oct", policies: 65 },
];

const growthPercentage = ((65 - 80) / 80) * 100; // Replace with dynamic calc
const growthText = `${growthPercentage > 0 ? "+" : ""}${growthPercentage.toFixed(1)}%`;

const MonthlySchemeChart = () => {
  const renderCustomLegend = () => (
    <div className="flex items-center justify-between w-full px-4 pl-10 pt-5 mb-2">
      {/* Left side - Legend */}
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: "linear-gradient(to top, #DD8796, #F9C5C5)",
          }}
        ></div>
        <span className="text-sm font-medium text-gray-700">Subscriptions</span>
      </div>

      {/* Right side - Growth percentage */}
      <div className="flex items-center gap-1">
        {growthPercentage > 0 ? (
          <GoArrowUp className="text-green-500" />
        ) : (
          <GoArrowDown className="text-red-500" />
        )}
        <span
          className={`font-medium ${
            growthPercentage > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {growthText}
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[325px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: -30 }}
          barCategoryGap="20%"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient id="policyGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#DD8796" />
              <stop offset="100%" stopColor="#F9C5C5" />
            </linearGradient>
          </defs>

          <Tooltip />
          <Bar
            dataKey="policies"
            fill="url(#policyGradient)"
            barSize={60}
            radius={[4, 4, 0, 0]} // Rounded top corners
          />

          <CartesianGrid vertical={false} stroke="#F3F4F6" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#2A2A2AB2",
              fontSize: 12,
              fontWeight: 400,
              dy: 6,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#2A2A2AB2",
              fontSize: 12,
              fontWeight: 400,
              dy: 6,
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="left"
            content={renderCustomLegend}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySchemeChart;
