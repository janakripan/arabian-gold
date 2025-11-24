import { createContext, useContext, useEffect, useState } from "react";
import { useGetScheme } from "../api/hooks";
import React from "react";

const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const {
    data,
    isError,
    isLoading,
    isPending,
    refetch: refetchScheme,
  } = useGetScheme({ enabled: !!token });

  const [schemes, setSchemes] = useState();
  console.log(data?.data)

  useEffect(() => {
    setSchemes(data?.data);
  }, [data]);

  return (
    <SchemeContext.Provider
      value={{ schemes, isError, isLoading, isPending, refetchScheme }}
    >
      {children}
    </SchemeContext.Provider>
  );
};

export const useScheme = () => useContext(SchemeContext);
