import React, { createContext, ReactNode, useContext } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const isAuthenticated = true;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
