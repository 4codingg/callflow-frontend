import Company from "@/@types/Company";
import { getCompanyDetail } from "@/api/company/get-company-detail";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CompanyProviderProps {
  children: ReactNode;
}

export interface CompanyContextDataProps {
  companyDetail: Company;
}

const CompanyContext = createContext<CompanyContextDataProps>(
  {} as CompanyContextDataProps
);

export function CompanyContextProvider({ children }: CompanyProviderProps) {
  const { data: companyDetail } = useQuery({
    queryKey: ["company-detail"],
    queryFn: getCompanyDetail,
  });

  return (
    <CompanyContext.Provider
      value={{
        companyDetail,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  return context;
}
