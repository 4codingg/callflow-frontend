import { ISubscription, IPlanSubscriptionValue } from "@/@types/Subscription";
import User from "@/@types/User";
import { authenticate } from "@/api/auth/authenticate";
import { getProfile } from "@/api/auth/get-profile";
import api from "@/services/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, {
  createContext,
  ReactNode,
  useCallback,
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
  userDetail: User;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  const { setGlobalLoading } = useGlobaLoading();
  const router = useRouter();

  const {
    data: userDetail,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["user-detail", isAuthenticated],
    queryFn: getProfile,
  });

  const { mutateAsync: authenticateFn } = useMutation({
    mutationFn: authenticate,
  });

  useEffect(() => {
    setGlobalLoading(isPending);
  }, [isPending]);

  const validateUserSession = useCallback(async () => {
    const { "@cf.token": token } = parseCookies();
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    if (token) {
      try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const data = await refetch();
        if (data.isSuccess) {
          setIsAuthenticated(true);
        } else {
          handleSignOut();
        }
      } catch {
        handleSignOut;
      }
    }
  }, []);

  useEffect(() => {
    validateUserSession();
  }, []);

  const handleSignOut = () => {
    destroyCookie(undefined, "@cf.token");
    queryClient.invalidateQueries({
      queryKey: ["company-detail", "user-detail", isAuthenticated],
    });
    router.push("/");
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { token } = await authenticateFn({ email, password });

      setCookie(undefined, "@cf.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      validateUserSession();
    } catch (err) {
      handleSignOut();
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetail,
        handleSignIn,
        handleSignOut,
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
