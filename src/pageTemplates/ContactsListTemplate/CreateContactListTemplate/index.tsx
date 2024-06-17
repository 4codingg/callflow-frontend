import {
  LayoutWithSidebar,
  Breadcrumb,
  Button,
  Paragraph,
  Label,
  Card,
  Dropdown,
} from "@/components";
import { ArrowRight, Warning } from "phosphor-react";
import { useState } from "react";
import { Tipbox } from "@/components/Tipbox";
import { IPlanSubscriptionValue } from "@/@types/Subscription";
import { Input } from "@/components/Input";
import { useRouter } from "next/router";
import { ModalConfirmVariables } from "@/components/layouts/Modals/ModalConfirmVariables";
import { useMutation } from "@tanstack/react-query";
import { createContactsList } from "@/api/contactsList/create-contacts-list";
import { useFormik } from "formik";
import { Labelbox } from "@/components/Labelbox";
import { toast } from "@/utils/toast";
import Information from "@/assets/icons/information-circle.svg";
import Image from "next/image";
import { ModalStepByStep } from "@/components/layouts/Modals/ModalStepByStep";
import { EMassCommunication } from "@/constants/massCommunication";
import { useCompany } from "@/hooks/useCompany";
import { DestinationVariablesSection } from "./DestinationVariablesSection";

const crumbs = [
  {
    label: "Lista de Contatos",
    path: "/contacts",
  },
  {
    label: "Criar lista de contatos",
  },
];

export const CreateContactListTemplate = () => {
  const [modalConfirmVariablesIsOpen, setModalConfirmVariablesIsOpen] =
    useState(false);
  const [modalStepByStepIsOpen, setModalStepByStepIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { plan } = useCompany();
  const router = useRouter();

  const { mutateAsync: createContactsListFn, isPending } = useMutation({
    mutationFn: createContactsList,
  });

  const handleConfirmCreateContactsList = async () => {
    if (values.name.trim() === "") {
      toast("error", "O nome da lista não pode estar vazio.");
      return;
    }
    if (
      plan.value !== IPlanSubscriptionValue.Free &&
      !modalConfirmVariablesIsOpen
    ) {
      setModalConfirmVariablesIsOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const { id } = await createContactsListFn({
        name: values.name,
        variables: values.variables,
        emailDestinationVariable: values.emailDestinationVariable,
        phoneDestinationVariable: values.phoneDestinationVariable,
      });

      toast("success", "Lista criada com sucesso!");
      router.push(`/contacts/${id}`);
    } catch (error) {
      toast("error", "Erro ao criar a lista de contatos!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (values.inputVariableValue.trim() === "") {
        toast("error", "Não é permitido adicionar uma variavél vazia.");
        return;
      }
      if (values.variables.includes(values.inputVariableValue.toLowerCase())) {
        toast("error", "Essa variável já existe.");
        return;
      }
      setFieldValue("variables", [
        ...values.variables,
        values.inputVariableValue.toLowerCase(),
      ]);

      setFieldValue("inputVariableValue", "");
    }
  };

  const handleDeleteVariable = (itemToDelete: string) => {
    const translateVariable = (variable: string): string => {
      switch (variable) {
        case "name":
          return "Nome";
        case "email":
          return "Email";
        case "phone":
          return "Telefone";
        default:
          return variable;
      }
    };
    if (
      itemToDelete === "name" ||
      itemToDelete === "email" ||
      itemToDelete === "phone"
    ) {
      toast("error", `${translateVariable(itemToDelete)} é uma variável fixa.`);
      return;
    }
    const updatedVariables = values.variables.filter(
      (item) => item !== itemToDelete
    );
    setFieldValue("variables", updatedVariables);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFieldValue("inputVariableValue", event.target.value);
    }
  };

  const { values, setFieldValue, getFieldProps } = useFormik({
    isInitialValid: false,
    enableReinitialize: true,
    initialValues: {
      name: "",
      inputVariableValue: "",
      variables:
        plan.value === IPlanSubscriptionValue.Free
          ? ["name", "email", "phone"]
          : [],
      emailDestinationVariable: "",
      phoneDestinationVariable: "",
    },
    onSubmit: handleConfirmCreateContactsList,
  });

  return (
    <>
      <LayoutWithSidebar>
        <Breadcrumb crumbs={crumbs} />
        {plan.value === IPlanSubscriptionValue.Free && (
          <Tipbox
            iconLeft={<Warning size={20} />}
            buttonRight={
              <Button
                className="!w-56 font-medium !text-sm"
                rightIcon={<ArrowRight color="#FFF" />}
              >
                Fazer upgrade
              </Button>
            }
            className="mt-4"
          >
            Seu plano gratuito tem acesso apenas a lista padrão com 3 variavéis
            (nome, e-mail e telefone)
          </Tipbox>
        )}
        <Button
          onClick={() => setModalStepByStepIsOpen(true)}
          className="!bg-light-primary !w-[185px] !h-[48px] mt-[24px] flex items-center gap-2 !rounded-full"
        >
          <Image src={Information} alt="circle-information" />
          <Paragraph className=" text-xs text-purple-secundary !font-bold">
            Passo a Passo
          </Paragraph>
        </Button>
        <section className="mt-5">
          <Input
            label="Nome da lista"
            placeholder="Dê um nome pra sua lista"
            {...getFieldProps("name")}
          />
          <Input
            label="Variáveis"
            placeholder="Acione as variáveis da sua lista"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            value={values.inputVariableValue}
            disabled={plan.value === IPlanSubscriptionValue.Free}
          />
          <div className="flex gap-4">
            {values.variables.map((item, index) => (
              <Labelbox
                key={index}
                action={handleDeleteVariable}
                label={item}
              />
            ))}
          </div>
          <DestinationVariablesSection
            values={values}
            setFieldValue={setFieldValue}
            getFieldProps={getFieldProps}
          />
          <Button
            onClick={handleConfirmCreateContactsList}
            className=" mt-12 m-auto !w-48 font-poppins font-medium text-sm gap-2"
          >
            Avançar
            <ArrowRight size={19} color="#fff" />
          </Button>
        </section>
      </LayoutWithSidebar>
      <ModalStepByStep
        modalIsOpen={modalStepByStepIsOpen}
        setModalIsOpen={setModalStepByStepIsOpen}
        type="create-contact"
      />
      <ModalConfirmVariables
        modalIsOpen={modalConfirmVariablesIsOpen}
        setModalIsOpen={setModalConfirmVariablesIsOpen}
        variables={values.variables}
        handleConfirmVariables={handleConfirmCreateContactsList}
        isLoading={isLoading || isPending}
        
      />
    </>
  );
};
