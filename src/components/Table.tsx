import { convertCamelCaseToWords } from '@/utils/convertCamelCaseToWords';
import { CaretRight, PencilLine, Trash } from 'phosphor-react';
import { Line } from './Line';
import { Paragraph, ParagraphSizeVariant } from './Paragraph';
import SearchImage from '@/assets/search.svg';
import Image from 'next/image';
import { Heading } from './Heading';

interface ITableProps {
  content: any[];
  showIdColumn?: false;
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  emptyMessage?: string;
  tableTitle?: string;
}

export const Table = ({
  content,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  emptyMessage = 'Não foram encontrados dados.',
  tableTitle,
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != 'id')
    : [];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col bg-white w-full px-8 py-6 rounded-2xl">
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
                        {convertCamelCaseToWords(title)}
                      </Paragraph>
                    </th>
                  );
                })}
                <th
                  className={`flex justify-start`}
                  style={{ width: calculateWidthSize() }}
                >
                  {/* <Paragraph className="font-medium">Actions</Paragraph> */}
                </th>
              </tr>
            </thead>
            <tbody className={`flex flex-col gap-4 mt-4 w-full`}>
              {content.map((item) => (
                <tr
                  key={item.name}
                  className="w-full flex hover:bg-background px-8 py-4"
                >
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
          <Line className="my-4 " />
          <div>
            <Paragraph size={ParagraphSizeVariant.Large}>
              Total Items: {content.length}
            </Paragraph>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col  py-4">
          <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
            {emptyMessage}
          </Paragraph>
          <Image src={SearchImage} alt="" className="w-1/3 mt-6" />
        </div>
      )}
    </div>
  );
};
