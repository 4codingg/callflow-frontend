import { convertCamelCaseToWordsAndTranslate } from '@/utils/convertCamelCaseToWords';
import { CaretRight, PencilLine, Trash } from 'phosphor-react';
import { Line } from './Line';
import { Paragraph, ParagraphSizeVariant } from './Paragraph';
import { Heading } from './Heading';
import { ReactNode } from 'react';
import { Checkbox } from '@/components/Checkbox';

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

export const Table = ({
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
    ? Object.keys(content[0]).filter((item) => item != 'id')
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
              {content.map((item) => (
                <tr
                  key={item.name}
                  className="w-full flex hover:bg-background px-4 py-4"
                >
                  {checkBox && <Checkbox size={24} className="mr-3" />}
                  {titles.map((title) => (
                    <td
                      className={`flex `}
                      style={{ width: calculateWidthSize() }}
                    >
                      <Paragraph>{item[title]}</Paragraph>
                    </td>
                  ))}
                  <td
                    className={`flex  gap-2`}
                    style={{ width: calculateWidthSize() }}
                  >
                    {!disableDeleteItem && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                      >
                        <Trash
                          size={20}
                          className="text-primary hover:text-white"
                        />
                      </button>
                    )}
                    {!disableEditItem && (
                      <button
                        onClick={() => handleEditItem(item.id)}
                        className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                      >
                        <PencilLine
                          size={20}
                          className="text-primary hover:text-white"
                        />
                      </button>
                    )}
                    {!disableAccessItem && (
                      <button
                        onClick={() => handleAccessItem(item.id)}
                        className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                      >
                        <CaretRight
                          size={20}
                          className="text-primary hover:text-white"
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col  py-4"></div>
      )}
    </div>
  );
};
