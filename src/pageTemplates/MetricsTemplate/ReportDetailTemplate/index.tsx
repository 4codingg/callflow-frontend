import { LayoutWithSidebar } from '@/components';
import { CrumbsReportDetail } from './CrumbsReportDetail';
import { CostReport } from './CostReport';
import { ContactsReport } from './ContactsReport';
import { useState } from 'react';
import { CONTACTS_REPORT_MOCK } from '@/constants/reports';

export const ReportDetailTemplate = () => {
  const [reportDetail, setReportDetail] = useState(CONTACTS_REPORT_MOCK);

  return (
    <LayoutWithSidebar>
      <CrumbsReportDetail reportName="#999123cca1" />
      <CostReport />
      <ContactsReport data={reportDetail} />
    </LayoutWithSidebar>
  );
};
