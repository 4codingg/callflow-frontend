import { Breadcrumb } from '@/components';

export const CrumbsReportDetail = ({ reportName }) => {
  const getCrumbs = (reportName: string) => {
    return [
      {
        label: 'Métricas',
        path: '/metrics',
      },
      {
        label: reportName,
      },
    ];
  };

  return <Breadcrumb crumbs={getCrumbs(reportName)} />;
};
