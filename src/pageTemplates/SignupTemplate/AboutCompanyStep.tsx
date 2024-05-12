import {
  ICreateCompanyBody,
  createCompany,
} from "@/api/company/create-company";
import { Button, Dropdown, Input, TextArea } from "@/components";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { ESignupStep } from "@/constants/signup";
import { formatCEP } from "@/utils/formatCEP";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { formatStringToNumber } from "@/utils/formatStringToNumber";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

interface IAboutCompanyStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  CNPJ: Yup.string().required("Campo obrigatório"),
  address: Yup.object().shape({
    address: Yup.string().required("Campo obrigatório"),
    number: Yup.number().required("Campo obrigatório"),
    zipcode: Yup.string().required("Campo obrigatório"),
  }),
  type: Yup.string().required("Campo obrigatório"),
});

export const AboutCompanyStep = ({ setActiveStep }: IAboutCompanyStepProps) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      name: "",
      email: "cEvertone@teste.com",
      CNPJ: "",
      address: {
        address: "",
        number: 0 as number,
        zipcode: "",
      },
      quantityEmployers: 1 as number,
      type: "dev",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleAuth(values),
  });
  const { mutateAsync: createCompanyFn } = useMutation({
    mutationFn: createCompany,
  });

  const handleAuth = async (body: ICreateCompanyBody) => {
    try {
      await createCompanyFn({
        ...body,
      });
      toast("success", "Empresa criada com sucesso");
      setActiveStep(ESignupStep.AboutUser);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
      console.log(error);
      console.log(body);
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
        error={formik.errors?.address?.address as string}
        {...formik.getFieldProps("address.address")}
      />
      <section className=" flex gap-3">
        <Input
          placeholder="Digite o CEP da empresa"
          type="text"
          label="CEP"
          className=" !font-semibold px-4 py-[10px]"
          error={formik.errors?.address?.zipcode as string}
          {...formik.getFieldProps("address.zipcode")}
          onChange={(e) => {
            console.log(e);
            const formattedValue = formatCEP(e.target.value);
            formik.setFieldValue("address.zipcode", formattedValue);
          }}
        />
        <Input
          placeholder="Digite o numero da empresa"
          label="Numero"
          type="number"
          className=" !font-semibold px-4 py-[10px]"
          error={formik.errors?.address?.number as string}
          {...formik.getFieldProps("address.number")}
          onChange={(e) => {
            const formattedValue = formatStringToNumber(e.target.value);
            formik.setFieldValue("address.number", formattedValue);
          }}
        />
      </section>
      <Dropdown
        className=" mb-4"
        options={COMPANY_TYPES}
        label="Selecione o tipo de empresa"
        value={formik.values.type}
        {...formik.getFieldProps("types")}
      />
      <Button
        className="!rounded-md !font-poppins !font-medium mt-2 !h-10 0 "
        type="submit"
      >
        Avançar
      </Button>
    </form>
  );
};
