import React, { useState, useEffect } from "react";
import { useUsers } from "../../contexts/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";

const statusOptions = [
  { value: null, label: "All Status" },
  { value: 1, label: "Active" },
  { value: 0, label: "Inactive" },
];

const kycOptions = [
  { value: "", label: "All KYC" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "approved", label: "Approved" },
];

const filterTabs = [
  { id: "status", label: "Status Filters" },
  { id: "date", label: "Date Range" },
  { id: "filterby", label: "Filter By" },
];

export default function UserFilters() {
  const { filters, setFilters, setPageNo } = useUsers();
  const queryclient = useQueryClient();

  // Fallback filters to avoid undefined crash
  const safeFilters =
    filters && typeof filters === "object"
      ? filters
      : {
          IsActive: null,
          KYCStatus: "",
          JoinedFrom: "",
          JoinedTo: "",
          UserName: "",
        };
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("status");
  const [localFilters, setLocalFilters] = useState(filters);

  // Keep UI synced after Apply/API/pagination
  useEffect(() => {
    if (!filters) return;
    setLocalFilters(filters);
  }, [filters]);

  const updateLocal = (key, value) =>
    setLocalFilters((prev) => ({ ...prev, [key]: value }));

  const handleApply = () => {
    setFilters(localFilters);
    queryclient.invalidateQueries["getUsers"];
    setPageNo(1);
    setIsOpen(false);
  };

  const handleReset = () => {
    const cleared = {
      IsActive: null,
      KYCStatus: "",
      JoinedFrom: "",
      JoinedTo: "",
      UserName: "",
    };
    setLocalFilters(cleared);
    setFilters(cleared);
    setPageNo(1);
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown container */}
          <div className="absolute top-full mt-2 rounded-xl  right-0 bg-white shadow-2xl w-[600px] z-50 flex flex-col border border-gray-200">
            {/* Body */}
            <div className="flex overflow-hidden max-h-[400px]">
              {/* Tabs */}
              <div className="w-40 bg-gray-50 p-2 border-r border-gray-300 flex flex-col">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 text-left rounded-lg text-sm font-medium transition-colors border-l-4 ${
                      activeTab === tab.id
                        ? "bg-primary text-white border-primary"
                        : "text-gray-700 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Right content */}
              <div className="flex-1 p-5 pb-8 overflow-y-auto">
                {/* STATUS TAB */}
                {activeTab === "status" && (
                  <div className="space-y-5 ">
                    {/* Active Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Active Status
                      </label>
                      <Select
                        value={
                          statusOptions.find(
                            (o) => o.value === localFilters.IsActive
                          ) || statusOptions[0]
                        }
                        onChange={(opt) => updateLocal("IsActive", opt.value)}
                        options={statusOptions}
                        isSearchable={false}
                        styles={customSelectStyles}
                      />
                    </div>

                    {/* KYC Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        KYC Status
                      </label>
                      <Select
                        value={
                          kycOptions.find(
                            (o) => o.value === localFilters.KYCStatus
                          ) || kycOptions[0]
                        }
                        onChange={(opt) => updateLocal("KYCStatus", opt.value)}
                        options={kycOptions}
                        isSearchable={false}
                        styles={customSelectStyles}
                      />
                    </div>
                  </div>
                )}

                {/* DATE TAB */}
                {activeTab === "date" && (
                  <div className="space-y-5">
                    {/* Joined From */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Joined From
                      </label>
                      <DatePicker
                        selected={
                          localFilters.JoinedFrom
                            ? new Date(localFilters.JoinedFrom)
                            : null
                        }
                        onChange={(date) =>
                          updateLocal(
                            "JoinedFrom",
                            date?.toISOString().slice(0, 10) ?? ""
                          )
                        }
                        className="border border-gray-300 p-2.5 rounded-lg text-sm w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholderText="Select start date"
                        dateFormat="MMM dd, yyyy"
                      />
                    </div>

                    {/* Joined To */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Joined To
                      </label>
                      <DatePicker
                        selected={
                          localFilters.JoinedTo
                            ? new Date(localFilters.JoinedTo)
                            : null
                        }
                        onChange={(date) =>
                          updateLocal(
                            "JoinedTo",
                            date?.toISOString().slice(0, 10) ?? ""
                          )
                        }
                        className="border border-gray-300 p-2.5 rounded-lg text-sm w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholderText="Select end date"
                        dateFormat="MMM dd, yyyy"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "filterby" && (
                  <div className="space-y-5">
                    {/* User Name Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Name
                      </label>
                      <input
                        type="text"
                        value={localFilters.UserName}
                        onChange={(e) =>
                          updateLocal("UserName", e.target.value)
                        }
                        className="border border-gray-300 p-2.5 rounded-lg text-sm w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Enter user name"
                      />
                    </div>

                    {/* Mobile Number Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={localFilters.MobileNo}
                        onChange={(e) =>
                          updateLocal("MobileNo", e.target.value)
                        }
                        className="border border-gray-300 p-2.5 rounded-lg text-sm w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-300 bg-gray-50">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "8px",
    borderColor: "#D1D5DB",
    fontSize: "14px",
    minHeight: "42px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9CA3AF",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#6B7280",
    "&:hover": {
      color: "#374151",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "14px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    backgroundColor: state.isSelected
      ? "var(--primary-color, #3B82F6)"
      : state.isFocused
      ? "#F3F4F6"
      : "white",
    "&:active": {
      backgroundColor: "var(--primary-color, #3B82F6)",
    },
  }),
};
