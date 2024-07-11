import { TableCell, TableRow as TR } from "@/components/ui/table";
import { TableButtons } from "./TableButtons";
import { TableCellContent } from "./TableCellContent";

interface ITableRowProps {
  item: any;
  titles: string[];
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
}

export const TableRow = ({
  item,
  titles,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
}: ITableRowProps) => {
  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <TR>
      {titles.map((title) => (
        <TableCell
          key={title}
          style={{ width: calculateWidthSize() }}
          className="font-medium"
        >
          <TableCellContent item={item} title={title} />
        </TableCell>
      ))}
      <TableButtons
        handleAccessItem={handleAccessItem}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        disableAccessItem={disableAccessItem}
        disableEditItem={disableEditItem}
        disableDeleteItem={disableDeleteItem}
        item={item}
        width={calculateWidthSize()}
      />
    </TR>
  );
};
