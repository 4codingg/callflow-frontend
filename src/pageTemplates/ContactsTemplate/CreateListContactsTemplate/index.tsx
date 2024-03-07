import {
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from '@/components';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { TableHeader } from '@/components/layouts/Headers/TableHeader';
import { ModalAddItemContactList } from '@/components/layouts/Modals/ModalAddItemContact';
import { MOCK_CONTACTS } from '@/constants/contentCalls';
import { CheckCircle, PlusCircle, Upload } from 'phosphor-react';
import { useState } from 'react';

const crumbs = [
  {
    label: 'Contatos',
    path: '/contacts',
  },
  {
    label: 'Criar lista de Contatos',
  },
];

const handleAddItem = () => {};

export const CreateListContactsTemplate = () => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        <div className="flex flex-col mt-6">
          <div className="flex items-center gap-4 w-full">
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
            >
              Upload de Planilha
            </Button>
          </div>
          <div>
            <Paragraph className="flex mt-8">
              Aqui você pode criar sua lista de contatos.
            </Paragraph>
            <Paragraph>
              Você pode criar adicionar o contato manualmente e/ou fazendo
              upload de um arquivo CSV.
            </Paragraph>
          </div>
        </div>
        <div className="mt-4">
          <Table
            content={MOCK_CONTACTS}
            headerComponent={<TableHeader title="Contatos" />}
          />
        </div>
        <Button
          leftIcon={<CheckCircle size={22} color="#FFF" />}
          className="mt-8 !w-[160px] mx-auto font-light flex"
        >
          Salvar lista
        </Button>
      </LayoutWithSidebar>
      <ModalAddItemContactList
        modalIsOpen={modalAddItemContactListIsOpen}
        setModalIsOpen={setModalAddItemContactListIsOpen}
        handleAddItem={handleAddItem}
      />
    </>
  );
};

CreateListContactsTemplate;
