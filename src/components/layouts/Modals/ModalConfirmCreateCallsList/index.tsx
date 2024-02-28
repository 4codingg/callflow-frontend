import { Button, ButtonVariant } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Modal } from '@/components/Modal';
import { Paragraph } from '@/components/Paragraph';
import { convertCamelCaseToWords } from '@/utils/convertCamelCaseToWords';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface IModalConfirmCreateCallsListProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  variables: string[];
  handleCreateCallsList: () => void;
}

export const ModalConfirmCreateCallsList = ({
  setModalIsOpen,
  modalIsOpen,
  variables,
  handleCreateCallsList,
}: IModalConfirmCreateCallsListProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[400px]">
          <Heading>Criar lista de ligações</Heading>
          <Paragraph className="text-base">
            Confirme os dados da sua lista.
          </Paragraph>
          <div className=" mt-6">
            <Paragraph className="font-bold text-base">
              Quantidade de registros:
            </Paragraph>
            <Paragraph>4</Paragraph>
          </div>
          <div className=" mt-6">
            <Paragraph className="font-bold text-base">
              Variáveis disponíveis:
            </Paragraph>
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {variables.map((variable) => (
                <div className="bg-primary px-2 py-1 rounded-full">
                  <Paragraph className="text-white !text-xs font-medium">
                    {convertCamelCaseToWords(variable)}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
          <div className=" mt-6">
            <Paragraph className="font-bold text-base">Nome:</Paragraph>
            <Paragraph>Amplifi Calls</Paragraph>
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            <Button
              variant={ButtonVariant.Secondary}
              leftIcon={<XCircle color="#783EFD" size={16} />}
              onClick={() => setModalIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCallsList}
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
