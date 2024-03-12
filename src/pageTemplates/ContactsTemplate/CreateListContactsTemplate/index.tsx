import {
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Table,
} from "@/components";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { TableHeader } from "@/components/layouts/Headers/TableHeader";
import { ModalAddItemContactList } from "@/components/layouts/Modals/ModalAddItemContact";
import { ModalUploadCsv } from "@/components/layouts/Modals/ModalUploadCsv";
import { MOCK_CONTACTS } from "@/constants/contentCalls";
import { formatCsvToJson } from "@/utils/formatCsvToJson";
import { CheckCircle, PlusCircle, Upload } from "phosphor-react";
import { useState } from "react";
import Empty from "@/assets/empty-state.png";
import Image from "next/image";

const crumbs = [
  {
    label: "Contatos",
    path: "/contacts",
  },
  {
    label: "Criar lista de Contatos",
  },
];

const handleAddItem = () => {};

export const CreateListContactsTemplate = () => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);
  const [modalUploadCSVIsOpen, setModalUploadCSVIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  const handleUploadAccepted = (resultsFromCsv: any[]) => {
    for (const res of resultsFromCsv) {
      const resultsFormatted = formatCsvToJson(res.data);
      setResults((prevResults) => [...prevResults, ...resultsFormatted]);
    }
  };

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
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
    </>
  );
};

CreateListContactsTemplate;
