import { TableCell } from "@/components/ui/table";
import { CaretRight, PencilLine, Trash } from "phosphor-react";

interface ITableButtonsProps {
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  item: any;
  width: any;
}

export const TableButtons = ({
  handleAccessItem = null,
  handleDeleteItem = null,
  handleEditItem = null,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  item,
  width,
}: ITableButtonsProps) => {
  return (
    <TableCell className={`flex  gap-2`} style={{ width }}>
      {!disableDeleteItem && (
        <button
          onClick={() => handleDeleteItem(item.id)}
          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
        >
          <Trash size={20} className="text-primary hover:text-white" />
        </button>
      )}
      {!disableEditItem && (
        <button
          onClick={() => handleEditItem(item.id)}
          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
        >
          <PencilLine size={20} className="text-primary hover:text-white" />
        </button>
      )}
      {!disableAccessItem && (
        <button
          onClick={() => handleAccessItem(item.id)}
          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
        >
          <CaretRight size={20} className="text-primary hover:text-white" />
        </button>
      )}
    </TableCell>
  );
};
