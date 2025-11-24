import React, { useMemo, useState } from "react";
import { useSearch } from "../../Contexts/SearchContext";
import { kycData } from "../../constants";
import SearchBar from "../shared/SearchBar";
import Select from "react-select";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "verified", label: "Verified" },
];

const docOptions = [
  { value: "all", label: "All Documents" },
  { value: 1, label: "Level 1" },
  { value: 2, label: "Level 2" },
  { value: 3, label: "Level 3" },
];

const TableFilters = ({
  statusFilter,
  setStatusFilter,
  docFilter,
  setDocFilter,
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
        value={docOptions.find((o) => o.value === docFilter)}
        onChange={(option) => setDocFilter(option?.value ?? "all")}
        options={docOptions}
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

const KycTable = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [docFilter, setDocFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { searchQuery } = useSearch();

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return kycData.filter((user) => {
      const searchMatch =
        !q ||
        user.userName.toLowerCase().includes(q) ||
        user.level.toString().includes(q) ||
        user.aadhaarNumber.toString().includes(q) ||
        user.ID.toString().toLowerCase().includes(q) ||
        user.status.toLowerCase().includes(q) ||
        user.priority.toString().includes(q);

      const statusMatch =
        statusFilter === "all" || user.status === statusFilter;

      const docMatch = docFilter === "all" || user.level === docFilter;

      return searchMatch && statusMatch && docMatch;
    });
  }, [searchQuery, statusFilter, docFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  const getInitials = (name) => {
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return "";
  };

  const statusStyles = {
    pending: { text: "text-[#854D0E]", bg: "bg-[#FEF9C3]" },
    rejected: { text: "text-[#991B1B]", bg: "bg-[#FEE2E2]" },
    verified: { text: "text-[#166534]", bg: "bg-[#DCFCE7]" },
    underreview: { text: "text-[#1E40AF]", bg: "bg-[#DBEAFE]" },
  };

  const priorityStyles = {
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
      {/* Searchbar and filters */}
      <div className="w-full flex flex-col md:flex-row gap-4 items-center p-5.5">
        <div className="w-full">
          <SearchBar />
        </div>
        <TableFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          docFilter={docFilter}
          setDocFilter={setDocFilter}
        />
      </div>

      {/* Table */}
      <div className="w-full h-fit overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {[
                "applicant",
                "document details",
                "submitted",
                "status",
                "priority",
                "reviewed by",
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
              currentData.map((user, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-golden/20 transition-all duration-300"
                >
                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex items-center justify-center text-white bg-primary uppercase rounded-full aspect-square w-[40px] text-sm">
                        {getInitials(user.userName)}
                      </div>
                      <div className="flex flex-col">
                        <h6 className="text-primary text-xs font-normal font-poppins capitalize">
                          {user.userName}
                        </h6>
                        <p className="text-xs font-normal font-poppins text-subText/70">
                          {user.ID}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-col">
                        <span className="text-xs text-subText">Aadhar Card</span>
                      <span className="text-xs text-subText/70">{user.aadhaarNumber}</span>
                      <span className="text-xs text-golden">
                        Level {user.level}
                      </span>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-subText">
                    {new Date(user.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[10px]">
                    {(() => {
                      const normalizedStatus = user.status
                        .replace(/\s+/g, "")
                        .toLowerCase();
                      const style = statusStyles[normalizedStatus] || {
                        bg: "bg-gray-100",
                        text: "text-gray-800",
                      };
                      return (
                        <div
                          className={`p-0.5 px-2 w-fit rounded-full ${style.bg} ${style.text}`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </div>
                      );
                    })()}
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[10px]">
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full ${
                        priorityStyles[user.priority].bg
                      } ${priorityStyles[user.priority].text}`}
                    >
                      {user.priority.charAt(0).toUpperCase() +
                        user.priority.slice(1)}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-subText">
                    <div className="w-fit flex flex-col text-center">
                      {user.reviewed? user.reviewed : "-"}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit grid grid-cols-3 gap-2">

                        <button className="bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-base ">
                                <IoEyeOutline />
                        </button>

                         <button className={`bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-base text-[#16A34A]
                         ${user.reviewed?"hidden" : "block"}
                            `}>
                                <FaRegCircleCheck />
                        </button>

                         <button className={`bg-[#ECECEC] transition-all duration-300 rounded-lg p-2 hover:shadow hover:scale-103 active:scale-95 text-base text-[#DC2626]
                         ${user.reviewed?"hidden" : "block"}
                            `}>
                                <FaRegCircleXmark />
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
            Showing {itemsPerPage} users of {filteredData.length} users
          </p>

          <p className="md:hidden text-[10px] text-subText/70">
            Showing {currentData.length} / {filteredData.length} users
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

export default KycTable;
