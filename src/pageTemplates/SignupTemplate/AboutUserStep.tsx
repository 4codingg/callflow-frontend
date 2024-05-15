import { createCompanyMember } from "@/api/members/create-company-member";
import { Button, Input, Spinner } from "@/components";
import { ESignupStep } from "@/constants/signup";
import { useCompany } from "@/hooks/useCompany";
import { formatPhone } from "@/utils/formatPhone";
import { removePhoneNumberMask } from "@/utils/removePhoneNumberMask";
import { toast } from "@/utils/toast";
import { validationSchemaAboutUserSignupStep } from "@/validation/signup";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

interface ICreateCompanyMemberBody {
  email: string;
  password: string;
  name: string;
  phone: string;
  companyId: string;
}
interface IAboutUserStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
}

export const AboutUserStep = ({ setActiveStep }: IAboutUserStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { companyDetail } = useCompany();
  const router = useRouter();

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmedPassword: "",
      companyId: "",
    },
    validationSchema: validationSchemaAboutUserSignupStep,
    onSubmit: (values) => handleCreateCompanyMember(values),
  });

  const { mutateAsync: createCompanyMemberFn } = useMutation({
    mutationFn: createCompanyMember,
  });

  const handleCreateCompanyMember = async (body: ICreateCompanyMemberBody) => {
    try {
      setIsLoading(true);
      await createCompanyMemberFn({
        name: body.name,
        email: body.email,
        phone: removePhoneNumberMask(body.phone),
        password: body.password,
        companyId: companyDetail.id,
      });
      setActiveStep(ESignupStep.Confirmation);
      toast("success", "Membro criado com sucesso");
      router.push("/login");
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-[400px] mt-6 gap-4" onSubmit={formik.handleSubmit}>
      <Input
        placeholder="Digite seu nome"
        type="text"
        label="Nome"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("name")}
      />
      <Input
        placeholder="Digite seu e-mail"
        type="text"
        label="E-mail"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("email")}
      />
      <Input
        placeholder="Digite seu telefone"
        type="text"
        label="Telefone"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("phone")}
        onChange={(e) => {
          const formattedValue = formatPhone(e.target.value);
          formik.setFieldValue("phone", formattedValue);
        }}
      />

      <Input
        placeholder="Digite sua senha"
        type="text"
        label="Senha"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("password")}
      />
      <Input
        placeholder="Confirme sua senha"
        type="text"
        label="Confirmar Senha"
        className=" !font-semibold px-4 py-[10px]"
        {...formik.getFieldProps("confirmedPassword")}
      />

      <Button
        className="!rounded-md !font-poppins !font-medium mt-2 !h-10 "
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Criar conta"}
      </Button>
    </form>
  );
};
