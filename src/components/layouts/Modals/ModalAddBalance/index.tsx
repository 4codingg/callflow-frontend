import { Button, ButtonVariant } from "@/components/Button";
import { DropdownPaymentMethods } from "@/components/DropdownPaymentMethods";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { MOCK_ADDBALANCE, MOCK_PAYMENTS_METHODS } from "@/constants/tabsWallet";
import { useCallsList } from "@/hooks/useCallsList";

import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

interface IModalAddBalance {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddItem?: any;
}

interface IAddContacts {
  name: string;
  email: string;
  phone: string;
  id: string | number;
}

export const ModalAddBalance = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddBalance) => {
  const { handleAddContactToCallsList } = useCallsList();
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState("");

  const paymentMethodId = MOCK_PAYMENTS_METHODS[0].id.toString();
  const handleChangePaymentMethod = (paymentMethodId: string) => {
    setPendingPaymentMethod(paymentMethodId);
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white p-4 min-w-[430px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Adicionar contato
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <div className="flex flex-col mt-8 gap-8">
            <DropdownPaymentMethods
              options={MOCK_PAYMENTS_METHODS}
              value={paymentMethodId}
              onValueChange={handleChangePaymentMethod}
            />
            <div className="flex h-11 gap-2">
              {MOCK_ADDBALANCE.map((item) => {
                return (
                  <Button className=" rounded-sm !text-primary bg-white border-2 ">
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
                32,<span className="!text-xl"> 00 </span>
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
              }}
            >
              Descartar Alterações
            </Button>
            <Button
              leftIcon={<CheckCircle size={24} />}
              type="submit"
              className="!w-[109px] !h-[48px] font-medium"
            >
              Salvar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
