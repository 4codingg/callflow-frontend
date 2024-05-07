import { Logo, Paragraph } from "@/components";
import { LogoVariant } from "@/components/Logo";
import { toast } from "@/utils/toast";
import { useState } from "react";
import { FormResetPassword } from "./FormResetPassword";
import { ConfirmationResetPassword } from "./ConfirmationResetPassword";

export const ResetPasswordTemplate = () => {
  const [resetPasswordWasRequested, setResetPasswordWasRequested] =
    useState(false);

  const handleRequestResetPassword = async (values) => {
    try {
      setResetPasswordWasRequested(true);
    } catch (error) {
      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };

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
        {!resetPasswordWasRequested ? (
          <FormResetPassword
            handleRequestResetPassword={handleRequestResetPassword}
          />
        ) : (
          <ConfirmationResetPassword />
        )}
      </div>
    </div>
  );
};
