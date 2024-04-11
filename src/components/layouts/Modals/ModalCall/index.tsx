import {
  Button,
  ButtonVariant,
  Modal,
  Line,
  Paragraph,
  ParagraphSizeVariant,
  TextArea,
} from '@/components';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IModalCallProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalCall = ({ setModalIsOpen, modalIsOpen }: IModalCallProps) => {
  const variables = ['nome', 'telefone', 'email'];
  const [message, setMessage] = useState('');

  const formatText = () => {
    let formattedText = message;
    variables.forEach((variable) => {
      const regex = new RegExp(`{(${variable})}`, 'g');
      formattedText = formattedText.replace(
        regex,
        `<span style="color: #783EFD; font-weight: 600;">$1</span>`
      );
    });
    return { __html: formattedText };
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
              Ligação personalizada
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <section className="my-6">
            <div className="flex flex-col  gap-2">
              <Paragraph>Variáveis disponíveis: </Paragraph>
              <div className="flex items-center gap-2">
                {variables.map((item) => (
                  <div className="flex gap-2 items-center rounded-full bg-primary p-2">
                    <Paragraph className="!text-xs !text-white font-bold">
                      {item}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <div className="w-full">
                <TextArea
                  label="Mensagem da ligação"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Olá, {name}. Seja bem-vindo a nossa..."
                />
              </div>
              <div
                className="p-3 mt-8 border rounded min-h-[100px] w-full text-sm"
                dangerouslySetInnerHTML={formatText()}
              />
            </div>
          </section>
          <section className="flex justify-end mt-4">
            <Button
              type="button"
              className="text-xs font-normal !w-[144px] "
              rightIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Salvar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
