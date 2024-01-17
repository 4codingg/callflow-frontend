import { CreditCardIcon } from '@/assets/icons/credit-card';
import { PixIcon } from '@/assets/icons/pix';
import { TicketIcon } from '@/assets/icons/ticket';
import { LayoutWithSidebar, Paragraph } from '@/components';
import { DotSteps, DotStepsVariant } from '@/components/DotSteps';
import { METHOD_PAYMENTS, TABS_PAYMENT_TAB } from '@/constants/tabsPayment';
import { useState } from 'react';
import { MethodPayment } from './MethodPayment';
import { Payment } from './Payment';

const options = [
  {
    label: 'Pix',
    value: 'pix',
    icon: <PixIcon />,
  },
  {
    label: 'Cartão de crédito',
    value: 'credit-card',
    icon: <CreditCardIcon />,
  },
  {
    label: 'Boleto',
    value: 'ticket',
    icon: <TicketIcon />,
  },
];

export const AddFundsTemplate = () => {
  const [methodPayment, setMethodPayment] = useState<METHOD_PAYMENTS>(null);
  const [valueToAdd, setValueToAdd] = useState([10]);
  const [activeStep, setActiveStep] = useState(TABS_PAYMENT_TAB.MethodPayment);

  const handleBack = () => {
    setActiveStep(TABS_PAYMENT_TAB.MethodPayment);
  };

  const handleNext = () => {
    console.log('handle next', methodPayment);
    if (methodPayment) {
      setActiveStep(TABS_PAYMENT_TAB.Payment);
    }
  };

  return (
    <LayoutWithSidebar>
      <main className="flex flex-col w-full justify-center items-center ">
        <div className="flex flex-col justify-between bg-white shadow w-3/5 rounded-lg py-4 px-8 h-[136px]">
          <Paragraph className="!text-lg">Adição de fundos</Paragraph>
          <div className="justify-between flex">
            <h1 className="text-4xl font-medium ">
              {valueToAdd} <span className="text-gray-400"> $</span>
            </h1>
            <div className="flex flex-col items-start w-1/3">
              <p className="text-base font-medium">Método de pagamento</p>
              <p className="text-sm font-normal">Pix</p>
            </div>
          </div>
        </div>
        <div className="relative w-3/5 mt-10 ">
          {activeStep === TABS_PAYMENT_TAB.MethodPayment && (
            <MethodPayment
              handleNext={handleNext}
              options={options}
              valueToAdd={valueToAdd}
              methodPayment={methodPayment}
              setMethodPayment={setMethodPayment}
              setValueToAdd={setValueToAdd}
            />
          )}
          {activeStep === TABS_PAYMENT_TAB.Payment && (
            <Payment
              methodPayment={methodPayment}
              handleBack={handleBack}
              valueToAdd={valueToAdd}
            />
          )}
          <DotSteps
            currentStep={activeStep}
            quantity={2}
            variant={DotStepsVariant.Rectangle}
            className="absolute top-4 right-0"
          />
        </div>
      </main>
    </LayoutWithSidebar>
  );
};
