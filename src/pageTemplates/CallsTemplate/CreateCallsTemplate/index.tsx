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
import { formatCsvToJson } from '@/utils/formatCsvToJson';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/router';
import { Check, PlusCircle, UploadSimple, Users, X } from 'phosphor-react';
import { useState } from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';

const crumbs = [
  {
    label: 'Ligações',
    path: '/calls',
  },
  {
    label: 'Criar lista de ligações',
  },
];

interface IFileProps {
  name: string;
  size: number;
}

export const CreateCallsTemplate = () => {
  const { CSVReader } = useCSVReader();
  const [uploadWasRejected, setUploadWasRejected] = useState(false);
  const [file, setFile] = useState<null | IFileProps>(null);
  const [results, setResults] = useState([]);
  const [modalEditItemCallsListIsOpen, setModalEditItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemCallsListIsOpen, setModalAddItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemFromContactsIsOpen, setModalAddItemFromContactsIsOpen] =
    useState(false);
  const [activeItemToEdit, setActiveItemToEdit] = useState<any | null>(null);

  const router = useRouter();

  const handleUploadAccepted = (results) => {
    const resultsFormatted = formatCsvToJson(results.data);
    setResults(resultsFormatted);
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
    console.log('id ==> ', id);
    router.push('/' + id);
  };

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        <div className="flex items-center justify-between">
          <div>
            <Paragraph size={ParagraphSizeVariant.Large} className="flex mt-8">
              Aqui você pode criar uma lista para fazer chamadas com mensagens
              personalizadas.{' '}
            </Paragraph>
            <Paragraph size={ParagraphSizeVariant.Large}>
              Você pode criar a lista através de seus contatos e/ou fazendo
              upload de um arquivo CSV.
            </Paragraph>
          </div>
          <div className="w-[500px] flex items-center gap-4">
            <Button
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddItemCallsListIsOpen(true)}
            >
              Adicionar contato
            </Button>
            <Button
              className="!bg-dark-primary"
              leftIcon={<Users color="#FFF" size={16} />}
              onClick={() => setModalAddItemFromContactsIsOpen(true)}
            >
              Adicionar seus contatos
            </Button>
          </div>
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
                  className="w-full bg-white mt-4 flex flex-col gap-4 items-center shadow-sm py-8 rounded-full"
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
                        <span className="text-primary"> clique aqui</span> para
                        fazer upload de um arquivo.
                      </Paragraph>
                    </div>
                  )}
                </div>
              </>
            );
          }}
        </CSVReader>
        <div className="mt-4">
          <Table
            content={results}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleAccessItem={handleAccessItem}
            disableAccessItem={true}
          />
        </div>
        <Button className="mt-8" onClick={handleCreateCallsList}>
          Criar lista
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
