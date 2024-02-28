import {
  LayoutWithSidebar,
  Line,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from '@/components';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button, ButtonSizeVariant } from '@/components/Button';
import { DropdownMenu } from '@/components/DropdownMenu';
import { TableHeader } from '@/components/layouts/Headers/TableHeader';
import { ModalAddItemCallsList } from '@/components/layouts/Modals/ModalAddItemCallsList';
import { ModalAddItemFromContacts } from '@/components/layouts/Modals/ModalAddItemFromContacts';
import { ModalEditItemCallsList } from '@/components/layouts/Modals/ModalEditItemCallsList';
import { ModalPlayCallsList } from '@/components/layouts/Modals/ModalPlayCallsList';
import { ModalUploadCsv } from '@/components/layouts/Modals/ModalUploadCsv';
import { EStatus, MOCK_CONTACTS } from '@/constants/contentCalls';
import { useCallsList } from '@/hooks/useCallsList';
import { formatCsvToJson } from '@/utils/formatCsvToJson';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/router';
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  PlayCircle,
  PlusCircle,
  Upload,
  UsersThree,
} from 'phosphor-react';
import { useState } from 'react';

const crumbs = [
  {
    label: 'Ligações',
    path: '/calls',
  },
  {
    label: 'Editar lista de ligações',
  },
  {
    label: 'Amplifi Calls',
  },
];

interface IFileProps {
  name: string;
  size: number;
}

export const CallsDetailTemplate = () => {
  const [file, setFile] = useState<null | IFileProps>(null);
  const [modalEditItemCallsListIsOpen, setModalEditItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemCallsListIsOpen, setModalAddItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemFromContactsIsOpen, setModalAddItemFromContactsIsOpen] =
    useState(false);
  const [modalUploadCsvIsOpen, setModalUploadCsvIsOpen] = useState(false);
  const [modalPlayCallsList, setModalPlayCallsList] = useState(false);
  const [activeItemToEdit, setActiveItemToEdit] = useState<any | null>(null);
  const [existsPendingChange, setExistsPendingChange] = useState(false);

  const { results, setResults } = useCallsList();

  const router = useRouter();

  const actions = [
    {
      icon: <UsersThree color="#14082E" size={16} />,
      label: 'Adicionar de seus contatos',
      action: () => setModalAddItemFromContactsIsOpen(true),
    },
  ];

  const handleUploadAccepted = (resultsFromCsv) => {
    const resultsFormatted = formatCsvToJson(resultsFromCsv.data);
    setResults([...results, ...resultsFormatted]);
  };

  const handleDeleteItem = (id: string) => {
    const resultsFiltered = results.filter((item) => item.id !== id);
    setResults([...resultsFiltered]);
  };

  const handleEditItem = (id: string) => {
    const itemToEdit = results.find((item) => item.id === id);

    setActiveItemToEdit(itemToEdit);
    setModalEditItemCallsListIsOpen(true);
  };

  const handleAddItem = () => {};

  const handleAccessItem = (id: string) => {
    router.push('/' + id);
  };

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-4 w-full">
            <Button
              leftIcon={<PlayCircle color="#FFF" size={16} />}
              className="!w-[200px] !text-sm font-normal !bg-green"
              onClick={() => setModalPlayCallsList(true)}
            >
              Reproduzir lista
            </Button>
            <Button
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddItemCallsListIsOpen(true)}
              className="!w-[220px] !text-sm font-normal"
            >
              Adicionar contato
            </Button>
            <Button
              className="!bg-dark-primary !w-[200px] !text-sm font-normal"
              leftIcon={<Upload color="#FFF" size={16} />}
              onClick={() => setModalUploadCsvIsOpen(true)}
            >
              Upload de Planilha
            </Button>
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
                        <Paragraph>{action.label}</Paragraph>
                      </button>
                      {!isLastItem && <Line direction="horizontal" />}
                    </>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div>
            <Paragraph size={ParagraphSizeVariant.Large} className="flex mt-8">
              Aqui você pode editar sua lista para fazer chamadas com mensagens
              personalizadas.{' '}
            </Paragraph>
            <Paragraph size={ParagraphSizeVariant.Large}>
              Você pode editar a lista através de seus contatos e/ou fazendo
              upload de um arquivo CSV.
            </Paragraph>
          </div>
        </div>
        <div className="mt-4">
          <Table
            content={results}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleAccessItem={handleAccessItem}
            disableAccessItem={true}
            headerComponent={
              <TableHeader
                title="Lista de contatos"
                status={EStatus.Completed}
                lastPlay={'12/03/2023 17:32'}
                handleResetList={() => setResults([])}
                saveButtonIsAble={existsPendingChange}
                showActions={!!results.length}
              />
            }
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
      <ModalAddItemFromContacts
        modalIsOpen={modalAddItemFromContactsIsOpen}
        setModalIsOpen={setModalAddItemFromContactsIsOpen}
      />
      <ModalUploadCsv
        modalIsOpen={modalUploadCsvIsOpen}
        setModalIsOpen={setModalUploadCsvIsOpen}
        file={file}
        setFile={setFile}
        handleUploadAccepted={handleUploadAccepted}
      />
      <ModalPlayCallsList
        modalIsOpen={modalPlayCallsList}
        setModalIsOpen={setModalPlayCallsList}
      />
    </>
  );
};
