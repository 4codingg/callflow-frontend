import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";
import { Trash } from "phosphor-react";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import SearchImage from "@/assets/search.svg";
import HiperCardIcon from "@/assets/icons/hipercard-icon.svg";
import MasterCardIcon from "@/assets/icons/mastercard-icon.svg";
import EloIcon from "@/assets/icons/elo-icon.svg";
import VisaIcon from "@/assets/icons/visa-icon.svg";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { deleteCardPaymentMethod } from "@/api/wallet/delete-payment-method";
import { queryClient } from "@/services/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import { confirmActionToast } from "@/utils/confirmActionToast";

interface ITablePaymentMethodsProps {
  paymentMethods: any[];
  handleDeleteItem?: (id: string) => void;
  emptyMessage?: string;
  tableTitle?: string;
}

export const TablePaymentMethods = ({
  paymentMethods,
  handleDeleteItem,
  emptyMessage,
  tableTitle,
}: ITablePaymentMethodsProps) => {
  const titles = [
    "Apelido",
    "Método de pagamento",
    "Data de expiração",
    "Endereço de cobrança",
  ];

  const { mutateAsync: deleteCardPaymentMethodFn } = useMutation({
    mutationFn: deleteCardPaymentMethod,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["payment-method"],
      });
    },
  });
  const handleDeletePaymentMethod = async (id: string) => {
    confirmActionToast("Você realmente deseja remover o cartão?", async () => {
      try {
        await deleteCardPaymentMethodFn(id);
      } catch (error) {
        toast(
          "error",
          "Ocorreu um erro ao deletar seu método de pagamento. Tente novamente."
        );
      }
    });
  };
  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col border border-muted shadow-md w-full px-8 py-6 rounded">
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
              {Array.isArray(paymentMethods) &&
                paymentMethods.map((item) => (
                  <tr
                    key={item.name}
                    className="w-full flex hover:bg-background px-8 py-4"
                  >
                    {titles.map((title, index) => (
                      <td
                        key={`${item.name}-${index}`} // Chave única para cada célula
                        className={`flex `}
                        style={{ width: calculateWidthSize() }}
                      >
                        {index === 0 && <Paragraph>{item.nickname}</Paragraph>}
                        {index === 1 && (
                          <div className="flex items-center gap-2">
                            {getIconBrand(item.brand)}
                            <Paragraph>**** **** **** {item.last4}</Paragraph>
                          </div>
                        )}
                        {index === 2 && <Paragraph>{item.expiry}</Paragraph>}
                        {index === 3 && <Paragraph>{item.address}</Paragraph>}
                      </td>
                    ))}
                    <td
                      className={`flex  gap-2`}
                      style={{ width: calculateWidthSize() }}
                    >
                      <button
                        onClick={() => handleDeletePaymentMethod(item.id)}
                        className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                      >
                        <Trash
                          size={20}
                          className="text-primary hover:text-white"
                        />
                      </button>
                    </td>
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

const getIconBrand = (brand: string) => {
  return (
    <>
      {brand.toLowerCase() === "visa" && (
        <Image src={VisaIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "elo" && (
        <Image src={EloIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "mastercard" && (
        <Image src={MasterCardIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "hipercard" && (
        <Image src={HiperCardIcon} alt="" width={26} />
      )}
    </>
  );
};
