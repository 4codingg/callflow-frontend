import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import SearchImage from "@/assets/search.svg";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { ReactNode } from "react";
import { getActivitieLabel } from "@/utils/getActivitieLabel";
import { clsx } from "clsx";
import { formatCurrency } from "@/utils/formatCurrency";

interface plaTransactions {
  price: number;
  processedAt: string;
  status: string;
}
interface ITableInvoicesPaymentsProps {
  invoices: any[];
  showIdColumn?: false;
  disableEditItem?: boolean;
  emptyMessage?: string;
  tableTitle?: string;
  headerComponent?: ReactNode;
}

export const TableInvoicesPayments = ({
  invoices,
  emptyMessage,
  tableTitle,
  headerComponent,
}: ITableInvoicesPaymentsProps) => {
  const titles = ["Data", "Valor", "Status"];

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col border border-muted shadow-md w-full px-8 py-6 rounded">
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
              {invoices.map((item) => (
                <tr
                  key={item.name}
                  className="w-full flex hover:bg-background  px-4 py-4"
                >
                  {titles.map((title, index) => (
                    <td
                      className={`flex `}
                      style={{ width: calculateWidthSize() }}
                    >
                      {index === 0 && (
                        <Paragraph className="!text-sm">{item.date}</Paragraph>
                      )}
                      {index === 1 && (
                        <Paragraph className="!text-sm">
                          {formatCurrency(item.price.toString())}
                        </Paragraph>
                      )}
                      {index === 2 && (
                        <Paragraph
                          className={clsx("flex items-center gap-2 !text-xs", {
                            "text-green": item.status === "paid",
                            "text-primary": item.status === "pending",
                          })}
                        >
                          <div
                            className={clsx("w-1 h-1 rounded-full", {
                              "bg-green": item.status === "paid",
                              "bg-primary": item.status === "pending",
                            })}
                          />
                          {getActivitieLabel(item.status)}
                        </Paragraph>
                      )}
                    </td>
                  ))}
                  <td
                    className={`flex  gap-2`}
                    style={{ width: calculateWidthSize() }}
                  ></td>
                </tr>
              ))}
            </tbody>
          </table>
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
