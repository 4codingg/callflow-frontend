import { Button, ButtonVariant } from '@/components/Button';
import { METHOD_PAYMENTS } from '@/constants/tabsPayment';
import { schemaPaymentInformation } from '@/schemas/creditCard';
import { Formik } from 'formik';
import { CheckCircle, XCircle } from 'phosphor-react';
import 'react-credit-cards/es/styles-compiled.css';
import { CreditCardCheckout } from './CreditCardCheckout';
import { PixCheckout } from './PixCheckout';
import { TicketCheckout } from './TicketCheckout';

interface IPaymentProps {
  valueToAdd: number[];
  handleBack: () => void;
  methodPayment: METHOD_PAYMENTS;
}

export const Payment = ({ methodPayment, handleBack }: IPaymentProps) => {
  const initialValuesPayment = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    email: '',
  };

  return (
    <Formik
      initialValues={initialValuesPayment}
      validationSchema={schemaPaymentInformation}
      onSubmit={() => {}}
      className="mt-6"
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <>
            {methodPayment === METHOD_PAYMENTS.CreditCard && (
              <CreditCardCheckout
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            {methodPayment === METHOD_PAYMENTS.Pix && <PixCheckout />}
            {methodPayment === METHOD_PAYMENTS.Ticket && <TicketCheckout />}
            <div className="mx-auto flex mt-8 items-center justify-center gap-4">
              <Button
                variant={ButtonVariant.Secondary}
                leftIcon={<XCircle color="#783EFD" size={16} />}
                className=" py-3 !w-[200px]"
                onClick={handleBack}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {}}
                leftIcon={<CheckCircle color="#FFF" size={16} weight="bold" />}
                className=" py-3 !w-[200px]"
              >
                Continuar
              </Button>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
