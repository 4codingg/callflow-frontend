import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { Spinner } from "@/components/Spinner";
import { Tipbox } from "@/components/Tipbox";
import { CheckCircle, Warning, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalConfirmVariables {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  variables?: string[];
  handleConfirmVariables: () => void;
  isLoading: boolean;
}

export const ModalConfirmVariables = ({
  setModalIsOpen,
  modalIsOpen,
  variables,
  handleConfirmVariables,
  isLoading,
}: IModalConfirmVariables) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[400px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Confirmar variáveis
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="my-3" />
          <Tipbox iconLeft={<Warning size={20} />}>
            Essa ação é irreversível.
          </Tipbox>
          <Paragraph className=" mt-8 font-poppins font-medium mb-4">
            Variáveis
          </Paragraph>
          <section className="flex gap-2">
            {variables.map((item, index) => (
              <div
                key={index}
                className="  h-7 bg-primary flex text-white rounded-3xl px-4 py-1 justify-between items-center gap-2 "
              >
                <Paragraph className=" text-white font-poppins font-medium text-xs">
                  {item}
                </Paragraph>
              </div>
            ))}
          </section>
          <form className="mt-6">
            <section className="flex justify-end items-center gap-4 mt-[16px]">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-24 !h-10 font-medium"
                onClick={() => setModalIsOpen(false)}
              >
                Voltar
              </Button>
              <Button
                leftIcon={<CheckCircle size={24} />}
                type="button"
                className="!w-32 !h-10 font-medium"
                onClick={handleConfirmVariables}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Confirmar"}
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
