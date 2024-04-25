import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { INSTRUCTIONS } from "@/constants/contentCalls";
import Image from "next/image";
import { ArrowRight, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import Rocket from "@/assets/icons/rocket-launch.svg";

interface IModalAddItemFromContactsProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalStepByStep = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddItemFromContactsProps) => {
  const handleOk = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[700px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Enviando SMS em massa
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <form
            className="mt-6 flex flex-col gap-4 min-w-[600px] max-h-[80vh]"
            onSubmit={handleOk}
          >
            {INSTRUCTIONS.map((instruction) => {
              return (
                <div className="flex justify-start gap-4 items-center">
                  <section>
                    <Image src={Rocket} alt="Foguete" />
                  </section>
                  <section className="flex flex-col gap-[4px]">
                    <Paragraph className="text-primary !font-bold text-base">
                      Passo {instruction.id}
                    </Paragraph>
                    <Paragraph className="font-normal">
                      {instruction.description}
                    </Paragraph>
                  </section>
                </div>
              );
            })}
            <section className="flex justify-end mt-[17px]">
              <Button
                type="button"
                className="text-xs font-normal !w-[144px] "
                onClick={handleOk}
              >
                OK, entendi <ArrowRight size={18} />
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
