import { Heading, LayoutWithSidebar, Paragraph } from '@/components';
import { ServicesUsageChart } from './ServicesUsageChart';
import { ServicesUsageCostChart } from './ServicesUsageCostChart';

export const MetricsTemplate = () => {
  return (
    <LayoutWithSidebar>
      <Heading>Métricas</Heading>
      <Paragraph className="!text-default-grey">
        Confira as métricas e seu uso na aplicação
        <span className="text-primary"> call.flow</span>.
      </Paragraph>
      <div className="mt-4 flex w-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <ServicesUsageChart />
          <ServicesUsageCostChart />
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
