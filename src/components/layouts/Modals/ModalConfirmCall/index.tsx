import {
  Button,
  ButtonVariant,
  Line,
  Modal,
  Paragraph,
  Dropdown,
  TextArea,
  Label,
  ParagraphSizeVariant,
} from '@/components';
import { OPTIONS_LIST } from '@/constants/contentCalls';
import { ArrowRight, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from '@/utils/toast';

interface IModalConfirmCallProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalConfirmCall = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalConfirmCallProps) => {
  const handleSave = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    setModalIsOpen(false);
    toast('success', 'Envio de ligação em massa realizado com sucesso!');
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
              Confirme as informações do seu envio em massa
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
            <Dropdown options={OPTIONS_LIST} label="Lista de Contatos" />
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
              label="Mensagem da ligação"
              placeholder="Olá {Nome}, Seja bem-vindo(a)..."
              className="mt-3"
            />
            <section className="flex justify-end mt-[17px]">
              <Button
                type="button"
                className="text-xs font-normal !w-[197px] h-[48px] "
                onClick={handleSubmit}
                rightIcon={<ArrowRight size={18} />}
              >
                Confirmar e Enviar
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};