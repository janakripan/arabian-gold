import React, { useMemo, useState } from "react";
import Select from "react-select";
import { useSearch } from "../../contexts/SearchContext";
import { reportLogs } from "../../constants";
import SearchBar from "../shared/SearchBar";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin5Line, RiFilePdfLine, RiMailSendLine } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { LiaDownloadSolid } from "react-icons/lia";

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

const TableFilters = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="w-fit h-full flex gap-3">
      <Select
        value={statusOptions.find((o) => o.value === statusFilter)}
        onChange={(option) => setStatusFilter(option?.value ?? "all")}
        options={statusOptions}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            display: "inline-flex",
            width: "auto",
            minWidth: "120px",
            borderRadius: "8px",
            borderColor: "#E5E7EB",
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
            width: "auto",
            minWidth: "120px",
            borderRadius: "8px",
            borderColor: "#E5E7EB",
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

const ReportsTable = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { searchQuery } = useSearch();

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return reportLogs.filter((user) => {
      const searchMatch =
        !q ||
        user.title.toLowerCase().includes(q) ||
        user.type.toLowerCase().includes(q) ||
        user.id.toString().toLowerCase().includes(q) ||
        user.status.toLowerCase().includes(q) ||
        user.fileInfo.type.toLowerCase().includes(q) ||
        user.designation.toLowerCase().includes(q);

      const statusMatch =
        statusFilter === "all" || user.status === statusFilter;

      const kycMatch = typeFilter === "all" || user.type === typeFilter;

      return searchMatch && statusMatch && kycMatch;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  const statusStyle = {
    generating: { text: "text-[#1D4ED8]", bg: "bg-[#DBEAFE]" },
    failed: { text: "text-[#991B1B]", bg: "bg-[#FEE2E2]" },
    completed: { text: "text-[#166534]", bg: "bg-[#DCFCE7]" },
  };

  const typeStyle = {
    user: { text: "text-[#EA580C]" },
    scheme: { text: "text-[#DB2777]" },
    payment: { text: "text-[#16A34A]" },
    kyc: { text: "text-[#2563EB]" },
    investment: { text: "text-[#9333EA]" },
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
      {/* Searchbar , filters  and generate button*/}
      <div className="w-full h-fit flex flex-col p-5.75 gap-3.75 ">
        <div className="w-full h-fit flex justify-between items-center ">
          <h3 className="font-semibold font-poppins text-primary text-base">
            Report Management
          </h3>

          <button className="flex gap-1.75 items-center justify-center text-white bg-golden rounded-lg px-5.5 py-2.75 capitalize md:text-sm text-xl relative group hover:scale-103 transition-all duration-300 overflow-hidden active:scale-95">
            <div className="h-[80px] w-1/4 absolute rotate-45 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-30 group-hover:translate-x-35 transition-all duration-500" />
            <FiPlus /> <span className="hidden md:block">generate report</span>
          </button>
        </div>

        {/* search bar and filter  */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-center ">
          <div className="w-full">
            <SearchBar />
          </div>
          <TableFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full h-fit overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {[
                "report details ",
                "type",
                "status",
                "created by",
                "file info",
                "downloads",
                "actions",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left p-2.75 px-5.5 text-xs font-poppins capitalize font-normal text-subText"
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
                      <p className="text-[11px] font-normal font-poppins text-subText/70">
                        {data.id}
                      </p>
                      <p className="text-[11px] font-normal font-poppins text-subText/70">
                        {new Date(data.dateGenerated).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
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
                        statusStyle[data.status].bg
                      }  ${statusStyle[data.status].text}`}
                    >
                      {data.status.charAt(0).toUpperCase() +
                        data.status.slice(1)}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[#111827] text-[13px] capitalize font-poppins font-normal  ">
                    {data.designation}
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[#111827]   ">

                    <div className="w-full h-full flex items-center gap-1">
                      <div className="w-fit h-fit text-sm text-[#EF4444]">
                      <RiFilePdfLine />
                    </div>

                    <div className="flex flex-col items-start capitalize gap-0.25">
                      <span className=" text-[14px] font-poppins">
                        {data.fileInfo.type}
                      </span>
                      <span className=" text-[12px] font-poppins text-subText/70">
                        {data.fileInfo.size}
                      </span>
                    </div>

                    </div>
                    
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[#111827] text-[13px] capitalize font-poppins font-normal  ">
                    {data.downloads}
                  </td>

                  {/* actions  */}

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit grid grid-cols-3 gap-2">


                      <button
                        className={`hover:bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-sm  text-[#2563EB]
                                                             ${
                                                               data.status ===
                                                                 "generating" ||
                                                               data.status ===
                                                                 "failed"
                                                                 ? "hidden"
                                                                 : "block"
                                                             }
                                                                `}
                      >
                        <LiaDownloadSolid />
                      </button>


                      <button className="hover:bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-sm text-primary ">
                        <IoEyeOutline />
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

export default ReportsTable;
