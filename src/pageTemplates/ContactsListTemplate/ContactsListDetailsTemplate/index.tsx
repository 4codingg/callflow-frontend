import {
  DropdownMenu,
  LayoutWithSidebar,
  Line,
  Paragraph,
  Breadcrumb,
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
  NotePencil,
  PlusCircle,
  Trash,
  Upload,
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

      if (plan === IPlanSubscriptionValue.Free) {
        resultsFormatted = formatResultsToFreePlanFormat(resultsFormatted);
      }

      setPendingDocuments((prevResults) => [
        ...prevResults,
        ...resultsFormatted,
      ]);
      setResults((prevResults) => [...prevResults, ...resultsFormatted]);
    }
  };

  const actions = [
    {
      icon: <NotePencil color="#01DDA3" size={16} />,
      color: "#01DDA3",
      label: "Editar nome da Lista",
      action: () => setModalEditNameContactsListIsOpen(true),
    },
    {
      icon: <Trash color="#3F3F3F" size={16} />,
      color: "#3F3F3F",
      label: "Deletar Lista",
    },
  ];

  const handleSave = async () => {
    try {
      await updateContactsListFn({
        contactsListId: contactsListId,
        contacts: pendingDocuments,
      });

      toast("success", "Lista salva com sucesso!");
      setPendingDocuments([]);
    } catch (err) {
      toast("error", "Algo deu errado.");
    }
  };

  const getCrumbs = (contactsListDetailName: string) => {
    return [
      {
        label: "Lista de Contatos",
        path: "/contacts",
      },
      {
        label: contactsListDetailName || "",
      },
    ];
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

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={getCrumbs(contactsListDetail?.name)} />
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
              {actions.map((action, index) => {
                const isLastItem = actions.length === index + 1;
                return (
                  <>
                    <button
                      onClick={action.action}
                      className="flex gap-2  items-center"
                    >
                      {action.icon}
                      <Paragraph style={{ color: action.color }}>
                        {action.label}
                      </Paragraph>
                    </button>
                    {!isLastItem && <Line direction="horizontal" />}
                  </>
                );
              })}
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
        {results?.length === 0 ? (
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
              disabled={!pendingDocuments.length}
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
