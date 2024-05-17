import { ISubscription } from "@/@types/Subscription";
import { Button, ButtonVariant } from "@/components/Button";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { useCompany } from "@/hooks/useCompany";
import Link from "next/link";
import { ArrowRight, CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IModalConfirmPlan {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  planToConfirm: ISubscription;
}

export const ModalConfirmPlan = ({
  setModalIsOpen,
  modalIsOpen,
  planToConfirm,
}: IModalConfirmPlan) => {
  const { paymentsMethods } = useCompany();
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [value, setValue] = useState(0);

  const handleChangePaymentMethod = (id: string) => {
    setPaymentMethodId(id);
  };

  useEffect(() => {
    if (paymentsMethods?.length) {
      const defaultPaymentMethod = paymentsMethods.find(
        (paymentMethod) => paymentMethod.default
      );
      setPaymentMethodId(defaultPaymentMethod.id);
    }
  }, [paymentsMethods]);

  function handleAssignSubscription() {}

  const existsPaymentMethods = !!paymentsMethods?.length;

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[530px] min-h-[460px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Pronto para assinar?
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <div className="flex flex-col mt-4 gap-4">
            <section>
              <Paragraph className="!text-xs !text-default-grey">
                Ao confirmar sua assinatura, você desfrutará de todos os
                benefícios do nosso plano
                <span className=" font-bold text-primary"> Premium</span>. Esta
                ação resultará em uma cobrança automática mensal.
              </Paragraph>
            </section>

            <Paragraph className="text-xl font-bold mt-8">
              Plano {planToConfirm?.name}
            </Paragraph>

            <section className="flex gap-2 items-center ">
              <Paragraph className=" text-primary text-center !font-poppins !font-semibold !text-3xl">
                R$
              </Paragraph>
              <Paragraph className=" text-black !font-poppins !font-semibold !text-5xl">
                {planToConfirm?.value}
                <span className="text-default-grey !text-xs"> /mês</span>
              </Paragraph>
            </section>
            <section className="flex justify-center items-center w-full mt-5">
              {existsPaymentMethods ? (
                <DropdownPaymentMethods
                  options={paymentsMethods}
                  value={paymentMethodId}
                  onValueChange={handleChangePaymentMethod}
                />
              ) : (
                <div className="flex flex-col items-end gap-2 w-full mt-5">
                  <Paragraph>
                    Você não possui nenhum método de pagamento.
                  </Paragraph>
                  <Link href="/wallet">
                    <Paragraph className="text-xs !text-primary flex gap-2">
                      Adicionar método de pagamento
                      <ArrowRight color="#783EFD" size={16} />
                    </Paragraph>
                  </Link>
                </div>
              )}
            </section>
          </div>
          {existsPaymentMethods && (
            <section className="flex justify-end items-center gap-4 mt-12">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                Descartar Alterações
              </Button>
              <Button
                leftIcon={<CheckCircle size={24} />}
                type="submit"
                className="!w-[109px] !h-[48px] font-medium"
                onClick={() => handleAssignSubscription}
              >
                Salvar
              </Button>
            </section>
          )}
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
