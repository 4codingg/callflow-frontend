import { ContactReportItem } from '@/@types/Report';
import { Card, Line, Paragraph, TableDefault } from '@/components';

interface IContactsReportProps {
  data: ContactReportItem[];
}

export const ContactsReport = ({ data }: IContactsReportProps) => {
  return (
    <Card className="flex flex-col mt-6">
      <header>
        <Paragraph className="font-medium !text-base">Reproduções</Paragraph>
        <Paragraph className="!text-xs !text-default-grey">
          Cheque as reproduções que foram feitas
        </Paragraph>
      </header>
      <Line className="my-4" />
      <div>
        <TableDefault content={data} />
      </div>
    </Card>
  );
};
