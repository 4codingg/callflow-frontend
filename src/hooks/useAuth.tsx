import { ISubscription, IPlanSubscriptionValue } from '@/@types/Subscription';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  plan: ISubscription;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [plan, setPlan] = useState({
    value: IPlanSubscriptionValue.Plus,
  } as ISubscription);

  const isAuthenticated = true;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        plan,
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
