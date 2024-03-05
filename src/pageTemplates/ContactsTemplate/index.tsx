import { Heading, LayoutWithSidebar, Paragraph } from '@/components';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { CardContactsList } from '@/components/layouts/Cards/CardContactsList';
import { CONTENT_CARD_CALLS_LIST } from '@/constants/contentCardCallList';
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';
import SearchImage from '@/assets/empty-state.png';

export const ContactsTemplate = () => {
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
              className="w-[140px] h-[40px] font-light text-xs"
              leftIcon={<PlusCircle size={16} color="#FFF" />}
              disabled={CONTENT_CARD_CALLS_LIST.length === 0}
            >
              Adicionar lista
            </Button>
          )}
        </div>
        <div className="mt-8">
          {contactsListItems.length ? (
            <CardContactsList content={CONTENT_CARD_CALLS_LIST} />
          ) : (
            <EmptyState icon={SearchImage} />
          )}
        </div>
      </LayoutWithSidebar>
    </>
  );
};
