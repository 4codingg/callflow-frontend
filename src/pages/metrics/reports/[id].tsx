import { ReportDetailTemplate } from '@/pageTemplates/MetricsTemplate/ReportDetailTemplate';
import { canSSRAuth } from '@/utils/canSSRAuth';

const ReportDetail = () => <ReportDetailTemplate />;

export default ReportDetail;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
