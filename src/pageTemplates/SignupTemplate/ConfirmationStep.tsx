import { Button, Heading, Paragraph } from "@/components";
import { ESignupStep } from "@/constants/signup";
import { Check } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IConfirmationStepProps {
  setActiveStep: Dispatch<SetStateAction<ESignupStep>>;
}

export const ConfirmationStep = ({ setActiveStep }: IConfirmationStepProps) => {
  const handleOk = () => {
    setActiveStep(ESignupStep.AboutCompany);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 ">
      <section className="flex flex-col gap-2 justify-center items-center">
        <Heading> Conta em análise! </Heading>
        <Paragraph className=" w-3/5 text-default-grey">
          Sua conta foi enviada para análise, retornaremos com um e-mail em até
          2 dias úteis com o resultado da análise da sua conta.
        </Paragraph>
      </section>
      <Check className="bg-green rounded-full text-white" size={120} />
      <Button
        className="!rounded-md !font-poppins !font-medium mt-2 !h-10 !w-3/6 "
        onClick={handleOk}
      >
        OK
      </Button>
    </div>
  );
};
