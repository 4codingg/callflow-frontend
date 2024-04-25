import { ISubscription, IPlanSubscriptionValue } from "@/@types/Subscription";
import User from "@/@types/User";
import { getProfile } from "@/api/auth/get-profile";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  plan: ISubscription;
  userDetail: User;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [plan, setPlan] = useState({
    value: IPlanSubscriptionValue.Premium,
  } as ISubscription);

  const { data: userDetail } = useQuery({
    queryKey: ["user-detail"],
    queryFn: getProfile,
  });

  const isAuthenticated = true;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        plan,
        userDetail: userDetail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
