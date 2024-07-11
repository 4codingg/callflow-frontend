import { LayoutWithSidebar } from '@/components';
import { CrumbsReportDetail } from './CrumbsReportDetail';
import { CostReport } from './CostReport';
import { ContactsReport } from './ContactsReport';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getReportsDetail } from '@/api/reports/get-reports-detail';

export const ReportDetailTemplate = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: reportDetail, isLoading } = useQuery({
    queryKey: ['reports-detail'],
    queryFn: () => getReportsDetail(id as string),
  });

  return (
    <LayoutWithSidebar>
      <CrumbsReportDetail reportName={reportDetail?.data?.id} />
      <CostReport costReports={reportDetail?.data?.cost} />
      <ContactsReport
        isLoading={isLoading}
        data={reportDetail?.data?.contactItems}
      />
    </LayoutWithSidebar>
  );
};
