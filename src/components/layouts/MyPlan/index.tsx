import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Line } from '@/components/Line';
import { Paragraph } from '@/components/Paragraph';
import { INVOICES_MOCK } from '@/constants/invoices';
import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { TableInvoicesPayments } from '../Tables/TableInvoicesPayments';
import 'react-credit-cards/es/styles-compiled.css';

export const MyPlan = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Paragraph className="font-medium !text-base">Plano</Paragraph>
        <Line className="my-4" />
        <Paragraph className="font-medium !text-base">Grátis</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Para estudantes e testers.
        </Paragraph>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<ArrowRight color="#FFF" size={20} />}
        >
          Conferir upgrades de plano
        </Button>
      </Card>
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
        >
          Adicionar saldo
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Histórico de cobranças
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Histórico dos pagamentos das cobranças referentes apenas ao valor do
          seu plano.
        </Paragraph>
        <Line className="my-4" />
        <div className="mt-4">
          <TableInvoicesPayments invoices={INVOICES_MOCK} />
        </div>
      </Card>
    </div>
  );
};
