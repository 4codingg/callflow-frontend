import { Card, Heading, LayoutWithSidebar, Table } from "@/components";
import { ListCardsCalls } from "@/components/layouts/Cards/CardCallsList";
import { ModalAddItemCallsList } from "@/components/layouts/Modals/ModalAddItemCallsList";
import { ModalEditItemCallsList } from "@/components/layouts/Modals/ModalEditItemCallsList";
import { MOCK_CONTACTS } from "@/constants/contentCalls";
import { CONTENT_CARD_CALLS_LIST } from "@/constants/contentCardCallList";
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
        <Heading> Contacts</Heading>
        <div className="mt-4">
          <ListCardsCalls content={CONTENT_CARD_CALLS_LIST}> </ListCardsCalls>
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
