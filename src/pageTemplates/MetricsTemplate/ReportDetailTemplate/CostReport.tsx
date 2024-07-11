import { ICostReports } from '@/@types/MassCommunication';
import { Card, Line, Paragraph } from '@/components';

interface ICostReportProps {
  costReports: ICostReports;
}

export const CostReport = ({ costReports }: ICostReportProps) => {
  return (
    <Card className="flex flex-col mt-6">
      <header>
        <Paragraph className="font-medium !text-base">
          Relatório de Custo
        </Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Relatório do custo da reprodução em massa
        </Paragraph>
      </header>
      <Line className="my-4" />
      <section className="w-full h-16 bg-primary flex justify-between items-center text-white border-b border-white px-8">
        <Paragraph className="text-white font-semibold">
          {costReports?.contacts?.length} contatos
        </Paragraph>
        <Paragraph className="text-white font-semibold w-[200px]">
          R$ {costReports?.contacts?.costByMessage} / mensagem
        </Paragraph>
        <Paragraph className="text-white font-semibold">
          R$ {costReports?.contacts?.totalCost}
        </Paragraph>
      </section>
      <section className="w-full h-16 bg-primary flex justify-between items-center text-white border-b border-white px-8">
        <Paragraph className="text-white font-semibold">
          {costReports?.bonus?.length} contatos
        </Paragraph>
        <Paragraph className="text-white font-semibold w-[200px]">
          Bônus
        </Paragraph>
        <Paragraph className="text-white font-semibold">
          R$ {costReports?.bonus?.totalCost}
        </Paragraph>
      </section>
      <section className="w-full h-16 bg-primary flex justify-between items-center text-white px-8">
        <Paragraph className="text-white font-semibold">Custo total</Paragraph>
        <Paragraph className="text-white font-semibold">
          R$ {costReports?.total}
        </Paragraph>
      </section>
    </Card>
  );
};
