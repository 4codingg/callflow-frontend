import {
  DropdownMenu,
  LayoutWithSidebar,
  Paragraph,
  Button,
  EmptyState,
  Tipbox,
} from '@/components';
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  PlusCircle,
  Upload,
  Warning,
} from 'phosphor-react';
import Empty from '@/assets/empty-state.png';
import Information from '@/assets/icons/information-circle.svg';
import { TableContacts } from '@layouts/Tables/TableContacts';
import { CrumbsContactsListDetail } from './CrumbsContactsListDetail';
import { DropdownActions } from './DropdownActions';
import Image from 'next/image';
import { useContactsList } from '@/hooks/useContactsListDetail';
import {
  ModalStepByStep,
  ModalEditContactsList,
  ModalUploadCsv,
  ModalAddItemContactList,
} from '@modals/index';

export const ContactsListDetailsTemplate = () => {
  const {
    contactsListDetail,
    results,
    dataTableIsEmpty,
    existsPendingDocuments,
    setModalAddItemContactListIsOpen,
    setModalUploadCSVIsOpen,
    setModalEditContactsListIsOpen,
    setModalStepByStepIsOpen,
    modalStepByStepIsOpen,
    handleSave,
    handleDeleteContactItem,
    pendingDocuments,
    handleDeleteContactsList,
  } = useContactsList();

  return (
    <>
      <LayoutWithSidebar>
        <CrumbsContactsListDetail
          contactsListDetailName={contactsListDetail?.name || ''}
        />
        <Button
          onClick={() => setModalStepByStepIsOpen(true)}
          className="!bg-light-primary !w-[185px] !h-[48px] mt-[24px] flex items-center gap-2 !rounded-full"
        >
          <Image src={Information} alt="circle-information" />
          <Paragraph className=" text-xs text-purple-secundary !font-bold">
            Passo a Passo
          </Paragraph>
        </Button>
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
            <DropdownMenu.Trigger className="flex ml-auto !w-[150px] !cursor-pointer">
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
            <DropdownMenu.Content className="bg-white p-4 flex flex-col gap-4 mt-1 !cursor-pointer">
              <DropdownActions
                handleDeleteContactsList={handleDeleteContactsList}
                setModalEditContactsListIsOpen={setModalEditContactsListIsOpen}
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
      <ModalAddItemContactList />
      <ModalUploadCsv />
      <ModalEditContactsList />
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
        type="update-contact"
      />
    </>
  );
};
