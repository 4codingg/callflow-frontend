import {
  Dropdown,
  Heading,
  Input,
  Line,
  Logo,
  Paragraph,
  TextArea,
} from "@/components";
import { Button } from "@/components/Button";
import { FormStep } from "@/components/FormStep";
import { LogoVariant } from "@/components/Logo";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { formatCEP } from "@/utils/formatCEP";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { toast } from "@/utils/toast";

import { validationSchemaSignup } from "@/validation/signup";
import { useFormik } from "formik";
import Link from "next/link";

import { useState } from "react";

export const SignupTemplate = () => {
  const [stepValidty, setStepValidty] = useState(true);

  const handleAuth = async (values) => {
    try {
      console.log("Autenticando com:", values);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      name: "",
      CNPJ: "",
      address: "",
      CEP: "",
      number: "",
      type: "",
      objetivo: "",
    },
    validationSchema: validationSchemaSignup,
    onSubmit: (values) =>
      handleAuth({
        name: values.name,
        CNPJ: values.CNPJ,
        address: values.address,
        CEP: values.CEP,
        number: values.number,
        type: values.type,
        objetivo: values.objetivo,
      }),
  });

  const testeData = [
    { quantity: 1, description: "Sobre a Empresa" },
    { quantity: 2, description: "Sobre você" },
  ];
  return (
    <div className="h-[100vh] w-full flex  flex-wrap justify-between">
      <div className="w-[50%] bg-primary p-9 flex flex-col justify-between">
        <Logo variant={LogoVariant.Light} />
        <div>
          <Paragraph className="text-white font-normal">
            Seja um parceiro e facilite suas comunicações!
          </Paragraph>
          <Paragraph className="text-white font-normal">
            © call.flow - 2024
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[50%] px-20 relative">
        <Link
          href={"/signup"}
          className="absolute top-9 right-9 !font-semibold !text-sm"
        >
          Cadastre-se
        </Link>
        <Heading>Fazer Cadastro</Heading>
        <Paragraph className="text-sm text-default-grey !font-poppins">
          Seja um parceiro e facilite suas comunicações!
        </Paragraph>
        <FormStep validity={stepValidty ? true : false} data={testeData} />
        {stepValidty === false ? (
          <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Digite o nome da empresa"
              type="text"
              label="Nome da empresa"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.name as string}
              {...formik.getFieldProps("name")}
            />
            <Input
              placeholder="Digite o CNPJ da empresa"
              type="text"
              label="CNPJ"
              className=" !font-semibold px-4 py-[10px]"
              onChange={(e) => {
                const formattedValue = formatCNPJ(e.target.value);
                formik.setFieldValue("CNPJ", formattedValue);
              }}
              error={formik.errors?.CNPJ as string}
              {...formik.getFieldProps("CNPJ")}
            />
            <Input
              placeholder="Digite o endereço da empresa"
              type="text"
              label="Endereço"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.address as string}
              {...formik.getFieldProps("address")}
            />
            <section className=" flex gap-3">
              <Input
                placeholder="Digite o CEP da empresa"
                type="text"
                label="CEP"
                className=" !font-semibold px-4 py-[10px]"
                onChange={(e) => {
                  const formattedValue = formatCEP(e.target.value);
                  formik.setFieldValue("CEP", formattedValue);
                }}
                error={formik.errors?.CEP as string}
                {...formik.getFieldProps("CEP")}
              />
              <Input
                placeholder="Digite o numero da empresa"
                type="number"
                label="Numero"
                className=" !font-semibold px-4 py-[10px]"
                onChange={(e) => {
                  const formattedValue = formatPhone(e.target.value);
                  formik.setFieldValue("number", formattedValue);
                }}
                error={formik.errors?.number as string}
                {...formik.getFieldProps("number")}
              />
            </section>
            <Dropdown
              className=" mb-4"
              options={COMPANY_TYPES}
              label="Tipo de empresa"
              {...formik.getFieldProps("contactsListId")}
            />
            <TextArea
              placeholder="Digite o objetivo da empresa com o call.flow "
              label="Objetivo"
              className=" !font-semibold !h-20 text-sm font-poppins"
              error={formik.errors?.objetivo as string}
              {...formik.getFieldProps("objetivo")}
            />
            <Button className="!rounded-md !font-poppins !font-medium mt-2 !h-10 ">
              Avançar
            </Button>
          </form>
        ) : (
          <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              label="Nome"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.name as string}
              {...formik.getFieldProps("name")}
            />
            <Input
              placeholder="Digite seu e-mail"
              type="text"
              label="E-mail"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.email as string}
              {...formik.getFieldProps("email")}
            />
            <Input
              placeholder="Digite seu telefone"
              type="text"
              label="Telefone"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.phone as string}
              {...formik.getFieldProps("phone")}
            />
            <Input
              placeholder="Digite sua senha"
              type="text"
              label="Senha"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.password as string}
              {...formik.getFieldProps("password")}
            />
            <Input
              placeholder="Confirme sua senha"
              type="text"
              label="Confirmar Senha"
              className=" !font-semibold px-4 py-[10px]"
              error={formik.errors?.confirmedPassword as string}
              {...formik.getFieldProps("confirmedPassword")}
            />

            <Button className="!rounded-md !font-poppins !font-medium mt-2 !h-10 ">
              Criar conta
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
