import React, { createContext, useState, useContext } from "react";

interface GlobalLoadingData {
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalLoadingContext = createContext({} as GlobalLoadingData);

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

export const GlobalLoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <GlobalLoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </GlobalLoadingContext.Provider>
  );
};

export function useGlobaLoading() {
  const context = useContext(GlobalLoadingContext);
  return context;
}
