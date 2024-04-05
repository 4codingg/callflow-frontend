import { LayoutWithSidebar, Breadcrumb, Button, Paragraph } from "@/components";
import { ModalAddItemContactList } from "@/components/layouts/Modals/ModalAddItemContact";
import { ModalUploadCsv } from "@/components/layouts/Modals/ModalUploadCsv";
import { formatCsvToJson } from "@/utils/formatCsvToJson";
import {
  ArrowRight,
  NotePencil,
  Trash,
  Warning,
  X,
  XCircle,
} from "phosphor-react";
import { useState } from "react";
import { ModalEditNameContactList } from "@/components/layouts/Modals/ModalEditNameContactList";
import { Tipbox } from "@/components/Tipbox";
import { useAuth } from "@/hooks/useAuth";
import { IPlanSubscriptionValue } from "@/@types/Subscription";
import { Input } from "@/components/Input";
import { ModalConfirmVariable } from "@/components/layouts/Modals/ModalConfirmVariable";
import { useRouter } from "next/router";

const crumbs = [
  {
    label: "Lista de Contatos",
    path: "/contacts",
  },
  {
    label: "Criar lista de contatos",
  },
];

const handleAddItem = () => {};

export const CreateContactListTemplate = () => {
  const [modalAddItemContactListIsOpen, setModalAddItemContactListIsOpen] =
    useState(false);
  const [modalConfirmVariable, setModalConfirmVariable] = useState(false);
  const [modalEditItemCallsList, setModalEditItemCallsList] = useState(false);
  const [results, setResults] = useState([]);
  const [variables, setVariables] = useState(["Nome", "Email", "Telefone"]);
  const [inputValue, setInputValue] = useState("");

  const handleUploadAccepted = (resultsFromCsv: any[]) => {
    for (const res of resultsFromCsv) {
      const resultsFormatted = formatCsvToJson(res.data);
      setResults((prevResults) => [...prevResults, ...resultsFormatted]);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "" && !variables.includes(inputValue)) {
        setVariables((prevVariables) => [...prevVariables, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleDeleteVariable = (itemToDelete: string) => {
    if (
      itemToDelete === "Nome" ||
      itemToDelete === "Email" ||
      itemToDelete === "Telefone"
    ) {
      return;
    }
    const updatedVariables = variables.filter((item) => item !== itemToDelete);
    setVariables(updatedVariables);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setInputValue(event.target.value);
    }
  };
  const { plan } = useAuth();
  const router = useRouter();

  const handleClickNext = () => {
    if (plan.value === IPlanSubscriptionValue.Free) {
      router.push("/contacts/1");
    } else setModalConfirmVariable(true);
  };

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        {plan.value === IPlanSubscriptionValue.Free && (
          <Tipbox buttonRigth iconLeft={<Warning size={20} />}>
            Seu plano gratuito tem acesso apenas a lista padrão com 3 variavéis
            (nome, e-mail e telefone)
          </Tipbox>
        )}
        <section className="mt-5">
          <Input label="Nome da lista" placeholder="Dê um nome pra sua lista" />
          <Input
            label="Variaveis"
            placeholder="Acione as variavéis da sua lista"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            value={inputValue}
            disabled={plan.value === IPlanSubscriptionValue.Free}
          />
          <section className="flex gap-4">
            {variables.map((item, index) => (
              <div
                key={index}
                className=" h-8 bg-primary flex text-white rounded-3xl px-4 py-1 justify-between items-center gap-2 "
              >
                <button onClick={() => handleDeleteVariable(item)}>
                  <XCircle size={19} />
                </button>
                <Paragraph className=" text-white font-poppins font-medium text-sm">
                  {item}
                </Paragraph>
              </div>
            ))}
          </section>
          <Button
            onClick={handleClickNext}
            className=" mt-2 m-auto w-48 font-poppins font-medium text-sm gap-2"
          >
            {" "}
            Avançar
            <ArrowRight size={19} color="#fff" />
          </Button>
        </section>
      </LayoutWithSidebar>
      <ModalAddItemContactList
        modalIsOpen={modalAddItemContactListIsOpen}
        setModalIsOpen={setModalAddItemContactListIsOpen}
        handleAddItem={handleAddItem}
      />
      <ModalConfirmVariable
        modalIsOpen={modalConfirmVariable}
        setModalIsOpen={setModalConfirmVariable}
        variables={variables}
      />

      <ModalEditNameContactList
        modalIsOpen={modalEditItemCallsList}
        setModalIsOpen={setModalEditItemCallsList}
        item={"teste"}
      />
    </>
  );
};
