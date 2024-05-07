import { ISubscription, IPlanSubscriptionValue } from "@/@types/Subscription";
import User from "@/@types/User";
import { authenticate } from "@/api/auth/authenticate";
import { getProfile } from "@/api/auth/get-profile";
import api from "@/services/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGlobaLoading } from "./useGlobalLoading";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  isAuthenticated: boolean;
  plan: ISubscription;
  userDetail: User;
  handleSignIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [plan, setPlan] = useState({
    value: IPlanSubscriptionValue.Premium,
  } as ISubscription);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setGlobalLoading } = useGlobaLoading();

  const { data: userDetail, isPending } = useQuery({
    queryKey: ["user-detail", isAuthenticated],
    queryFn: getProfile,
  });

  const { mutateAsync: authenticateFn } = useMutation({
    mutationFn: authenticate,
  });

  useEffect(() => {
    setGlobalLoading(isPending);
  }, [isPending]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { token } = await authenticateFn({ email, password });

      localStorage.setItem("@CF-Token", token);
      api.defaults.headers.common["authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        plan,
        userDetail,
        handleSignIn,
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
