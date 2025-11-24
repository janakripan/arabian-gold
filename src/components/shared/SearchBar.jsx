import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useSearch } from "../../contexts/SearchContext";

const SearchBar = () => {
  const { setSearchQuery } = useSearch();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex w-full items-center gap-1.5 border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg px-2">
      <div className="text-[#9CA3AF] text-base p-2 rounded-lg">
        <CiSearch />
      </div>
      <div className="w-full relative">
        <input
          type="text"
          name="query"
          placeholder="Search..."
          onChange={handleChange}
          className="w-full px-2 py-2 rounded-md focus:outline-none placeholder:text-xs placeholder:text-[#9CA3AF] text-[#411F47]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
