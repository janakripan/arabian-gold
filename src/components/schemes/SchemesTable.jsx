import React, { useMemo, useState } from "react";
import { useSearch } from "../../contexts/SearchContext";
import SearchBar from "../shared/SearchBar";
import Select from "react-select";
import { useScheme } from "../../contexts/SchemeContext";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const TableFilters = ({ statusFilter, setStatusFilter }) => {
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
    </div>
  );
};

const SchemesTable = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { searchQuery } = useSearch();
  const {schemes,isLoading,isPending,isError} = useScheme()

  console.log(schemes)

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return schemes?.filter((scheme) => {
      const searchMatch =
        !q ||
        scheme?.schemeName.toLowerCase().includes(q) ||
        scheme?.description.toLowerCase().includes(q) ||
        scheme?.installment.toString().includes(q) ||
        scheme?.id.toString().toLowerCase().includes(q) ||
        scheme?.tenure.toString().includes(q);

      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "active" && scheme?.isActive) ||
        (statusFilter === "inactive" && !scheme?.isActive);

      return searchMatch && statusMatch;
    });
  }, [searchQuery, statusFilter,schemes]);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData?.slice(firstIndex, lastIndex);

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
        />
      </div>

      {/* Table */}
      <div className="w-full h-fit overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {[
                "scheme",
                "tenure",
                "minimum installment",
                "status",
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
            {currentData?.length > 0 ? (
              currentData.map((scheme, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-golden/20 transition-all duration-300"
                >
                  <td className="p-2.75 px-5.5 max-w-32 border-b border-[#E5E7EB]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col">
                        <h6 className="text-primary text-sm font-medium font-poppins capitalize">
                          {scheme.schemeName}
                        </h6>
                        <p className="text-xs font-normal font-inter text-subText/70">
                          {scheme.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-col">
                      <span className="text-xs text-subText">
                        {scheme.schemePeriodMonths} months
                      </span>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit flex flex-col font-inter font-semibold ">
                      <span>AED {scheme.isSameEveryMonth?
 Math.round(scheme.totalAmount/scheme.schemePeriodMonths):Math.min(...scheme.months.map(m=>m.amount))}</span>
                    </div>
                  </td>

                  <td
                    className={`p-2.75 px-5.5 border-b border-[#E5E7EB] text-[10px] ${
                      scheme.isActive ? "text-[#166534]" : "text-[#1F2937]"
                    }`}
                  >
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full ${
                        scheme.isActive ? "bg-[#DCFCE7]" : "bg-[#F3F4F6]"
                      }`}
                    >
                      {scheme.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flexrow items-center gap-2 w-full h-full">
                      <button className="text-primary font-poppins text-xs hover:underline hover:underline-offset-1 p-0.5 transition-all duration-300 ">
                        Edit
                      </button>

                      <button
                        className={`text-[#DC2626] font-poppins text-xs hover:underline hover:underline-offset-1 p-0.5 transition-all duration-300 
                        ${scheme.isActive ? "block" : "hidden"}`}
                      >
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-xs text-subText py-6 "
                >
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-full flex justify-between items-center p-4 px-5.5">
          <p className="hidden md:block text-[10px] text-subText/70">
            Showing {itemsPerPage} schemes of {filteredData?.length} schemes
          </p>

          <p className="md:hidden text-[10px] text-subText/70">
            Showing {currentData?.length} / {filteredData?.length} Schemes
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

export default SchemesTable;
