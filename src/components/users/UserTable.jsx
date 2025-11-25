import React from "react";
import { useMemo } from "react";
import SearchBar from "../shared/SearchBar";
import { useSearch } from "../../contexts/SearchContext";
import { useUsers } from "../../contexts/UserContext";
import UserFilters from "./UserFilters";
import { Loader } from "../../utils/Loader";

const UserTable = () => {
  const { users, isLoading, pageNo, setPageNo, pagination, pageSize, filters } =
    useUsers();

  const { searchQuery } = useSearch();

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users?.filter((user) => {
      const searchMatch =
        !q ||
        user.userName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phoneNo.toString().includes(q) ||
        user.ID.toString().toLowerCase().includes(q) ||
        user.kycStatus.toLowerCase().includes(q) ||
        user.investment.toString().includes(q);

      return searchMatch;
    });
  }, [searchQuery, users]);

  const totalPages = Math.ceil(pagination.totalItems / pageSize);
  // const lastIndex = pageNo * pageSize;
  // const firstIndex = lastIndex - pageSize;
  const currentData = filteredData;

  const getInitials = (name) => {
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return "";
  };

  const kycStyles = {
    pending: { text: "text-[#854D0E]", bg: "bg-[#FEF9C3]" },
    rejected: { text: "text-[#991B1B]", bg: "bg-[#FEE2E2]" },
    verified: { text: "text-[#166534]", bg: "bg-[#DCFCE7]" },
  };

  const getPageNumbers = () => {
    if (totalPages <= 2) return [1, 2].slice(0, totalPages);
    if (pageNo === 1) return [1, 2];
    if (pageNo === totalPages) return [totalPages - 1, totalPages];
    return [pageNo, pageNo + 1];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full h-fit flex flex-col rounded-lg border border-[#F3F4F6] bg-white shadow shadow-[#0000000D] mt-4">
      {/* Searchbar and filters */}
      <div className="w-full h-fit flex flex-col ">
        <div className="w-full flex flex-col md:flex-row gap-4 items-center p-5.5">
          <div className="w-full">
            <SearchBar />
          </div>
          <UserFilters />
        </div>

        {filters && (
          <div className="w-full flex flex-wrap gap-2 px-5.5 pb-4">
            {/* Active Status */}
            {filters.IsActive !== null && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Status: {filters.IsActive === 1 ? "Active" : "Inactive"}
              </span>
            )}

            {/* KYC Status */}
            {filters.KYCStatus && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
                KYC: {filters.KYCStatus}
              </span>
            )}

            {/* Username */}
            {filters.UserName && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Username: {filters.UserName}
              </span>
            )}

            {/* Phone */}
            {filters.MobileNo && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Phone: {filters.MobileNo}
              </span>
            )}

            {/* Joined From */}
            {filters.JoinedFrom && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                From:{" "}
                {new Date(filters.JoinedFrom).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}

            {/* Joined To */}
            {filters.JoinedTo && (
              <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                To:{" "}
                {new Date(filters.JoinedTo).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full h-fit overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {[
                "user",
                "contact",
                "join date",
                "status",
                "KYC status",
                "investment",
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-16">
                  <div className="w-full flex justify-center items-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : currentData?.length > 0 ? (
              currentData?.map((user, idx) => (
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
                          {user.userID}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB]">
                    <div className="flex flex-col">
                      <span className="text-xs text-subText">{user.email}</span>
                      <span className="text-xs text-subText/70">
                        {user.mobileNo}
                      </span>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-subText">
                    {new Date(user?.joinedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className={`p-2.75 px-5.5 border-b border-[#E5E7EB] text-[10px] ${
                      user.isActive ? "text-[#166534]" : "text-[#1F2937]"
                    }`}
                  >
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full ${
                        user.isActive ? "bg-[#DCFCE7]" : "bg-[#F3F4F6]"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-[10px]">
                    <div
                      className={`p-0.5 px-2 w-fit rounded-full ${
                        kycStyles[user?.kycStatus?.toLowerCase()]?.bg
                      } ${kycStyles[user?.kycStatus?.toLowerCase()]?.text}`}
                    >
                      {user?.kycStatus.charAt(0).toUpperCase() +
                        user?.kycStatus.slice(1)}
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit flex flex-col">
                      <span>AED {user.investment}</span>
                      <span className="text-subText/70 text-[10px]">
                        {user?.schemes?.length} schemes
                      </span>
                    </div>
                  </td>

                  <td className="p-2.75 px-5.5 border-b border-[#E5E7EB] text-xs text-primary">
                    <div className="w-fit flex flex-col">
                      <span>AED {user.investment}</span>
                      <span className="text-subText/70 text-[10px]">
                        {user.schemes?.length} schemes
                      </span>
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
            Showing {pageSize} users of {pagination.totalItems} users
          </p>

          <p className="md:hidden text-[10px] text-subText/70">
            Showing {currentData.length} / {filteredData.length} users
          </p>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
              disabled={pageNo === 1}
              className="px-3 py-1 border border-[#E5E7EB] rounded-lg text-subText text-xs disabled:opacity-50"
            >
              Previous
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setPageNo(num)}
                className={`px-3 py-1 border rounded-lg text-xs transition-all ${
                  pageNo === num
                    ? "bg-primary text-white border-primary"
                    : "border-[#E5E7EB] text-subText hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setPageNo((prev) => Math.min(prev + 1, totalPages))
              }
             disabled={currentData.length < pageSize || pageNo === totalPages}
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

export default UserTable;
