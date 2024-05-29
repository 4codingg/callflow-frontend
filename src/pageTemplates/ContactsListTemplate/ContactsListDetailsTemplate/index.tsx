import {
  DropdownMenu,
  LayoutWithSidebar,
  Paragraph,
  Button,
  EmptyState,
} from "@/components";
import { ModalAddItemContactList } from "@/components/layouts/Modals/ModalAddItemContact";
import { ModalUploadCsv } from "@/components/layouts/Modals/ModalUploadCsv";
import { formatCsvToJson } from "@/utils/formatCsvToJson";
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  PlusCircle,
  Upload,
  Warning,
} from "phosphor-react";
import { useEffect, useState } from "react";
import Empty from "@/assets/empty-state.png";
import { ModalEditNameContactsList } from "@/components/layouts/Modals/ModalEditNameContactsList";
import { updateContactsList } from "@/api/contactsList/update-contacts-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getContactsListDetail } from "@/api/contactsList/get-contacts-list-detail";
import { TableContacts } from "@/components/layouts/Tables/TableContacts";
import { toast } from "@/utils/toast";
import { deleteContact } from "@/api/contactsList/delete-contact-item";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import { useCompany } from "@/hooks/useCompany";
import { IPlanSubscriptionValue } from "@/@types/Subscription";
import { formatResultsToFreePlanFormat } from "@/utils/formatResultsToFreePlanFormat";
import { Tipbox } from "@/components/Tipbox";
import { CrumbsContactsListDetail } from "./CrumbsContactsListDetail";
import { DropdownActions } from "./DropdownActions";

export const ContactsListDetailsTemplate = () => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);
  const [modalUploadCSVIsOpen, setModalUploadCSVIsOpen] = useState(false);
  const [modalEditNameContactsListIsOpen, setModalEditNameContactsListIsOpen] =
    useState(false);
  const [results, setResults] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { setGlobalLoading } = useGlobalLoading();
  const { plan } = useCompany();
  const contactsListId = router.query.id as string;

  const { mutateAsync: updateContactsListFn } = useMutation({
    mutationFn: updateContactsList,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["contacts-list-detail", contactsListDetail.id],
      });
    },
  });

  const { mutateAsync: deleteContactFn } = useMutation({
    mutationFn: deleteContact,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["contacts-list-detail", contactsListDetail.id],
      });
    },
  });

  const { data: contactsListDetail } = useQuery({
    queryKey: ["contacts-list-detail", contactsListId],
    queryFn: () => getContactsListDetail({ contactsListId }),
  });

  const handleUploadAccepted = (resultsFromCsv: any[]) => {
    for (const res of resultsFromCsv) {
      let resultsFormatted = formatCsvToJson(res.data);

      if (plan.value === IPlanSubscriptionValue.Free) {
        resultsFormatted = formatResultsToFreePlanFormat(resultsFormatted);
      }

      setPendingDocuments((prevResults) => [
        ...prevResults,
        ...resultsFormatted,
      ]);
      setResults((prevResults) => [...prevResults, ...resultsFormatted]);
    }
  };

  const handleSave = async () => {
    try {
      const { invalidateContacts } = await updateContactsListFn({
        contactsListId: contactsListId,
        contacts: pendingDocuments,
      });

      console.log("==> ", invalidateContacts);

      setPendingDocuments([]);

      if (!!invalidateContacts.length) {
        toast("warning", "Alguns contatos não puderam ser salvos.");
        return;
      }

      toast("success", "Lista salva com sucesso!");
    } catch (err) {
      toast("error", "Algo deu errado.");
    }
  };

  const handleDeleteContactItem = async (contactId: string) => {
    setGlobalLoading(true);
    try {
      await deleteContactFn({ contactId });
      toast("success", "Contato deletado com sucesso.");
    } catch (err) {
      toast("error", "Algo deu errado.");
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    if (contactsListDetail) {
      const arr = contactsListDetail.contacts?.map((contact) => {
        return {
          ...contact.data,
          id: contact.id,
        };
      });
      setResults(arr || []);
    }
  }, [contactsListDetail]);

  const dataTableIsEmpty = results?.length === 0;
  const existsPendingDocuments = pendingDocuments.length > 0;

  return (
    <>
      <LayoutWithSidebar>
        <CrumbsContactsListDetail
          contactsListDetailName={contactsListDetail?.name || ""}
        />
        <section className="flex justify-between">
          <section className="flex gap-[11px] mt-4">
            <Button
              className="!w-[200px] !text-sm font-normal"
              leftIcon={<PlusCircle color="#FFF" size={20} />}
              onClick={() => setModalAddItemContactListIsOpen(true)}
            >
              Adicionar contato
            </Button>
            <Button
              className="!w-[200px] !text-sm font-normal !bg-green"
              leftIcon={<Upload color="#FFF" size={20} />}
              onClick={() => setModalUploadCSVIsOpen(true)}
            >
              Upload de Planilha
            </Button>
          </section>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex ml-auto !w-[150px] ">
              <Button
                className="!bg-[#D9D9D9] !text-[#3F3F3F]"
                leftIcon={
                  <DotsThreeOutlineVertical size={16} color="#3F3F3F" />
                }
                rightIcon={<CaretUp size={16} color="#3F3F3F" />}
              >
                Ações
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white p-4 flex flex-col gap-4 mt-1">
              <DropdownActions
                setModalEditNameContactsListIsOpen={
                  setModalEditNameContactsListIsOpen
                }
              />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section className="flex flex-col mt-4">
          <Paragraph className=" !font-poppins !text-base">
            Aqui você pode criar sua lista de contatos.
          </Paragraph>
          <Paragraph className=" !font-poppins !text-base">
            Você pode criar adicionar o contato manualmente e/ou fazendo upload
            de um arquivo CSV.
          </Paragraph>
        </section>
        {existsPendingDocuments && (
          <Tipbox
            className="!py-2 !w-[500px] mt-4"
            iconLeft={<Warning size={20} />}
          >
            Você tem dados pendentes, salve-os para não perdê-los.
          </Tipbox>
        )}
        {dataTableIsEmpty ? (
          <div className="flex mt-6 items-center justify-center">
            <EmptyState
              icon={Empty}
              title="A lista está vazia"
              description="Adicione um contato ou faça upload de uma planilha"
            />
          </div>
        ) : (
          <>
            <div className="mt-4">
              <TableContacts
                content={results || []}
                pendingDocuments={pendingDocuments}
                handleDeleteItem={(id) => handleDeleteContactItem(id)}
              />
            </div>
            <Button
              className="mt-8 !w-[160px] mx-auto font-light flex"
              onClick={handleSave}
              disabled={!existsPendingDocuments}
            >
              Salvar lista
              <CheckCircle size={22} color="#FFF" />
            </Button>
          </>
        )}
      </LayoutWithSidebar>
      <ModalAddItemContactList
        modalIsOpen={modalAddItemContactListIsOpen}
        setModalIsOpen={setModalAddItemContactListIsOpen}
        contactsListDetail={contactsListDetail}
      />
      <ModalUploadCsv
        modalIsOpen={modalUploadCSVIsOpen}
        setModalIsOpen={setModalUploadCSVIsOpen}
        handleUploadAccepted={handleUploadAccepted}
      />
      <ModalEditNameContactsList
        modalIsOpen={modalEditNameContactsListIsOpen}
        setModalIsOpen={setModalEditNameContactsListIsOpen}
        item={{
          name: contactsListDetail?.name,
          id: contactsListId,
        }}
      />
    </>
  );
};
