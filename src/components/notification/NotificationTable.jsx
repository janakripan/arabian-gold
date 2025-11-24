import React, { useMemo, useState } from "react";
import { useSearch } from "../../Contexts/SearchContext";
import { notifications } from "../../constants";
import { FiPlus } from "react-icons/fi";
import SearchBar from "../shared/SearchBar";
import Select from "react-select";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "generating", label: "Generating" },
  { value: "failed", label: "Failed" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "investment", label: "Investment" },
  { value: "kyc", label: "KYC" },
  { value: "payment", label: "Payment" },
  { value: "user", label: "User" },
  { value: "scheme", label: "Scheme" },
];

const priorityOptions = [
  { value: "all", label: "All priority" },
  { value: "low", label: "Low " },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const TableFilters = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="w-full lg:w-3/4 h-full grid grid-cols-1 md:grid-cols-3 gap-3">
      <Select
        value={statusOptions.find((o) => o.value === statusFilter)}
        onChange={(option) => setStatusFilter(option?.value ?? "all")}
        options={statusOptions}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            display: "inline-flex",
            width: "100%", // ✅ Full width
            minWidth: "100%", // ✅ Ensures it doesn’t shrink
            borderRadius: "8px",
            borderColor: "#E5E7EB",
            backgroundColor: "#EFEFEF", // ✅ Background color added
            paddingLeft: "17px",
            paddingRight: "17px",
            fontSize: "14px",
            paddingTop: "9px",
            paddingBottom: "9px",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            paddingRight: "5px",
            rounded: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "visible",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 0",
            color: "#9CA3AF",
            width: "16px",
          }),
          indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
          menu: (provided) => ({ ...provided, fontSize: "14px" }),
        }}
      />
      <Select
        value={typeOptions.find((o) => o.value === typeFilter)}
        onChange={(option) => setTypeFilter(option?.value ?? "all")}
        options={typeOptions}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            display: "inline-flex",
            width: "100%", // ✅ Full width
            minWidth: "100%", // ✅ Ensures it doesn’t shrink
            borderRadius: "8px",
            borderColor: "#E5E7EB",
            backgroundColor: "#EFEFEF", // ✅ Background color added
            paddingLeft: "17px",
            paddingRight: "17px",
            fontSize: "14px",
            paddingTop: "9px",
            paddingBottom: "9px",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            paddingRight: "5px",
            rounded: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "visible",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 0",
            color: "#9CA3AF",
            width: "16px",
          }),
          indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
          menu: (provided) => ({ ...provided, fontSize: "14px" }),
        }}
      />
      <Select
        value={priorityOptions.find((o) => o.value === priorityFilter)}
        onChange={(option) => setPriorityFilter(option?.value ?? "all")}
        options={priorityOptions}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            display: "inline-flex",
            width: "100%", // ✅ Full width
            minWidth: "100%", // ✅ Ensures it doesn’t shrink
            borderRadius: "8px",
            borderColor: "#E5E7EB",
            backgroundColor: "#EFEFEF", // ✅ Background color added
            paddingLeft: "17px",
            paddingRight: "17px",
            fontSize: "14px",
            paddingTop: "9px",
            paddingBottom: "9px",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            paddingRight: "5px",
            rounded: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "visible",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 0",
            color: "#9CA3AF",
            width: "16px",
          }),
          indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
          menu: (provided) => ({ ...provided, fontSize: "14px" }),
        }}
      />
    </div>
  );
};

const NotificationTable = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { searchQuery } = useSearch();

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return notifications.filter((noti) => {
      const searchMatch =
        !q ||
        noti.title.toLowerCase().includes(q) ||
        noti.type.toLowerCase().includes(q) ||
        noti.id.toString().toLowerCase().includes(q) ||
        noti.status.toLowerCase().includes(q) ||
        noti.user.username.toLowerCase().includes(q) ||
        noti.user.email.toLowerCase().includes(q);

      const statusMatch =
        statusFilter === "all" || noti.status === statusFilter;

      const typeMatch = typeFilter === "all" || noti.type === typeFilter;

      const priorityMatch =
        priorityFilter === "all" || noti.priority === priorityFilter;

      return searchMatch && statusMatch && typeMatch && priorityMatch;
    });
  }, [searchQuery, statusFilter, typeFilter, priorityFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  const statusStyle = {
    sent: { text: "text-[#1D4ED8]", bg: "bg-[#DBEAFE]" },
    failed: { text: "text-[#991B1B]", bg: "bg-[#FEE2E2]" },
    delivered: { text: "text-[#166534]", bg: "bg-[#DCFCE7]" },
  };

  const typeStyle = {
    user: { text: "text-[#EA580C]" },
    scheme: { text: "text-[#DB2777]" },
    payment: { text: "text-[#16A34A]" },
    kyc: { text: "text-[#2563EB]" },
    investment: { text: "text-[#9333EA]" },
    welcome: { text: "text-[#9333EA]" },
  };

  const priorityStyle = {
    low: { text: "text-[#1F2937]", bg: "bg-[#F3F4F6]" },
    high: { text: "text-[#991B1B]", bg: "bg-[#FEE2E2]" },
    medium: { text: "text-[#854D0E]", bg: "bg-[#FEF9C3]" },
  };

  const getPageNumbers = () => {
    if (totalPages <= 2) return [1, 2].slice(0, totalPages);
    if (currentPage === 1) return [1, 2];
    if (currentPage === totalPages) return [totalPages - 1, totalPages];
    return [currentPage, currentPage + 1];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full h-fit flex flex-col rounded-lg border border-[#F3F4F6] bg-white shadow shadow-[#0000000D] mt-4">
      <div className="w-full h-fit flex flex-col p-5.75 gap-3.75 ">
        <div className="w-full h-fit flex justify-between items-center ">
          <h3 className="font-semibold font-poppins text-primary text-base">
            notification Management
          </h3>

          <button className="flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group hover:scale-103 transition-all duration-300 overflow-hidden active:scale-95">
            <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
            <FiPlus />{" "}
            <span className="hidden md:block">send notification</span>
          </button>
        </div>

        {/* search bar and filter  */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-center ">
          <div className="lg:w-1/4 w-full">
            <SearchBar />
          </div>
          <TableFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </div>
      </div>

      <div className="w-full h-fit overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {[
                "notification details ",
                "type",
                "priority",
                "recipient",
                "status",
                "channel",
                "actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left p-2.75 px-5.5 text-xs font-poppins capitalize font-normal text-[#6B7280]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((data, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-golden/20 transition-all duration-300"
                >
                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-col">
                      <h6 className="text-#111827 text-xs font-normal font-poppins capitalize">
                        {data.title}
                      </h6>
                      <p
                        className="text-[11px] max-w-[200px] font-normal font-poppins text-[#6B7280] truncate cursor-pointer"
                        title={data.message} // ✅ Tooltip with full text
                      >
                        {data.message.split(" ").length > 10
                          ? data.message.split(" ").slice(0, 10).join(" ") +
                            "..."
                          : data.message}
                      </p>
                      <p className="text-[11px] font-normal font-poppins text-subText/70">
                        {new Date(data.sentAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true, // ✅ ensures AM/PM format
                        })}
                      </p>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[14px]">
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full  ${
                        typeStyle[data.type].text
                      }`}
                    >
                      {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </div>
                  </td>
                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] font-bold text-[10px]">
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full  ${
                        priorityStyle[data.priority].bg
                      }  ${priorityStyle[data.priority].text}`}
                    >
                      {data.priority.charAt(0).toUpperCase() +
                        data.priority.slice(1)}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-col">
                      <p className="text-#111827 text-xs font-normal font-poppins capitalize">
                        {data.user.username}
                      </p>
                      <p className="text-[11px] font-normal font-poppins text-subText/70">
                        {data.user.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] font-bold text-[10px]">
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full  ${
                        statusStyle[data.status].bg
                      }  ${statusStyle[data.status].text}`}
                    >
                      {data.status.charAt(0).toUpperCase() +
                        data.status.slice(1)}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[#111827] text-[13px] capitalize font-poppins font-normal">
                    {data.channels.map((ch, i) => (
                      <React.Fragment key={i}>
                        {ch}
                        {i !== data.channels.length - 1 && " + "}
                        {(i + 1) % 2 === 0 && <br />}{" "}
                        {/* new line every 2 items */}
                      </React.Fragment>
                    ))}
                  </td>

                 

                  
                  {/* actions  */}

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit min-w-[100px] grid grid-cols-3 gap-2">
                      

                      <button className="hover:bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-sm text-[#2563EB] ">
                        <IoEyeOutline />
                      </button>


                      <button
                        className={`hover:bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-sm  text-[#16A34A]
                                                                         ${
                                                                          
                                                                           data.status ===
                                                                             "failed"
                                                                             ? "block"
                                                                             : "hidden"
                                                                         }
                                                                            `}
                      >
                        <TfiReload />
                      </button>

                      <button
                        className={`hover:bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-sm text-[#DC2626]  `}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-xs text-subText py-6"
                >
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
       {/* Pagination */}
        <div className="w-full flex justify-between items-center p-4 px-5.5">
          <p className="hidden md:block text-[10px] text-subText/70">
            Showing {itemsPerPage} reports of {filteredData.length} reports
          </p>

          <p className="md:hidden text-[10px] text-subText/70">
            Showing {currentData.length} / {filteredData.length} reports
          </p>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-[#E5E7EB] rounded-lg text-subText text-xs disabled:opacity-50"
            >
              Previous
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 border rounded-lg text-xs transition-all ${
                  currentPage === num
                    ? "bg-primary text-white border-primary"
                    : "border-[#E5E7EB] text-subText hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-[#E5E7EB] rounded-lg text-subText text-xs disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
