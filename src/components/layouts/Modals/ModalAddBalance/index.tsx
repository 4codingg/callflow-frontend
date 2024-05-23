import { createCharge } from "@/api/wallet/create-charge";
import { payChargeWithCreditCard } from "@/api/wallet/pay-charge-with-credit-card";
import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { PreviewPaymentMethod } from "@/components/PrevieviewMethods";
import { Spinner } from "@/components/Spinner";
import { MOCK_ADD_BALANCE } from "@/constants/wallet";
import { useCompany } from "@/hooks/useCompany";
import { handleErrors } from "@/utils/handleErrors";
import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ModalAddPaymentMethod } from "../ModalAddPaymentMethod";

interface IModalAddBalance {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalAddBalance = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddBalance) => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAddPaymentMethodIsOpen, setModalAddPaymentMethodIsOpen] =
    useState(false);
  const { paymentsMethods } = useCompany();
  const queryClient = useQueryClient();

  const defaultPaymentMethod = paymentsMethods?.find(
    (item) => item.default === true
  );

  const handleAddBalance = async (cost) => {
    setIsLoading(true);
    try {
      const { charge } = await createChargeFn({
        value: cost,
        billingType: "CREDIT_CARD",
      });

      await payChargeWithCreditCardFn({
        chargeId: charge,
      });

      setModalIsOpen(false);
      toast("success", "Saldo reabastecido com sucesso.");
      setValue(0);
    } catch (err: any) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { mutateAsync: createChargeFn } = useMutation({
    mutationFn: createCharge,
  });

  const { mutateAsync: payChargeWithCreditCardFn } = useMutation({
    mutationFn: payChargeWithCreditCard,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["company-detail"] });
    },
  });

  const handleAddPaymentMethod = () => {
    setModalIsOpen(false);
    setModalAddPaymentMethodIsOpen(true);
  };

  return (
    <>
      <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <Modal.Content className="min-w-[430px]">
          <div className="bg-white py-4 ">
            <header className="flex justify-between items-center w-full flex-1">
              <Paragraph
                size={ParagraphSizeVariant.Medium}
                className=" text-purple-secundary !font-medium "
              >
                Adicionar saldo
              </Paragraph>
              <Modal.Close>
                <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                  <XCircle size={24} color="#000" />
                </Button>
              </Modal.Close>
            </header>
            <Line direction="horizontal" className="mt-4" />

            {paymentsMethods?.length == 0 ? (
              <>
                <Paragraph
                  size={ParagraphSizeVariant.Medium}
                  className=" text-center !mt-6"
                >
                  Você não possui métodos de pagamentos.
                </Paragraph>
                <Button
                  type="button"
                  className="!mt-6"
                  onClick={() => handleAddPaymentMethod()}
                >
                  Adicionar método de pagamento
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col mt-8 gap-8">
                  <PreviewPaymentMethod
                    paymentMethods={paymentsMethods}
                    value={defaultPaymentMethod?.id}
                  />
                  <div className="flex h-11 gap-2">
                    {MOCK_ADD_BALANCE.map((item) => {
                      return (
                        <Button
                          className=" rounded-sm !text-primary bg-white border-2"
                          onClick={() => setValue(value + item)}
                        >
                          + R$ {item}
                        </Button>
                      );
                    })}
                  </div>

                  <section className="flex gap-2 h-20 items-center">
                    <Paragraph className=" text-primary !font-poppins !font-semibold !text-2xl">
                      R$
                    </Paragraph>
                    <Paragraph className=" text-black !font-poppins !font-semibold !text-3xl">
                      {value},<span className="!text-xl"> 00 </span>
                    </Paragraph>
                  </section>
                </div>
                <section className="flex justify-end items-center gap-4 mt-8">
                  <Button
                    leftIcon={<X size={24} />}
                    type="button"
                    className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                    onClick={() => {
                      setModalIsOpen(false);
                      setValue(0);
                    }}
                  >
                    Descartar Alterações
                  </Button>
                  <Button
                    leftIcon={<CheckCircle size={24} />}
                    type="submit"
                    className="!w-[109px] !h-[48px] font-medium"
                    onClick={() => handleAddBalance(value)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : "Salvar"}
                  </Button>
                </section>
              </>
            )}
          </div>
        </Modal.Content>
      </Modal.Root>
      <ModalAddPaymentMethod
        modalIsOpen={modalAddPaymentMethodIsOpen}
        setModalIsOpen={setModalAddPaymentMethodIsOpen}
      />
    </>
  );
};
