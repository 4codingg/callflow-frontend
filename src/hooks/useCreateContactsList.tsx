import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface CreateContactsListProviderProps {
  children: ReactNode;
}

export interface CreateContactsListData {
  variables: string[];
}

const CreateContactsListContext = createContext<CreateContactsListData>(
  {} as CreateContactsListData
);

export function CreateContactsListContextProvider({
  children,
}: CreateContactsListProviderProps) {
  const [listName, setListName] = useState('');
  const [variables, setVariables] = useState([]);
  const [contacts, setContacts] = useState([]);

  return (
    <CreateContactsListContext.Provider
      value={{
        variables,
      }}
    >
      {children}
    </CreateContactsListContext.Provider>
  );
}

export function useCreateContactsList() {
  const context = useContext(CreateContactsListContext);
  return context;
}
