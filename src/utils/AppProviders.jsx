import React from "react";
import { SchemeProvider } from "../contexts/SchemeContext";
import CombinedRefetchWrapper from "./CombinedRefetchWrapper";
import { UserProvider } from "../contexts/UserContext";
import { SearchProvider } from "../Contexts/SearchContext";

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <SchemeProvider>
        <CombinedRefetchWrapper>
          <SearchProvider>{children}</SearchProvider>
        </CombinedRefetchWrapper>
      </SchemeProvider>
    </UserProvider>
  );
}
