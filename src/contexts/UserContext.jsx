import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetUsers } from "../api/hooks";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // Pagination state kept inside context
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 6;

  // Call API using React Query hook
  const {
    data,
    isLoading,
    isError,
    isPending,
    refetch: refetchUsers,
  } = useGetUsers({ pageNo, pageSize, token });

  const [users, setUsers] = useState([]);
  const [statData, setStatData] = useState();
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    if (data?.data) {
      setUsers(data?.data.items);
      setStatData(data?.data.summary);
      setPagination({
        totalPages: data.data.totalPages,
        totalItems: data.data.totalItems,
      });
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        isError,
        isPending,
        refetchUsers,
        pageNo,
        setPageNo,
        pageSize,
        pagination,
        statData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
