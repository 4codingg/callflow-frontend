import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import Warning from '@/assets/warning.svg';

import { CheckCircle, X, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface IModalConfirmCancelPlan {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  setSubscriptionIsActive?: Dispatch<SetStateAction<boolean>>;
}

export const ModalConfirmCancelPlan = ({
  setModalIsOpen,
  modalIsOpen,
  setSubscriptionIsActive,
}: IModalConfirmCancelPlan) => {
  const handleActionPlan = () => {
    setModalIsOpen(false);
    setSubscriptionIsActive((prevState) => !prevState);
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
              Cancelar Assinatura
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <div className="flex flex-col mt-8 gap-8">
            <section className="flex flex-col gap-8 items-center justify-start">
              <Image src={Warning} alt="warning" className="w-[100px]" />
              <div className="flex flex-col items-center gap-2">
                <Paragraph className=" text-black !font-poppins !font-semibold !text-xl">
                  Tem certeza disso?
                </Paragraph>
                <Paragraph className="!text-xs !text-default-grey">
                  Ao cancelar sua assinatura, todos os membros perderão acesso.
                </Paragraph>
              </div>
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
              className="!w-[109px] !h-[48px] font-medium !p-2"
              onClick={handleActionPlan}
            >
              Confirmar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
