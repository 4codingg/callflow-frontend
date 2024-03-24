import { Heading, Logo, Paragraph } from '@/components';
import { FormStep } from '@/components/FormStep';
import { LogoVariant } from '@/components/Logo';
import { ESignupStep } from '@/constants/signup';

import Link from 'next/link';

import { useState } from 'react';
import { AboutCompanyStep } from './AboutCompanyStep';
import { AboutUserStep } from './AboutUserStep';
import { ConfirmationStep } from './ConfirmationStep';

const steps = [
  { value: ESignupStep.AboutCompany, description: 'Sobre a Empresa' },
  { value: ESignupStep.AboutUser, description: 'Sobre você' },
];

export const SignupTemplate = () => {
  const [activeStep, setActiveStep] = useState<ESignupStep>(
    ESignupStep.AboutCompany
  );

  return (
    <div className="h-[100vh] w-full flex  flex-wrap justify-between">
      <div className="w-[50%] bg-primary p-9 flex flex-col justify-between fixed top-0 left-0 h-full">
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
      <div className="flex flex-col items-center justify-center w-[50%] px-20 relative ml-auto pb-12">
        <Link
          href={'/signup'}
          className="absolute top-9 right-9 !font-semibold !text-sm"
        >
          Fazer login
        </Link>
        {activeStep !== ESignupStep.Confirmation && (
          <>
            <Heading className=" mt-24">Fazer Cadastro</Heading>
            <Paragraph className="text-sm text-default-grey !font-poppins mt-2">
              Seja um parceiro e facilite suas comunicações!
            </Paragraph>
          </>
        )}

        {activeStep !== ESignupStep.Confirmation && (
          <FormStep
            data={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}

        {activeStep === ESignupStep.AboutCompany && (
          <AboutCompanyStep setActiveStep={setActiveStep} />
        )}
        {activeStep === ESignupStep.AboutUser && (
          <AboutUserStep setActiveStep={setActiveStep} />
        )}
        {activeStep === ESignupStep.Confirmation && (
          <ConfirmationStep setActiveStep={setActiveStep} />
        )}
      </div>
    </div>
  );
};
