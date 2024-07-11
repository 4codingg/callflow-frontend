import { Button, Heading, Paragraph } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import Check from "@/assets/icons/CheckSentEmail.png";

export const ConfirmationResetPassword = () => {
  const router = useRouter();

  return (
    <>
      <Heading>Te enviamos um email!</Heading>
      <Paragraph className="text-sm text-default-grey !font-poppins mt-2 max-w-[518px] text-center">
        Enviamos um e-mail para você com instruções sobre como recuperar sua
        senha. Por favor, verifique sua caixa de entrada e siga as orientações
        fornecidas para concluir o processo de recuperação de senha. Se você não
        receber o e-mail dentro de alguns minutos, verifique sua pasta de spam
        ou lixo eletrônico.
      </Paragraph>
      <div className="w-[400px] mt-6">
        <Image
          src={Check}
          alt=""
          width={128}
          height={128}
          className="mx-auto"
        />
        <Button
          className="!rounded-md !font-poppins !font-medium mt-16"
          onClick={() => router.push("/")}
        >
          OK
        </Button>
      </div>
    </>
  );
};
