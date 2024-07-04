import { Heading, LayoutWithSidebar, Paragraph, Tabs } from "@/components";
import { ServicesUsageCostChart } from "./ServicesUsageCostChart";
import { useState } from "react";
import {} from "@/constants/"
import { ETabsMetrics, TABS_METRICS } from "@/constants/tabsMetrics";
import { ReportServices } from "./ReportServices";


export const MetricsTemplate = () => {
  const [tabActive, setTabActive] = useState(TABS_METRICS[0]);
  return (
    <LayoutWithSidebar>
      <Heading>Métricas</Heading>
      <Paragraph className="!text-default-grey">
        Confira as métricas e seu uso na aplicação
        <span className="text-primary"> call.flow</span>.
      </Paragraph>

      <Tabs
              options={TABS_METRICS}
              optionActive={tabActive}
              onClick={(tab) => setTabActive(tab)}
            />
<div className="mt-4 flex w-full flex-col gap-4">
{tabActive === ETabsMetrics.Metrics &&  <ServicesUsageCostChart />  }
{tabActive === ETabsMetrics.Report && <ReportServices/> }
      </div>
    </LayoutWithSidebar>
  );
};
