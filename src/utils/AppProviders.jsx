import React from "react";
import { SchemeProvider } from "../contexts/SchemeContext";
import { SearchProvider } from "../Contexts/SearchContext";
import CombinedRefetchWrapper from "./CombinedRefetchWrapper";
import { UserProvider } from "../contexts/UserContext";

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
