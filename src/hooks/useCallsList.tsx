import { MOCK_CONTACTS } from "@/constants/contentCalls";
import { Contact } from "@/interfaces";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

interface CallsListContextDataProps {
  activeCallsList: any;
  setActiveCallsList: Dispatch<any>;
  results: any[];
  setResults: Dispatch<any>;
  handleAddContactToCallsList: (contact: Contact) => void;
  handlePlayCallsList: () => void;
}

interface CallsListProviderProps {
  children: ReactNode;
}

const CallsListContext = createContext<CallsListContextDataProps>(
  {} as CallsListContextDataProps
);

export default function CallsListContextProvider({
  children,
}: CallsListProviderProps) {
  const [activeCallsList, setActiveCallsList] = useState<any>();
  const [results, setResults] = useState(MOCK_CONTACTS);

  const handleEditCallsList = (name: string, contacts: string[]) => {};

  const handlePlayCallsList = () => {};

  const handleAddContactToCallsList = (contact: Contact) => {};

  return (
    <CallsListContext.Provider
      value={{
        activeCallsList,
        setActiveCallsList,
        results,
        setResults,
        handleAddContactToCallsList,
        handlePlayCallsList,
      }}
    >
      {children}
    </CallsListContext.Provider>
  );
}

export function useCallsList() {
  const context = useContext(CallsListContext);
  return context;
}
