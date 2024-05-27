import { TableCell, TableRow as TR } from "@/components/ui/table";
import { FloppyDisk, Trash } from "phosphor-react";

interface ITableRowProps {
  item: any;
  titles: string[];
  handleDeleteItem?: (id: string) => void;
  isPending: boolean;
}

export const TableRow = ({
  item,
  titles,
  handleDeleteItem,
  isPending,
}: ITableRowProps) => {
  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <TR key={item.name}>
      {titles.map((title) => (
        <TableCell
          key={title}
          style={{ width: calculateWidthSize() }}
          className="font-medium"
        >
          {item[title]}
        </TableCell>
      ))}
      <TableCell>
        {isPending ? (
          <div className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full">
            <FloppyDisk color="#FFF" />
          </div>
        ) : (
          <td className={`flex  gap-2`} style={{ width: calculateWidthSize() }}>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
            >
              <Trash size={20} className="text-primary hover:text-white" />
            </button>
          </td>
        )}
      </TableCell>
    </TR>
  );
};
