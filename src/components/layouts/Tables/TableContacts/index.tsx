import { Table, TableBody } from '@/components/ui/table';
import { Pagination } from '@/components/Pagination';
import { TableHeader } from '../TableDefault/TableHeader';
import { TableRow } from './TableRow';

interface ITableProps {
  content: any[];
  pendingDocuments: any[];
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
}

export const TableContacts = ({
  content,
  pendingDocuments,
  handleDeleteItem,
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != 'id')
    : [];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <>
      {titles.length ? (
        <div className="w-full">
          <div className="space-y-2.5">
            <div className="border rounded-md">
              <Table>
                <TableHeader titles={titles} width={calculateWidthSize()} />
                <TableBody>
                  {content.map((item, index) => {
                    const isPending = Boolean(
                      pendingDocuments.find((pD) => pD.id === item.id)
                    );

                    return (
                      <TableRow
                        isPending={isPending}
                        key={index}
                        handleDeleteItem={() => handleDeleteItem(item.id)}
                        titles={titles}
                        item={item}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <Pagination pageIndex={0} perPage={10} totalCount={105} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col  py-4"></div>
      )}
    </>
  );
};
