import { convertCamelCaseToWordsAndTranslate } from '@/utils/convertCamelCaseToWords';
import { CaretRight, FloppyDisk, PencilLine, Trash } from 'phosphor-react';
import { Paragraph } from '@/components/Paragraph';
import { TableHeader } from '@/components/layouts/Headers/TableHeader';

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
  handleAccessItem,
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
      <header>
        <TableHeader
          title="Contatos"
          dataIsPending={!!pendingDocuments.length}
        />
      </header>
      {titles.length ? (
        <>
          <table className="w-full flex flex-col">
            <thead className="flex bg-light-light-grey py-4 px-4 rounded-lg border-light-grey border">
              <tr className="flex justify-between w-full">
                {titles.map((title) => {
                  return (
                    <th
                      key={title}
                      className={`flex justify-start`}
                      style={{ width: calculateWidthSize() }}
                    >
                      <Paragraph className="font-medium">
                        {convertCamelCaseToWordsAndTranslate(title)}
                      </Paragraph>
                    </th>
                  );
                })}
                <th
                  className={`flex justify-start`}
                  style={{ width: calculateWidthSize() }}
                ></th>
              </tr>
            </thead>
            <tbody className={`flex flex-col gap-4 mt-4 w-full`}>
              {content.map((item) => {
                const isPending = Boolean(
                  pendingDocuments.find((pD) => pD.id === item.id)
                );

                return (
                  <tr
                    key={item.name}
                    className="w-full flex hover:bg-background px-4 py-4"
                  >
                    {titles.map((title) => (
                      <td
                        key={title}
                        className={`flex `}
                        style={{ width: calculateWidthSize() }}
                      >
                        <Paragraph>{item[title]}</Paragraph>
                      </td>
                    ))}
                    {isPending ? (
                      <div className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full">
                        <FloppyDisk color="#FFF" />
                      </div>
                    ) : (
                      <td
                        className={`flex  gap-2`}
                        style={{ width: calculateWidthSize() }}
                      >
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                        >
                          <Trash
                            size={20}
                            className="text-primary hover:text-white"
                          />
                        </button>
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                        >
                          <PencilLine
                            size={20}
                            className="text-primary hover:text-white"
                          />
                        </button>
                        <button
                          onClick={() => handleAccessItem(item.id)}
                          className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                        >
                          <CaretRight
                            size={20}
                            className="text-primary hover:text-white"
                          />
                        </button>
                      </td>
                    )}
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
