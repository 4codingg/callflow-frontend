import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "../Paragraph";
import { XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextArea } from "../TextArea";
import { Line } from "../Line";
import { Button } from "../Button";

interface IModalMessageCell {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  item: string;
}

export function MessageCell({
  item,
  setModalIsOpen,
  modalIsOpen
}: IModalMessageCell) {
  const [buttonShowMessageIsActive, setButtonShowMessageIsActive] = useState(false);

  const handleButtonClick = () => {
    setButtonShowMessageIsActive(!buttonShowMessageIsActive);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setButtonShowMessageIsActive(false);
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setButtonShowMessageIsActive(false);
    }
  }, [modalIsOpen]);

  return (
    <div>
      <Button onClick={handleButtonClick}>Ver mensagem</Button>
      {buttonShowMessageIsActive ? (
        <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <Modal.Content className="min-w-[400px]">
            <div className="bg-white py-4">
              <header className="flex justify-between items-center w-full flex-1">
                <Paragraph
                  size={ParagraphSizeVariant.Medium}
                  className="text-purple-secundary !font-medium"
                >
                  Mensagem
                </Paragraph>
                <Modal.Close>
                  <button className="!w-6 !h-6" onClick={handleCloseModal}>
                    <XCircle size={24} color="#000" />
                  </button>
                </Modal.Close>
              </header>
              <Line direction="horizontal" className="mt-3" />
              <div className="w-full mt-7">
                <TextArea
                  value={item}
                />
              </div>
            </div>
          </Modal.Content>
        </Modal.Root>
      ) : (
        null
      )}
    </div>
  );
}
