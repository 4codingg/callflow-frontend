import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { OPTIONSLIST } from '@/constants/contentCalls';
import { ArrowRight, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from '@/components/Dropdown';
import { TextArea } from '@/components/TextArea';
import { toast } from '@/utils/toast';
import { Label } from '@/components/Label';

interface IModalConfirmMessageProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalConfirmMessage = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalConfirmMessageProps) => {
  const handleSave = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    setModalIsOpen(false);
    toast('success', 'Envio de SMSs em massa realizado com sucesso!');
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[600px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Confirme as Informações do seu envio em massa
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <form
            className="mt-6 flex flex-col gap-6 min-w-[600px] max-h-[80vh] "
            onSubmit={handleSave}
          >
            <Dropdown options={OPTIONSLIST} label="Lista de Contatos" />
            <section className="flex gap-[16px]">
              <div className="flex flex-col w-full gap-3">
                <Label className="font-semibold text-sm">Contatos</Label>
                <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                  <Paragraph className="text-opacity-70">
                    33 contatos na lista
                  </Paragraph>
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <Label className="font-semibold text-sm">Custo</Label>
                <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                  <Paragraph className="text-primary">R$ 30,00</Paragraph>
                  <Paragraph className="text-black text-xs text-opacity-70">
                    (R$0,10 / contato)
                  </Paragraph>
                </div>
              </div>
            </section>
            <TextArea
              label="Mensagem"
              placeholder="Olá {Nome}, Seja bem-vindo(a)..."
              className="mt-3"
            />
            <section className="flex justify-end mt-[17px]">
              <Button
                type="button"
                className="text-xs font-normal !w-[197px] h-[48px] "
                onClick={handleSubmit}
              >
                Confirmar e Enviar <ArrowRight size={18} />
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
