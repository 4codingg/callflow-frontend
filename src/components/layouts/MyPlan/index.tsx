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
    <div className="flex flex-col gap-4 mt-4">
      <Card>
        <Paragraph className="font-medium !text-base">Plano</Paragraph>
        <Line className="my-4" />
        <Paragraph className="font-medium !text-base">Grátis</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Para estudantes, testers e amadores.
        </Paragraph>
        <Button
          className="!w-[230px] h-[40px] font-normal !text-xs mt-4"
          rightIcon={<ArrowRight color="#FFF" size={20} />}
        >
          Conferir upgrades de plano
        </Button>
      </Card>
      <Card>
        <Paragraph className="font-medium !text-base">
          Histórico de cobranças
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Histórico dos pagamentos das cobranças referentes apenas ao valor do
          seu <span className="text-primary">plano</span>.
        </Paragraph>
        <Line className="my-4" />
        <div className="mt-4">
          <TableInvoicesPayments invoices={INVOICES_MOCK} />
        </div>
      </Card>
    </div>
  );
};
