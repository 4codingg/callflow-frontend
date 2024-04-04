import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
// import { IJoditEditorProps } from 'jodit-react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
}) as any;

interface IModalEmailProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

// type IJoditConfigProps = IJoditEditorProps['config'];

const buttons = [
  '\n',
  '|',
  'bold',
  'italic',
  'underline',
  'ul',
  'ol',
  'font',
  'file',
  'image',
  'copy',
  'paste',
  'font-size',
  'font',
  'link',
  'symbols',
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  showCharsCounter: false,
  showWordsCounter: false,
  removeButtons: [''],
  buttons: buttons,
  width: 600,
  height: 500,
};

export const ModalEmail = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalEmailProps) => {
  const variables = ['nome', 'telefone', 'email'];
  const [message, setMessage] = useState('');
  const editor = useRef(null);
  const [content, setContent] = useState('');

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[600px] max-h-[90%]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              E-mail personalizado
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
            <div className="mt-6 flex gap-4 flex-1">
              <JoditEditor
                className="w-full h-full"
                ref={editor}
                value={content}
                config={editorConfig}
                onChange={(value) => setContent(value)}
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
