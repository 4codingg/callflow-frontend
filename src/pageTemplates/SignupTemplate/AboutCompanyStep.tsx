import { Button, Dropdown, Input, TextArea } from "@/components";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { ESignupStep } from "@/constants/signup";
import { formatCEP } from "@/utils/formatCEP";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { formatNumberResidence } from "@/utils/formatNumberResidence";
import { formatPhone } from "@/utils/formatPhone";
import { toast } from "@/utils/toast";
import { validationSchemaAboutCompanySignupStep } from "@/validation/signup";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";

interface IAboutCompanyStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
}

export const AboutCompanyStep = ({ setActiveStep }: IAboutCompanyStepProps) => {
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
      objective: "",
    },
    validationSchema: validationSchemaAboutCompanySignupStep,
    onSubmit: (values) => handleAuth(values),
  });

  const handleAuth = async (values) => {
    try {
      console.log(values);
      setActiveStep(ESignupStep.AboutUser);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };

  return (
    <form className="w-[400px] mt-5" onSubmit={formik.handleSubmit}>
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
        label="CNPJ"
        className=" !font-semibold px-4 py-[10px]"
        error={formik.errors?.CNPJ as string}
        {...formik.getFieldProps("CNPJ")}
        onChange={(e) => {
          const formattedValue = formatCNPJ(e.target.value);
          formik.setFieldValue("CNPJ", formattedValue);
        }}
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
          error={formik.errors?.CEP as string}
          {...formik.getFieldProps("CEP")}
          onChange={(e) => {
            console.log(e);
            const formattedValue = formatCEP(e.target.value);
            formik.setFieldValue("CEP", formattedValue);
          }}
        />
        <Input
          placeholder="Digite o numero da empresa"
          label="Número"
          type="number"
          className=" !font-semibold px-4 py-[10px]"
          error={formik.errors?.number as string}
          {...formik.getFieldProps("number")}
          onChange={(e) => {
            const formattedValue = formatNumberResidence(e.target.value);
            formik.setFieldValue("number", formattedValue);
          }}
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
        error={formik.errors?.objective as string}
        {...formik.getFieldProps("objective")}
      />
      <Button className="!rounded-md !font-poppins !font-medium mt-2 !h-10 ">
        Avançar
      </Button>
    </form>
  );
};
