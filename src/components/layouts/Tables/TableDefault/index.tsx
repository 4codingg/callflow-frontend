import { ReactNode } from "react";
import { EmptyState } from "@/components";
import { Table, TableBody } from "@/components/ui/table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Pagination } from "@/components/Pagination";

interface ITableProps {
  content: any[];
  showIdColumn?: false;
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  tableTitle?: string;
  headerComponent?: ReactNode;
  checkBox?: boolean;
  showFields?: string[];
}

export const TableDefault = ({
  content,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  showFields = [],
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter(
        (item) =>
          item !== "id" &&
          (showFields.length === 0 || showFields.includes(item))
      )
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
                  {content.map((item) => {
                    return (
                      <TableRow
                        item={item}
                        titles={titles}
                        handleAccessItem={handleAccessItem}
                        handleDeleteItem={handleDeleteItem}
                        handleEditItem={handleEditItem}
                        disableAccessItem={disableAccessItem}
                        disableEditItem={disableEditItem}
                        disableDeleteItem={disableDeleteItem}
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
        <EmptyState title="Nada foi encontrado" />
      )}
    </>
  );
};
