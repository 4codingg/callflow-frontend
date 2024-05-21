import Company from "@/@types/Company";
import { IPaymentMethod } from "@/@types/PaymentMethod";
import { ISubscription } from "@/@types/Subscription";
import { getCompanyDetail } from "@/api/company/get-company-detail";
import { getCompanyPaymentMethods } from "@/api/wallet/get-company-payments-methods";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./useAuth";

export interface CompanyProviderProps {
  children: ReactNode;
}

export interface CompanyContextDataProps {
  companyDetail: Company;
  plan: ISubscription;
  paymentsMethods: IPaymentMethod[];
}

const CompanyContext = createContext<CompanyContextDataProps>(
  {} as CompanyContextDataProps
);

export function CompanyContextProvider({ children }: CompanyProviderProps) {
  const { isAuthenticated } = useAuth();

  const { data: companyDetail } = useQuery({
    queryKey: ["company-detail", isAuthenticated],
    queryFn: getCompanyDetail,
  });

  const { data: paymentsMethods } = useQuery({
    queryKey: ["company-payment-methods"],
    queryFn: () => getCompanyPaymentMethods(),
  });

  const plan: ISubscription = companyDetail?.plan || ({} as ISubscription);

  return (
    <CompanyContext.Provider
      value={{
        companyDetail,
        plan,
        paymentsMethods,
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
