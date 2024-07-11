import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '../Paragraph';
import { XCircle } from 'phosphor-react';
import { useState } from 'react';
import { TextArea } from '../TextArea';
import { Line } from '../Line';
import { Button } from '../Button';

interface IModalMessageCell {
  item: string;
}

export function MessageCell({ item }: IModalMessageCell) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setModalIsOpen(true)}>Ver mensagem</Button>
      {modalIsOpen && (
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
                  <button
                    className="!w-6 !h-6"
                    onClick={() => setModalIsOpen(false)}
                  >
                    <XCircle size={24} color="#000" />
                  </button>
                </Modal.Close>
              </header>
              <Line direction="horizontal" className="mt-3" />
              <div className="w-full mt-7">
                <TextArea value={item} />
              </div>
            </div>
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
}
