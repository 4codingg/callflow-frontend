import { Heading } from '@/components';
import { Button } from '@/components/Button';
import {
  InputRadioGroup,
  InputRadioGroupSize,
} from '@/components/InputRadioGroup';
import { Slider } from '@/components/Slider';
import { CheckCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface IMethodPaymentProps {
  valueToAdd: number[];
  setValueToAdd: Dispatch<SetStateAction<number[]>>;
  methodPayment: string;
  setMethodPayment: Dispatch<SetStateAction<string>>;
  options;
  handleNext: () => void;
}

export const MethodPayment = ({
  valueToAdd,
  setValueToAdd,
  setMethodPayment,
  options,
  handleNext,
}: IMethodPaymentProps) => {
  return (
    <div className="flex flex-col rounded-lg w-full">
      <Heading>Selecione o método de pagamento:</Heading>
      <section className="mt-6 flex justify-start items-center">
        <InputRadioGroup
          size={InputRadioGroupSize.Normal}
          onChange={setMethodPayment}
          options={options}
        />
      </section>
      <Heading className="mt-8">Insira o valor:</Heading>
      <Slider
        value={valueToAdd}
        onValueChange={(e) => setValueToAdd(e)}
        defaultValue={[10]}
        className="mt-8"
      />
      <Button
        onClick={handleNext}
        leftIcon={<CheckCircle color="#FFF" size={16} weight="bold" />}
        className="mx-auto flex mt-8 py-3  rounded-lg !w-[200px]"
      >
        Continuar
      </Button>
    </div>
  );
};
