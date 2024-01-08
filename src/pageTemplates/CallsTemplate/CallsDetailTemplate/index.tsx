import {
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from '@/components';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { ModalAddItemCallsList } from '@/components/layouts/ModalAddItemCallsList';
import { ModalAddItemFromContacts } from '@/components/layouts/ModalAddItemFromContacts';
import { ModalEditItemCallsList } from '@/components/layouts/ModalEditItemCallsList';
import { MOCK_CONTACTS } from '@/constants/contentCalls';
import { formatCsvToJson } from '@/utils/formatCsvToJson';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/router';
import {
  Check,
  Play,
  PlusCircle,
  UploadSimple,
  Users,
  X,
} from 'phosphor-react';
import { useState } from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';

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
  const { CSVReader } = useCSVReader();
  const [uploadWasRejected, setUploadWasRejected] = useState(false);
  const [file, setFile] = useState<null | IFileProps>(null);
  const [results, setResults] = useState(MOCK_CONTACTS);
  const [modalEditItemCallsListIsOpen, setModalEditItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemCallsListIsOpen, setModalAddItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemFromContactsIsOpen, setModalAddItemFromContactsIsOpen] =
    useState(false);
  const [activeItemToEdit, setActiveItemToEdit] = useState<any | null>(null);

  const router = useRouter();

  const handleUploadAccepted = (resultsFromCsv) => {
    const resultsFormatted = formatCsvToJson(resultsFromCsv.data);
    setResults([...results, ...resultsFormatted]);
  };

  const handleCreateCallsList = () => {
    console.log('Criando lista...');
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
        <div className="flex items-center justify-between">
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
          <div className="flex gap-2">
            <Button
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddItemCallsListIsOpen(true)}
              className="!w-[220px] !text-sm font-normal"
            >
              Adicionar contato
            </Button>
            <Button
              leftIcon={<Users color="#FFF" size={16} />}
              onClick={() => setModalAddItemFromContactsIsOpen(true)}
              className="!w-[250px] !text-sm font-normal !bg-dark-primary"
            >
              Adicionar seus contatos
            </Button>
            <Button
              leftIcon={<Play color="#FFF" size={16} />}
              className="!w-[200px] !text-sm font-normal !bg-green"
            >
              Reproduzir lista
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-1 flex-col mt-6 bg-white rounded-lg shadow px-6 py-4 gap-4">
            <Paragraph size={ParagraphSizeVariant.Large}>
              <span className="font-bold">Nome: </span> Amplifi Calls
            </Paragraph>
            <Paragraph size={ParagraphSizeVariant.Large}>
              <span className="font-bold">Última reprodução: </span> 15/01/2023
              17:23
            </Paragraph>
            <Paragraph size={ParagraphSizeVariant.Large}>
              <span className="font-bold">Status: </span> Pendente
            </Paragraph>
          </div>
          <CSVReader
            onUploadAccepted={(results, file) => {
              handleUploadAccepted(results);
              setFile(file);
            }}
            onDragOver={(event: DragEvent) => {
              event.preventDefault();
            }}
            onDragLeave={(event: DragEvent) => {
              event.preventDefault();
            }}
            onUploadRejected={() =>
              toast(
                'error',
                'Algo deu errado. Cheque a extensão do arquivo e tente novamente.'
              )
            }
            noClick
            multiple={false}
          >
            {({ getRootProps, ProgressBar }) => {
              return (
                <>
                  <div
                    {...getRootProps()}
                    className="flex-1 bg-white mt-4 flex flex-col gap-4 items-center shadow-sm py-8 rounded-full"
                  >
                    {file ? (
                      <>
                        <div className="flex flex-col items-center gap-4">
                          <Check color="#00DEA3" size={40} />
                          <Paragraph size={ParagraphSizeVariant.Large}>
                            File uploaded
                          </Paragraph>
                          <div className="flex rounded-lg ">
                            <div className="bg-light-grey w-[300px] py-2 px-4 rounded-tl-full rounded-bl-full">
                              <Paragraph className="">
                                {file.name}{' '}
                                <span className="text-default-grey">
                                  ({formatFileSize(file.size)})
                                </span>
                              </Paragraph>
                              <span></span>
                            </div>
                            <button
                              className="bg-red bg-opacity-50 px-3 rounded-tr-full rounded-br-full"
                              onClick={() => {
                                setFile(null);
                                setResults([]);
                              }}
                            >
                              <X size={16} color="#E85959" />
                            </button>
                          </div>
                          <div className="">
                            <ProgressBar />
                          </div>
                        </div>
                      </>
                    ) : uploadWasRejected ? (
                      <div className="gap-4 w-full items-center flex flex-col">
                        <UploadSimple size={40} color="#783EFD" />
                        <Paragraph>
                          Arraste arquivos até aqui ou{' '}
                          <span className="text-primary">clique aqui</span> para
                          fazer upload de um arquivo.
                        </Paragraph>
                      </div>
                    ) : (
                      <div className="gap-4 w-full items-center flex flex-col">
                        <UploadSimple size={40} color="#783EFD" />
                        <Paragraph>
                          Arraste arquivos com a{' '}
                          <span className="text-primary">extensão CSV</span> até
                          aqui ou
                          <span className="text-primary">
                            {' '}
                            clique aqui
                          </span>{' '}
                          para fazer upload de um arquivo.
                        </Paragraph>
                      </div>
                    )}
                  </div>
                </>
              );
            }}
          </CSVReader>
        </div>
        <div className="mt-4">
          <Table
            content={results}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleAccessItem={handleAccessItem}
            disableAccessItem={true}
            tableTitle="Usuários"
          />
        </div>
        <Button className="mt-8" onClick={handleCreateCallsList}>
          Salvar lista
        </Button>
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
    </>
  );
};
