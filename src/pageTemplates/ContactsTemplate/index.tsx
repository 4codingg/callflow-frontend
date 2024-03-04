import {
  Card,
  Heading,
  LayoutWithSidebar,
  Paragraph,
  Table,
} from "@/components";
import { Button } from "@/components/Button";
import { CardContactsList } from "@/components/layouts/Cards/CardContactsList";
import { ModalAddItemCallsList } from "@/components/layouts/Modals/ModalAddItemCallsList";
import { ModalEditItemCallsList } from "@/components/layouts/Modals/ModalEditItemCallsList";
import { MOCK_CONTACTS } from "@/constants/contentCalls";
import { CONTENT_CARD_CALLS_LIST } from "@/constants/contentCardCallList";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

export const ContactsTemplate = () => {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [modalEditItemCallsListIsOpen, setModalEditItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemCallsListIsOpen, setModalAddItemCallsListIsOpen] =
    useState(false);
  const [activeItemToEdit, setActiveItemToEdit] = useState<any | null>(null);

  const handleEditItem = (id: string) => {
    const itemToEdit = contacts.find((item) => item.id === id);

    setActiveItemToEdit(itemToEdit);
    setModalEditItemCallsListIsOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    const resultsFiltered = contacts.filter((item) => item.id !== id);
    setContacts([...resultsFiltered]);
  };

  const handleAddItem = (id: string) => {};

  return (
    <>
      <LayoutWithSidebar>
        <div className="flex justify-between">
          <section className="flex gap-10 items-center">
            <Heading> Lista de Contatos</Heading>
            <Paragraph className=" text-gray-500">
              {" "}
              {CONTENT_CARD_CALLS_LIST.length} listas
            </Paragraph>
          </section>
          <Button
            className=" w-48 h-12 font-light"
            leftIcon={<PlusCircle size={20} color="#FFF" />}
            disabled={CONTENT_CARD_CALLS_LIST.length === 0}
          >
            Adicionar lista
          </Button>
        </div>
        <div className="mt-4">
          <CardContactsList content={CONTENT_CARD_CALLS_LIST}>
            {" "}
          </CardContactsList>
        </div>
      </LayoutWithSidebar>
      <ModalEditItemCallsList
        modalIsOpen={modalEditItemCallsListIsOpen}
        setModalIsOpen={setModalEditItemCallsListIsOpen}
        item={activeItemToEdit}
      />
      <ModalAddItemCallsList
        modalIsOpen={modalAddItemCallsListIsOpen}
        setModalIsOpen={setModalAddItemCallsListIsOpen}
        handleAddItem={handleAddItem}
      />
    </>
  );
};
