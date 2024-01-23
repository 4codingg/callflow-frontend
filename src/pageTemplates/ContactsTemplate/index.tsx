import { Heading, LayoutWithSidebar, Table } from '@/components';
import { ModalAddItemCallsList } from '@/components/layouts/Modals/ModalAddItemCallsList';
import { ModalEditItemCallsList } from '@/components/layouts/Modals/ModalEditItemCallsList';
import { MOCK_CONTACTS } from '@/constants/contentCalls';
import { useState } from 'react';

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
        <Heading>Contacts</Heading>
        <div className="mt-4">
          <Table
            content={contacts}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
            disableAccessItem
          />
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
