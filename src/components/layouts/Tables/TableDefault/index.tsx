import { ReactNode } from "react";
import { EmptyState, Paragraph } from "@/components";
import { Table, TableBody } from "@/components/ui/table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Pagination } from "@/components/Pagination";
import Empty from "@/assets/empty-state.png";

interface ITableProps {
  content: any[];
  showIdColumn?: boolean;
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
  totalCount?: number;
  pageIndex?: number;
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
  pageIndex,
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
                  {content.map((item, index) => {
                    return (
                      <TableRow
                        key={index}
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

            <Pagination
              pageIndex={pageIndex}
              perPage={20}
              totalCount={content?.length || 0}
            />
          </div>
        </div>
      ) : (
        <EmptyState
          description="Existem relatórios pendentes"
          title="Sem histórico de relatórios"
          icon={Empty}
        />
      )}
    </>
  );
};
