import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TablePaymentMethods } from '@/components/layouts/Tables/TablePaymentMethods';
import { Line } from '@/components/Line';
import { Paragraph } from '@/components/Paragraph';
import { MOCK_PAYMENTS_METHODS } from '@/constants/tabsWallet';
import HiperCardIcon from '@/assets/icons/hipercard-icon.svg';
import MasterCardIcon from '@/assets/icons/mastercard-icon.svg';
import EloIcon from '@/assets/icons/elo-icon.svg';
import VisaIcon from '@/assets/icons/visa-icon.svg';
import Image from 'next/image';
import { ArrowRight, PlusCircle } from 'phosphor-react';
import { useRouter } from 'next/router';

export const PaymentMethodsTab = () => {
  const router = useRouter();

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Card>
        <Paragraph className="font-medium !text-base">Seu saldo</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Saldo disponível para fazer ações na plataforma
          <span className="text-primary"> call.flow</span>.
        </Paragraph>
        <Line className="my-4" />
        <div className=" flex items-center">
          <div className=" flex gap-2 flex-col">
            <Paragraph className="!text-sm !text-default-grey">
              Saldo total
            </Paragraph>
            <Paragraph className="font-medium !text-xl">R$ 103,13</Paragraph>
          </div>
        </div>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<ArrowRight color="#FFF" size={20} />}
          onClick={() => router.push('/wallet/add-funds')}
        >
          Adicionar saldo
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Método de pagamento
        </Paragraph>
        <Line className="my-4 mb-6" />
        <div className="flex items-center gap-2">
          {getIconBrand('mastercard')}
          <Paragraph>**** **** **** 3333 - </Paragraph>
          <span className="text-sm font-poppins">Masterzinho</span>
        </div>
        <Button
          className="!w-[260px] h-[40px] font-normal !text-xs mt-6"
          rightIcon={<PlusCircle color="#FFF" size={20} />}
        >
          Adicionar método de pagamento
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Métodos de pagamentos
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Confira seus métodos de pagamentos
        </Paragraph>
        <Line className="my-4" />
        <div className="mt-4">
          <TablePaymentMethods paymentMethods={MOCK_PAYMENTS_METHODS} />
        </div>
      </Card>
    </div>
  );
};

const getIconBrand = (brand: string) => {
  return (
    <>
      {brand === 'visa' && <Image src={VisaIcon} alt="" width={26} />}
      {brand === 'elo' && <Image src={EloIcon} alt="" width={26} />}
      {brand === 'mastercard' && (
        <Image src={MasterCardIcon} alt="" width={26} />
      )}
      {brand === 'hipercard' && <Image src={HiperCardIcon} alt="" width={26} />}
    </>
  );
};
