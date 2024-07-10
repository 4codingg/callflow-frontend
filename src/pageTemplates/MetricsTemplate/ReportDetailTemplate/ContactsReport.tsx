import { ContactReportItem } from '@/@types/Report';
import { Card, Line, Paragraph, Spinner, TableDefault } from '@/components';

interface IContactsReportProps {
  data: ContactReportItem[];
  isLoading: boolean
}


export const ContactsReport = ({ data, isLoading }: IContactsReportProps) => {

  console.log(data)
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
          <TableDefault content={data || []} disableAccessItem disableDeleteItem disableEditItem />
        )}
      </div>
    </Card>
  );
};
