import { Heading, LayoutWithSidebar, Paragraph } from '@/components';
import { ServicesUsageCostChart } from './ServicesUsageCostChart';

const data = [
  {
    name: 'Junho 2023',
    cost: 135,
  },
  {
    name: 'Julho 2023',
    cost: 222,
  },
  {
    name: 'Agosto 2023',
    cost: 300,
  },
  {
    name: 'Setembro 2023',
    cost: 200,
  },
  {
    name: 'Outubro 2023',
    cost: 278,
  },
  {
    name: 'Novembro 2023',
    cost: 189,
  },
  {
    name: 'Dezembro 2023',
    cost: 239,
  },
  {
    name: 'Janeiro 2024',
    cost: 297,
  },
  {
    name: 'Fevereiro 2024',
    cost: 294,
  },
  {
    name: 'Março 2024',
    cost: 222,
  },
];

export const MetricsTemplate = () => {
  return (
    <LayoutWithSidebar>
      <Heading>Métricas</Heading>
      <Paragraph className="!text-default-grey">
        Confira as métricas e seu uso na aplicação
        <span className="text-primary"> call.flow</span>.
      </Paragraph>
      <div className="mt-4 flex w-full flex-col gap-4">
        <ServicesUsageCostChart
          data={data}
          label="SMSs"
          dataKey="cost"
          fillColor="#783EFD"
        />
      </div>
    </LayoutWithSidebar>
  );
};
