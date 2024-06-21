import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from '@/utils/toast';
import {
  updateContactsList,
  deleteContact,
  getContactsListDetail,
} from '@/api/contactsList';
import { IPlanSubscriptionValue } from '@/@types/Subscription';
import { formatResultsToFreePlanFormat, formatCsvToJson } from '@/utils';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';
import { useCompany } from '@/hooks/useCompany';
import { GetContactsListDetailResponse } from '@/api/contactsList/get-contacts-list-detail';

export interface ContactsListProviderProps {
  children: ReactNode;
}

export interface ContactsListContextDataProps {
  handleUploadAccepted: (resultsFromCsv: any[]) => void;
  handleSave: () => Promise<void>;
  handleDeleteContactItem: (contactId: string) => Promise<void>;
  setModalStepByStepIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalAddItemContactListIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalUploadCSVIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalEditContactsListIsOpen: Dispatch<SetStateAction<boolean>>;
  modalAddItemContactListIsOpen: boolean;
  modalUploadCSVIsOpen: boolean;
  modalEditContactsListIsOpen: boolean;
  modalStepByStepIsOpen: boolean;
  contactsListDetail: GetContactsListDetailResponse;
  results: any[];
  dataTableIsEmpty: boolean;
  existsPendingDocuments: boolean;
  pendingDocuments: any[];
}

const ContactsListContext = createContext<ContactsListContextDataProps>(
  {} as ContactsListContextDataProps
);

export const ContactsListContextProvider = ({
  children,
}: ContactsListProviderProps) => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);
  const [modalUploadCSVIsOpen, setModalUploadCSVIsOpen] = useState(false);
  const [modalEditContactsListIsOpen, setModalEditContactsListIsOpen] =
    useState(false);
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { setGlobalLoading } = useGlobalLoading();
  const { plan } = useCompany();

  const contactsListId = router.query.id as string;
  const dataTableIsEmpty = results.length === 0;
  const existsPendingDocuments = pendingDocuments.length > 0;

  const { data: contactsListDetail } = useQuery({
    queryKey: ['contacts-list-detail', contactsListId],
    queryFn: () => getContactsListDetail({ contactsListId }),
  });

  const { mutateAsync: updateContactsListFn } = useMutation({
    mutationFn: updateContactsList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts-list-detail', contactsListId],
      });
    },
  });

  const { mutateAsync: deleteContactFn } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts-list-detail', contactsListId],
      });
    },
  });

  const handleUploadAccepted = (resultsFromCsv: any[]) => {
    const allResults = resultsFromCsv.flatMap((res) => {
      let formattedResults = formatCsvToJson(res.data);
      if (plan.value === IPlanSubscriptionValue.Free) {
        formattedResults = formatResultsToFreePlanFormat(formattedResults);
      }
      return formattedResults;
    });

    setPendingDocuments((prev) => [...prev, ...allResults]);
    setResults((prev) => [...prev, ...allResults]);
  };

  const handleSave = async () => {
    try {
      const { invalidateContacts } = await updateContactsListFn({
        contactsListId,
        contacts: pendingDocuments,
      });

      setPendingDocuments([]);
      if (invalidateContacts.length) {
        handleFormatResults();
        toast('warning', 'Alguns contatos não puderam ser salvos.');
        return;
      }
      toast('success', 'Lista salva com sucesso!');
    } catch {
      toast('error', 'Algo deu errado.');
    }
  };

  const handleDeleteContactItem = async (contactId: string) => {
    setGlobalLoading(true);
    try {
      await deleteContactFn({ contactId });
      toast('success', 'Contato deletado com sucesso.');
    } catch {
      toast('error', 'Algo deu errado.');
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleFormatResults = useCallback(() => {
    if (contactsListDetail) {
      const formattedResults = contactsListDetail.contacts?.map((contact) => ({
        ...contact.data,
        id: contact.id,
      }));
      setResults(formattedResults || []);
    }
  }, [contactsListDetail]);

  useEffect(() => {
    handleFormatResults();
  }, [handleFormatResults]);

  return (
    <ContactsListContext.Provider
      value={{
        handleDeleteContactItem,
        handleUploadAccepted,
        handleSave,
        setModalStepByStepIsOpen,
        setModalAddItemContactListIsOpen,
        setModalEditContactsListIsOpen,
        setModalUploadCSVIsOpen,
        modalStepByStepIsOpen,
        modalAddItemContactListIsOpen,
        modalEditContactsListIsOpen,
        modalUploadCSVIsOpen,
        contactsListDetail,
        results,
        dataTableIsEmpty,
        existsPendingDocuments,
        pendingDocuments,
      }}
    >
      {children}
    </ContactsListContext.Provider>
  );
};

export const useContactsList = () => {
  const context = useContext(ContactsListContext);
  return context;
};
