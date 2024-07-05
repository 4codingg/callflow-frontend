import { Card, EmptyState, Line, Paragraph, TableDefault } from "@/components";
import Empty from "@/assets/empty-state.png"
import { useRouter } from "next/router";

import { getReportsList } from "@/api/reports/get-reports";
import { useQuery } from "@tanstack/react-query";

interface ReportProps {
  id: string;
  reproduceAt: string;
  cost: number;
  nameContactList: string
}

const dataReportServiceList: ReportProps[] = [
  {
    id: '1',
    reproduceAt: '2023-07-01T10:30:00',
    cost: 1000,
    nameContactList: 'John Doe'
  },
  {
    id: '2',
    reproduceAt: '2023-07-02T11:45:00',
    cost: 1500,
    nameContactList: 'Jane Smith'
  },
  {
    id: '3',
    reproduceAt: '2023-07-03T12:00:00',
    cost: 2000,
    nameContactList: 'Alice Johnson'
  },
  {
    id: '4',
    reproduceAt: '2023-07-04T09:15:00',
    cost: 2500,
    nameContactList: 'Bob Brown'
  },
  {
    id: '5',
    reproduceAt: '2023-07-05T08:45:00',
    cost: 3000,
    nameContactList: 'Charlie Davis'
  },
  {
    id: '6',
    reproduceAt: '2023-07-06T14:30:00',
    cost: 3500,
    nameContactList: 'Diana Miller'
  },
  {
    id: '7',
    reproduceAt: '2023-07-07T16:00:00',
    cost: 4000,
    nameContactList: 'Evan Wilson'
  },
  {
    id: '8',
    reproduceAt: '2023-07-08T18:45:00',
    cost: 4500,
    nameContactList: 'Fiona Clark'
  },
  {
    id: '9',
    reproduceAt: '2023-07-09T20:30:00',
    cost: 5000,
    nameContactList: 'George Hall'
  },
  {
    id: '10',
    reproduceAt: '2023-07-10T22:15:00',
    cost: 5500,
    nameContactList: 'Hannah Allen'
  }
];



export const ReportServices = () => {
  const router = useRouter()
  function handleAccessReport(id: string) {
    router.push(`metrics/reports/${id}`)
  }

  const { data: reportsList } = useQuery({
    queryKey: ['reports'],
    queryFn: getReportsList
  });
  return (
    <Card>
      <header>
        <Paragraph className="font-medium !text-base">Seu saldo</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Saldo relatório para fazer ações na plataforma
          <span className="text-primary"> call.flow</span>
        </Paragraph>
      </header>
      <Line className="my-4" />
      {reportsList && reportsList.length > 0 ? (
        <TableDefault
          content={reportsList || []}
          disableEditItem
          disableDeleteItem
          handleAccessItem={handleAccessReport}
        />
      ) : (
        <EmptyState
          icon={Empty}
          title="A lista de relatórios está vazia"
          description="Envie mensagens, e-mail ou ligações e visualize seu relatório."
        />
      )}
    </Card>
  );
}
