import { PencilLine, Trash } from 'phosphor-react';
import { Paragraph } from '@/components/Paragraph';
import { TableHead } from '../TableDefault/TableHead';
import { TableButtons } from '../TableDefault/TableButtons';
import { Labelbox } from '@/components/Labelbox';
import { formatDateToDDMMYYYYHHMM } from '@/utils/formatDateToDDMMYYYYHHMM';

interface ITableProps {
  content: any[];
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
}

export const TableContactsList = ({
  content,
  handleDeleteItem,
  handleEditItem,
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != 'id')
    : [];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col border border-muted shadow-sm w-full px-8 py-6 rounded max-h-[500px] overflow-auto">
      {titles.length ? (
        <>
          <table className="w-full flex flex-col">
            <TableHead titles={titles} width={calculateWidthSize()} />
            <tbody className={`flex flex-col gap-4 mt-4 w-full`}>
              {content.map((item) => {
                return (
                  <tr
                    key={item.name}
                    className="w-full flex hover:bg-background px-4 py-4"
                  >
                    {titles.map((title) => (
                      <td
                        className={`flex `}
                        style={{ width: calculateWidthSize() }}
                      >
                        {title === 'name' && (
                          <Paragraph>{item[title]}</Paragraph>
                        )}
                        {title === 'variables' && (
                          <div className="flex gap-1 flex-wrap">
                            {item[title].map((variable, index) => {
                              return (
                                <Labelbox
                                  className="!px-2 py-1"
                                  classNameLabel="text-[10px] font-normal"
                                  label={variable}
                                  key={index}
                                />
                              );
                            })}
                          </div>
                        )}
                        {title === 'createdAt' && (
                          <Paragraph>
                            {formatDateToDDMMYYYYHHMM(item[title])}
                          </Paragraph>
                        )}
                        {title === 'contactsQuantity' && (
                          <Paragraph>{item[title]}</Paragraph>
                        )}
                      </td>
                    ))}
                    <TableButtons
                      handleDeleteItem={handleDeleteItem}
                      handleEditItem={handleEditItem}
                      disableAccessItem={true}
                      item={item}
                      width={calculateWidthSize()}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col  py-4"></div>
      )}
    </div>
  );
};
