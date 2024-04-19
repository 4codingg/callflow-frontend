import {
  Heading,
  LayoutWithSidebar,
  Button,
  Paragraph,
  EmptyState,
} from "@/components";
import { PlusCircle } from "phosphor-react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllContactsLists } from "@/api/contactsList/fetch-all-contacts-lists";
import { TableContactsList } from "@/components/layouts/Tables/TableContactsList";
import { deleteContactsList } from "@/api/contactsList/delete-contacts-list";
import { queryClient } from "@/services/react-query";
import Empty from "@/assets/empty-state.png";

export const ContactsListTemplate = () => {
  const router = useRouter();

  const { data: contactsListsItems } = useQuery({
    queryKey: ["contacts-lists"],
    queryFn: () => fetchAllContactsLists(),
    staleTime: Infinity,
  });

  const { mutateAsync: deleteContactsListFn } = useMutation({
    mutationFn: deleteContactsList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts-lists"] });
    },
  });

  const handleDeleteContactsList = async (contactsListId: string) => {
    await deleteContactsListFn({ contactsListId });
  };

  return (
    <>
      <LayoutWithSidebar>
        <div className="flex justify-between">
          <section className="flex gap-10 items-center">
            <Heading>Lista de Contatos</Heading>
            <Paragraph className=" text-gray-500">
              {contactsListsItems?.length || 0} listas
            </Paragraph>
          </section>
          {!contactsListsItems?.length && (
            <Button
              className="!w-[139px] !h-[40px] font-light text-xs"
              leftIcon={<PlusCircle size={16} color="#FFF" />}
              disabled={contactsListsItems?.length === 0}
              onClick={() => router.push("/contacts/create-list")}
            >
              Adicionar lista
            </Button>
          )}
        </div>
        <Paragraph className="!text-default-grey">
          Aqui você pode criar listas de contatos para enviar SMS, Email e
          Ligações em massa.
        </Paragraph>
        <div className="mt-8">
          {!contactsListsItems?.length ? (
            <EmptyState
              icon={Empty}
              title="A lista está vazia"
              description="Adicione um contato ou faça upload de uma planilha"
            />
          ) : (
            <TableContactsList
              content={contactsListsItems || []}
              handleEditItem={(id) => router.push(`/contacts/${id}`)}
              handleDeleteItem={(id) => handleDeleteContactsList(id)}
            />
          )}
        </div>
      </LayoutWithSidebar>
    </>
  );
};
