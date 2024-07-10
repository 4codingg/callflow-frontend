import { Button, ButtonVariant } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Paragraph } from '@/components/Paragraph';
import { TextArea } from '@/components/TextArea';
import { convertCamelCaseToWordsAndTranslate } from '@/utils/convertCamelCaseToWords';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

const variables = ['name', 'email', 'phone', 'price'];

interface IModalPlayListProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalPlayCallsList = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalPlayListProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-8 min-w-[400px]">
          <div>
            <div className=" mt-6">
              <Paragraph className="font-bold text-base">
                Variáveis disponíveis
              </Paragraph>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {variables.map((variable) => (
                  <div
                    key={variable}
                    className="bg-primary px-2 py-1 rounded-full"
                  >
                    <Paragraph className="text-white !text-xs font-medium">
                      {convertCamelCaseToWordsAndTranslate(variable)}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </div>
            <Paragraph className="font-bold text-base mt-6 mb-2">
              Digite sua mensagem
            </Paragraph>
            <TextArea />
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <Button
              variant={ButtonVariant.Secondary}
              leftIcon={<XCircle color="#783EFD" size={16} />}
              onClick={() => setModalIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {}}
              leftIcon={<CheckCircle color="#fff" size={16} />}
            >
              Criar
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
