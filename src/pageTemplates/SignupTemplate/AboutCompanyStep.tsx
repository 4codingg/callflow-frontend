import {
  ICreateCompanyBody,
  createCompany,
} from "@/api/company/create-company";
import { Button, Dropdown, Input, Spinner } from "@/components";
import { COMPANY_TYPES } from "@/constants/contentCalls";
import { ESignupStep } from "@/constants/signup";
import { formatCEP } from "@/utils/formatCEP";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { formatStringToNumber } from "@/utils/formatStringToNumber";
import { generateRandomEmail } from "@/utils/generateRandomEmail";
import { toast } from "@/utils/toast";
import { validationSchemaAboutCompanySignupStep } from "@/validation/signup";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAboutCompanyStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
  setCompanyId: Dispatch<SetStateAction<string>>;
}

export const AboutCompanyStep = ({
  setActiveStep,
  setCompanyId,
}: IAboutCompanyStepProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      name: "",
      email: "",
      CNPJ: "",
      address: {
        address: "",
        number: 0,
        zipcode: "",
      },
      quantityEmployers: 1 as number,
      type: "development-software",
    },
    validationSchema: validationSchemaAboutCompanySignupStep,
    onSubmit: (values) => handleCreateCompany(values),
  });

  const { mutateAsync: createCompanyFn } = useMutation({
    mutationFn: createCompany,
  });

  const handleCreateCompany = async (body: ICreateCompanyBody) => {
    try {
      setIsLoading(true);
      const { companyId } = await createCompanyFn({
        ...body,
      });
      setCompanyId(companyId);
      toast("success", "Empresa criada com sucesso");
      setActiveStep(ESignupStep.AboutUser);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      formik.setFieldValue("name", "Jane Doe");
      formik.setFieldValue("email", generateRandomEmail());
      formik.setFieldValue("address.address", "Janelandy Avenue 123");
      formik.setFieldValue("address.number", 12);
      formik.setFieldValue("address.zipcode", "50680-230");
      formik.setFieldValue("type", "development-software");
    }
  }, []);

  return (
    <form className="w-[400px] mt-5" onSubmit={formik.handleSubmit}>
      <Input
        placeholder="Digite o nome da empresa"
        type="text"
        label="Nome da empresa"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("name")}
      />
      <Input
        placeholder="Digite o e-mail da empresa"
        type="text"
        label="E-mail da empresa"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("email")}
      />
      <Input
        placeholder="Digite o CNPJ da empresa"
        label="CNPJ"
        className=" !font-semibold px-4 py-[10px]"
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
        {...formik.getFieldProps("address.address")}
      />
      <section className=" flex gap-3">
        <Input
          placeholder="Digite o CEP da empresa"
          type="text"
          label="CEP"
          className=" !font-semibold px-4 py-[10px]"
          {...formik.getFieldProps("address.zipcode")}
          onChange={(e) => {
            const formattedValue = formatCEP(e.target.value);
            formik.setFieldValue("address.zipcode", formattedValue);
          }}
        />
        <Input
          placeholder="Digite o número da empresa"
          label="Número"
          type="number"
          className=" !font-semibold px-4 py-[10px]"
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
        placeholder="Tipo de empresa"
        label="Selecione o tipo de empresa"
        value={formik.values.type}
        {...formik.getFieldProps("types")}
      />
      <Button
        className="!rounded-md !font-poppins !font-medium mt-2 !h-10 0 "
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Avançar"}
      </Button>
    </form>
  );
};
