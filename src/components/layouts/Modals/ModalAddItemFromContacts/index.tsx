import { Button, ButtonVariant } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { MOCK_CONTACTS } from '@/constants/contentCalls';
import { Contact } from '@/interfaces';
import { XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IModalAddItemFromContactsProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalAddItemFromContacts = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddItemFromContactsProps) => {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [selectedContacts, setSelectedContacts] = useState<Contact[] | null>(
    []
  );

  const handleSelectContact = (contact: Contact) => {
    if (selectedContacts.find((sC) => sC.id === contact.id)) {
      const selectedContactsFiltered = selectedContacts.filter(
        (sC) => sC.id !== contact.id
      );
      setSelectedContacts([...selectedContactsFiltered]);
      return;
    }

    setSelectedContacts([...selectedContacts, contact]);
    console.log(selectedContacts);
  };

  const handleSave = () => {
    console.log('=============');
    console.log(selectedContacts);
    console.log('=============');
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-8 min-w-[500px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Seus contatos
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form
            className="mt-6 flex flex-col gap-4 min-w-[600px] max-h-[80vh]"
            onSubmit={handleSave}
          >
            {contacts.map((contact, index) => {
              return (
                <div className="flex items-center gap-2" key={index}>
                  <Checkbox
                    size={30}
                    onClick={() => handleSelectContact(contact)}
                  />
                  <Paragraph className="w-[25%]">{contact.name}</Paragraph>
                  <Paragraph className="w-[25%]">{contact.phone}</Paragraph>
                  <Paragraph className="w-[25%]">{contact.email}</Paragraph>
                </div>
              );
            })}
            <Button type="button" onClick={handleSave}>
              Adicionar
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
