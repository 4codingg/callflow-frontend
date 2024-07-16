import { ContactReportItem } from '@/@types/Report';
import { Card, Line, Paragraph, Spinner, TableDefault } from '@/components';
import { formatDateToDDMMYYYYHHMM } from '@/utils/formatDateToDDMMYYYYHHMM';

interface IContactsReportProps {
  data: ContactReportItem[];
  isLoading: boolean;
  reproducedAt?: string
}

export const ContactsReport = ({ data, isLoading, reproducedAt }: IContactsReportProps) => {

  const reproducedAtFormated = formatDateToDDMMYYYYHHMM(String(reproducedAt))

  return (
    <Card className="flex flex-col mt-6">
      <header>
        <Paragraph className="font-medium !text-base">Reproduções</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Cheque as reproduções que foram feitas
        </Paragraph>
      </header>
      <Line className="my-4" />
      <div className="flex w-full items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <TableDefault content={data || []} disableAccessItem disableDeleteItem disableEditItem reproducedAt={reproducedAtFormated} />
        )}
      </div>
    </Card>
  );
};
