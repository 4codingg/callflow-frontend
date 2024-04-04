import {
  DropdownMenu,
  LayoutWithSidebar,
  Line,
  Paragraph,
  Table,
} from "@/components";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { TableHeader } from "@/components/layouts/Headers/TableHeader";
import { ModalAddItemContactList } from "@/components/layouts/Modals/ModalAddItemContact";
import { ModalUploadCsv } from "@/components/layouts/Modals/ModalUploadCsv";
import { formatCsvToJson } from "@/utils/formatCsvToJson";
import {
  CaretUp,
  CheckCircle,
  DotsThreeOutlineVertical,
  NotePencil,
  PlusCircle,
  Trash,
  Upload,
} from "phosphor-react";
import { useState } from "react";
import Empty from "@/assets/empty-state.png";
import Image from "next/image";
import { ModalEditItemCallsList } from "@/components/layouts/Modals/ModalEditItemCallsList";
import { ModalEditNameContactList } from "@/components/layouts/Modals/ModalEditNameContactList";

const crumbs = [
  {
    label: "Lista de Contatos",
    path: "/contacts",
  },
  {
    label: "Name",
  },
];

const handleAddItem = () => {};

export const ContactsListDetailsTemplate = () => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);
  const [modalUploadCSVIsOpen, setModalUploadCSVIsOpen] = useState(false);
  const [modalEditItemCallsList, setModalEditItemCallsList] = useState(false);
  const [results, setResults] = useState([]);

  const handleUploadAccepted = (resultsFromCsv: any[]) => {
    for (const res of resultsFromCsv) {
      const resultsFormatted = formatCsvToJson(res.data);
      setResults((prevResults) => [...prevResults, ...resultsFormatted]);
    }
  };

  const actions = [
    {
      icon: <NotePencil color="#01DDA3" size={16} />,
      color: "#01DDA3",
      label: "Editar nome da Lista",
      action: () => setModalEditItemCallsList(true),
    },
    {
      icon: <Trash color="#3F3F3F" size={16} />,
      color: "#3F3F3F",
      label: "Deletar Lista",
    },
  ];
  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        <section className="flex justify-between mt-6">
          <section className="flex gap-[11px] mt-[15px]">
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
                      <Paragraph style={{ color: action.color }}>
                        {action.label}
                      </Paragraph>
                    </button>
                    {!isLastItem && <Line direction="horizontal" />}
                  </>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </section>
        <section className="flex flex-col mt-4">
          <Paragraph className=" !font-poppins !text-base">
            {" "}
            Aqui você pode criar sua lista de contatos.
          </Paragraph>
          <Paragraph className=" !font-poppins !text-base">
            Você pode criar adicionar o contato manualmente e/ou fazendo upload
            de um arquivo CSV.
          </Paragraph>
        </section>
        {results.length == 0 ? (
          <div className="flex flex-col h-screen w-full">
            <div className="flex flex-col items-center mt-[89px]">
              <Image src={Empty} alt="logo-empty" />
              <section className="flex flex-col items-center mt-4[40px]">
                <Paragraph className="!font-bold">
                  {" "}
                  A lista está vazia{" "}
                </Paragraph>
                <Paragraph className="font-normal">
                  {" "}
                  Adicione um contato ou
                </Paragraph>
                <Paragraph className="font-normal">
                  {" "}
                  Faça uoload de uma planilha
                </Paragraph>
              </section>
            </div>
          </div>
        ) : (
          <>
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
                  onClick={() => setModalUploadCSVIsOpen(true)}
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
                content={results}
                headerComponent={<TableHeader title="Contatos" />}
              />
            </div>
            <Button
              leftIcon={<CheckCircle size={22} color="#FFF" />}
              className="mt-8 !w-[160px] mx-auto font-light flex"
            >
              Salvar lista
            </Button>
          </>
        )}
      </LayoutWithSidebar>
      <ModalAddItemContactList
        modalIsOpen={modalAddItemContactListIsOpen}
        setModalIsOpen={setModalAddItemContactListIsOpen}
        handleAddItem={handleAddItem}
      />
      <ModalUploadCsv
        modalIsOpen={modalUploadCSVIsOpen}
        setModalIsOpen={setModalUploadCSVIsOpen}
        handleUploadAccepted={handleUploadAccepted}
      />
      <ModalEditNameContactList
        modalIsOpen={modalEditItemCallsList}
        setModalIsOpen={setModalEditItemCallsList}
        item={"teste"}
      />
    </>
  );
};
