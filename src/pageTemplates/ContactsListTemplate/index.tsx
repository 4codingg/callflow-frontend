import { Heading, LayoutWithSidebar, Paragraph, Table } from '@/components';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { CardContactsList } from '@/components/layouts/Cards/CardContactsList';
import { CONTENT_CARD_CALLS_LIST } from '@/constants/contentCardCallList';
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';
import SearchImage from '@/assets/empty-state.png';
import { useRouter } from 'next/router';

export const ContactsListTemplate = () => {
  const router = useRouter();
  const [contactsListItems, setContactsListItems] = useState(
    CONTENT_CARD_CALLS_LIST
  );

  return (
    <>
      <LayoutWithSidebar>
        <div className="flex justify-between">
          <section className="flex gap-10 items-center">
            <Heading>Lista de Contatos</Heading>

            <Paragraph className=" text-gray-500">
              {contactsListItems.length} listas
            </Paragraph>
          </section>
          {!!contactsListItems.length && (
            <Button
              className="!w-[139px] !h-[40px] font-light text-xs"
              leftIcon={<PlusCircle size={16} color="#FFF" />}
              disabled={contactsListItems.length === 0}
              onClick={() => router.push('/contacts/create-list')}
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
          <Table
            content={contactsListItems}
            handleEditItem={() => {}}
            handleDeleteItem={() => {}}
            disableAccessItem
          />
        </div>
      </LayoutWithSidebar>
    </>
  );
};
