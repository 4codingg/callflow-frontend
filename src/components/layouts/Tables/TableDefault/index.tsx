import { ReactNode } from "react";
import { Heading, Checkbox, Paragraph, EmptyState } from "@/components";
import { TableButtons } from "./TableButtons";
import { TableHead } from "./TableHead";

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
}

export const TableDefault = ({
  content,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  tableTitle,
  headerComponent,
  checkBox,
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != "id")
    : [];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col border border-muted shadow-sm w-full px-8 py-6 rounded">
      <header>{headerComponent}</header>
      {titles.length ? (
        <>
          <Heading className=" mb-4">{tableTitle}</Heading>
          <table className="w-full flex flex-col">
            <TableHead titles={titles} width={calculateWidthSize()} />
            <tbody className={`flex flex-col gap-4 mt-4 w-full`}>
              {content.map((item) => (
                <tr
                  key={item.name}
                  className="w-full flex hover:bg-background px-4 py-4"
                >
                  {checkBox && <Checkbox size={24} className="mr-3" />}
                  {titles.map((title) => (
                    <td
                      key={title}
                      className={`flex `}
                      style={{ width: calculateWidthSize() }}
                    >
                      <Paragraph>{item[title]}</Paragraph>
                    </td>
                  ))}
                  <TableButtons
                    handleDeleteItem={handleDeleteItem}
                    handleAccessItem={handleAccessItem}
                    handleEditItem={handleEditItem}
                    disableAccessItem={disableAccessItem}
                    disableEditItem={disableEditItem}
                    disableDeleteItem={disableDeleteItem}
                    item={item}
                    width={calculateWidthSize()}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <EmptyState title="Nada foi encontrado" />
      )}
    </div>
  );
};
