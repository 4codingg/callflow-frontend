import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { CheckCircle, X, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { TextArea } from '@/components/TextArea';

interface IModalMessageProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  variables: string[];
  exampleItem: any;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export const ModalMessage = ({
  setModalIsOpen,
  modalIsOpen,
  variables,
  exampleItem,
  message,
  setMessage,
}: IModalMessageProps) => {
  const formatText = () => {
    let formattedText = message;
    variables.forEach((variable) => {
      variable = variable.trim();
      const regex = new RegExp(`{${variable}}`, 'g');

      formattedText = formattedText.replace(
        regex,
        `<span style="color: #783EFD; font-weight: 600;">${exampleItem[variable]}</span>`
      );
    });
    return { __html: formattedText };
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[600px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Mensagem personalizada
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
                  <div
                    key={item}
                    className="flex gap-2 items-center rounded-full bg-primary p-2"
                  >
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
                  label="Mensagem"
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
          <section className="flex justify-end mt-4 gap-4">
            <Button
              leftIcon={<X size={16} />}
              type="button"
              className="!bg-grey-secundary !text-purple-secundary !w-[190px] text-xs font-normal"
              onClick={() => {
                setModalIsOpen(false);
                setMessage('');
              }}
            >
              Descartar Alterações
            </Button>
            <Button
              type="button"
              className="text-xs font-normal !w-[144px] "
              rightIcon={<CheckCircle color="#FFF" size={16} />}
              onClick={() => setModalIsOpen(false)}
            >
              Salvar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
