import { Heading, Input, Line, Logo, Paragraph } from "@/components";
import { Button } from "@/components/Button";
import { LogoVariant } from "@/components/Logo";
import { toast } from "@/utils/toast";
import { validationSchemaResetLogin } from "@/validation/login";
import { useFormik } from "formik";
import Check from "@/assets/icons/CheckSentEmail.png";
import { Envelope } from "phosphor-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export const ResetPasswordTemplate = () => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const router = useRouter();
  const handleAuth = async (values) => {
    try {
      console.log("Autenticando com:", values);
      setResetEmailSent(true);
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
      email: "",
    },
    validationSchema: validationSchemaResetLogin,
    onSubmit: (values) => handleAuth({ email: values.email }),
  });

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
        {resetEmailSent === false ? (
          <>
            <Heading>Recuperar senha</Heading>
            <Paragraph className="text-sm text-default-grey !font-poppins">
              Insira seu e-mail abaixo para recuperar senha.
            </Paragraph>
            <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
              <Input
                placeholder="Digite seu e-mail"
                type="text"
                label="E-mail"
                className=" !font-semibold px-4 py-[10px]"
                error={formik.errors?.email as string}
                {...formik.getFieldProps("email")}
                iconRight={<Envelope size={16} />}
              />

              <Button className="!rounded-md !font-poppins !font-medium mt-2">
                Enviar
              </Button>
            </form>
          </>
        ) : (
          <>
            <Heading>Te enviamos um email!</Heading>
            <Paragraph className="text-sm text-default-grey !font-poppins mt-2 max-w-[518px] text-center">
              Enviamos um e-mail para você com instruções sobre como recuperar
              sua senha. Por favor, verifique sua caixa de entrada e siga as
              orientações fornecidas para concluir o processo de recuperação de
              senha. Se você não receber o e-mail dentro de alguns minutos,
              verifique sua pasta de spam ou lixo eletrônico.
            </Paragraph>
            <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
              <Image
                src={Check}
                alt=""
                width={128}
                height={128}
                className="mx-auto"
              />
              <Button
                className="!rounded-md !font-poppins !font-medium mt-16"
                onClick={() => router.push("/login")}
              >
                OK
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
