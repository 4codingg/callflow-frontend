import { Card, EmptyState, Line, Paragraph, TableDefault } from '@/components';
import Empty from '@/assets/empty-state.png';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '@/api/reports/fetch-reports';

export const ReportServices = () => {
  const router = useRouter();

  function handleAccessReport(id: string) {
    router.push(`/metrics/reports/${id}`);
  }

  const { data: reportsList } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });

  return (
    <Card>
      <header>
        <Paragraph className="font-medium !text-base">Relatórios</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Visualize seus relatórios de envios de mensagens no
          <span className="text-primary"> call.flow</span>
        </Paragraph>
      </header>
      <Line className="my-4" />
      {reportsList && reportsList.data.length > 0 ? (
        <TableDefault
          content={reportsList.data || []}
          disableEditItem
          disableDeleteItem
          handleAccessItem={handleAccessReport}
        />
      ) : (
        <EmptyState
          icon={Empty}
          title="A lista de relatórios está vazia"
          description="Envie mensagens, e-mail ou ligações para possuir relatórios."
        />
      )}
    </Card>
  );
};
