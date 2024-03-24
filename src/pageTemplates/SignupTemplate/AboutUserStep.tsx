import { Button, Input } from "@/components";
import { ESignupStep } from "@/constants/signup";
import { formatPhone } from "@/utils/formatPhone";
import { toast } from "@/utils/toast";
import { validationSchemaAboutUserSignupStep } from "@/validation/signup";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";

interface IAboutUserStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
}

export const AboutUserStep = ({ setActiveStep }: IAboutUserStepProps) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: validationSchemaAboutUserSignupStep,
    onSubmit: (values) => handleAuth(values),
  });

  const handleAuth = async (values) => {
    try {
      console.log(values);
      setActiveStep(ESignupStep.Confirmation);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };

  return (
    <form className="w-[400px] mt-6 gap-4" onSubmit={formik.handleSubmit}>
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

      <Button
        className="!rounded-md !font-poppins !font-medium mt-2 !h-10 "
        type="submit"
        onClick={() => {}}
      >
        Criar conta
      </Button>
    </form>
  );
};
