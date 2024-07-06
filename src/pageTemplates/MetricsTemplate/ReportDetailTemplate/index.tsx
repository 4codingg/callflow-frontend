import { LayoutWithSidebar } from '@/components';
import { CrumbsReportDetail } from './CrumbsReportDetail';
import { CostReport } from './CostReport';
import { ContactsReport } from './ContactsReport';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchReportsDetail } from '@/api/reports/fecth-reports-detail';
import { CONTACTS_REPORT_MOCK } from '@/constants/reports';



export const ReportDetailTemplate = () => {
  const [reportDetail, setReportDetail] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { id } = router.query;

  const { data: reportsListDetail } = useQuery({
    queryKey: ['reports-detail'],
    queryFn: () => fetchReportsDetail(id),
  });

  useEffect(() => {
    if (reportsListDetail) {
      setLoading(true);
      try {
        setReportDetail(reportsListDetail?.data?.contactItems);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
  }, [reportsListDetail]);
  console.log(reportsListDetail)

  return (
    <LayoutWithSidebar>
      <CrumbsReportDetail reportName="#999123cca1" />
      <CostReport />
      <ContactsReport data={reportDetail} />
    </LayoutWithSidebar>
  );
};
