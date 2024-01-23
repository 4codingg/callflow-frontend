import { convertCamelCaseToWords } from '@/utils/convertCamelCaseToWords';
import { CaretRight, PencilLine, Trash } from 'phosphor-react';
import { Line } from '@/components/Line';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import SearchImage from '@/assets/search.svg';
import HiperCardIcon from '@/assets/icons/hipercard-icon.svg';
import MasterCardIcon from '@/assets/icons/mastercard-icon.svg';
import EloIcon from '@/assets/icons/elo-icon.svg';
import VisaIcon from '@/assets/icons/visa-icon.svg';
import Image from 'next/image';
import { Heading } from '@/components/Heading';
import { ReactNode } from 'react';

interface ITablePaymentMethodsProps {
  paymentMethods: any[];
  showIdColumn?: false;
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  emptyMessage?: string;
  tableTitle?: string;
  headerComponent?: ReactNode;
}

export const TablePaymentMethods = ({
  paymentMethods,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  emptyMessage,
  tableTitle,
  headerComponent,
}: ITablePaymentMethodsProps) => {
  const titles = [
    'Apelido',
    'Método de pagamento',
    'Data de expiração',
    'Endereço de cobrança',
  ];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col bg-white w-full px-8 py-6 rounded-2xl">
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
              {paymentMethods.map((item) => (
                <tr
                  key={item.name}
                  className="w-full flex hover:bg-background px-8 py-4"
                >
                  {titles.map((title, index) => (
                    <td
                      className={`flex `}
                      style={{ width: calculateWidthSize() }}
                    >
                      {index === 0 && <Paragraph>{item.name}</Paragraph>}
                      {index === 1 && (
                        <div className="flex items-center gap-2">
                          {getIconBrand(item.brand)}
                          <Paragraph>**** **** **** {item.last4}</Paragraph>
                        </div>
                      )}
                      {index === 2 && (
                        <Paragraph>{item.cardExpiration}</Paragraph>
                      )}
                      {index === 3 && (
                        <Paragraph>{item.billingAddress}</Paragraph>
                      )}
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
              Total Items: {paymentMethods.length}
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

const getIconBrand = (brand: string) => {
  return (
    <>
      {brand === 'visa' && <Image src={VisaIcon} alt="" width={26} />}
      {brand === 'elo' && <Image src={EloIcon} alt="" width={26} />}
      {brand === 'mastercard' && (
        <Image src={MasterCardIcon} alt="" width={26} />
      )}
      {brand === 'hipercard' && <Image src={HiperCardIcon} alt="" width={26} />}
    </>
  );
};
