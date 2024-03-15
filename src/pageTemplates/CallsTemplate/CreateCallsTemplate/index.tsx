import {
  Input,
  LayoutWithSidebar,
  Line,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from "@/components";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { DropdownMenu } from "@/components/Dropdown";
import { TableHeader } from "@/components/layouts/Headers/TableHeader";
import { ModalAddItemCallsList } from "@/components/layouts/Modals/ModalAddItemCallsList";
import { ModalAddItemFromContacts } from "@/components/layouts/Modals/ModalAddItemFromContacts";
import { ModalConfirmCreateCallsList } from "@/components/layouts/Modals/ModalConfirmCreateCallsList";
import { ModalEditItemCallsList } from "@/components/layouts/Modals/ModalEditItemCallsList";
import { ModalUploadCsv } from "@/components/layouts/Modals/ModalUploadCsv";
import { formatCsvToJson } from "@/utils/formatCsvToJson";
import { useRouter } from "next/router";
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  PlusCircle,
  Upload,
  UsersThree,
} from "phosphor-react";
import { useState } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";

const crumbs = [
  {
    label: "Ligações",
    path: "/calls",
  },
  {
    label: "Criar lista de ligações",
  },
];

interface IFileProps {
  name: string;
  size: number;
}

export const CreateCallsTemplate = () => {
  const router = useRouter();

  const [file, setFile] = useState<null | IFileProps>(null);
  const [results, setResults] = useState([]);
  const [modalEditItemCallsListIsOpen, setModalEditItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemCallsListIsOpen, setModalAddItemCallsListIsOpen] =
    useState(false);
  const [modalAddItemFromContactsIsOpen, setModalAddItemFromContactsIsOpen] =
    useState(false);
  const [modalUploadCsvIsOpen, setModalUploadCsvIsOpen] = useState(false);
  const [modalConfirmCreateCallsList, setModalConfirmCreateCallsList] =
    useState(false);
  const [activeItemToEdit, setActiveItemToEdit] = useState<any | null>(null);

  const actions = [
    {
      icon: <UsersThree color="#14082E" size={16} />,
      label: "Adicionar de seus contatos",
      action: () => setModalAddItemFromContactsIsOpen(true),
    },
  ];

  const handleUploadAccepted = (results) => {
    const resultsFormatted = formatCsvToJson(results.data);
    setResults(resultsFormatted);
  };

  const handleCreateCallsList = () => {
    console.log("Criando lista...");
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
    console.log("id ==> ", id);
    router.push("/" + id);
  };

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-4 w-full">
            <Button
              className="!w-[250px] !text-sm font-normal"
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddItemCallsListIsOpen(true)}
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
              Aqui você pode criar uma lista para fazer chamadas com mensagens
              personalizadas.{" "}
            </Paragraph>
            <Paragraph size={ParagraphSizeVariant.Large}>
              Você pode criar a lista através de seus contatos e/ou fazendo
              upload de um arquivo CSV.
            </Paragraph>
          </div>
        </div>
        <div className="mt-4">
          <Input label="Nome da lista" placeholder="Dê um nome a sua lista" />
          <Table
            content={results}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleAccessItem={handleAccessItem}
            disableAccessItem={true}
            headerComponent={
              <TableHeader
                title="Lista dos contatos"
                handleResetList={() => setResults([])}
              />
            }
          />
        </div>
        <Button
          leftIcon={<CheckCircle size={16} color="#FFF" />}
          className="mt-8 !w-[250px] mx-auto flex"
          onClick={() => setModalConfirmCreateCallsList(true)}
          disabled={!results.length}
        >
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
      <ModalUploadCsv
        modalIsOpen={modalUploadCsvIsOpen}
        setModalIsOpen={setModalUploadCsvIsOpen}
        file={file}
        setFile={setFile}
        handleUploadAccepted={handleUploadAccepted}
      />
      <ModalConfirmCreateCallsList
        modalIsOpen={modalConfirmCreateCallsList}
        setModalIsOpen={setModalConfirmCreateCallsList}
        variables={Object.keys(results[0] || [])}
        handleCreateCallsList={handleCreateCallsList}
      />
    </>
  );
};
