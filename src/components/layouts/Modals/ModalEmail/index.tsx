import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { CheckCircle, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/components/Input";

interface IModalEmailProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  variables: string[];
  exampleItem?: any;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setSubject: Dispatch<SetStateAction<string>>;
}

export const ModalEmail = ({
  setModalIsOpen,
  modalIsOpen,
  variables,
  message,
  setMessage,
  setSubject,
}: IModalEmailProps) => {
  const editorRef = useRef(null);

  return (
    <Modal.Root
      trapFocus={false}
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
    >
      <Modal.Content className="min-w-[600px]">
        <div className="bg-white py-4 ">
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
            <div className="flex flex-col gap-2 mb-4">
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
            <Input
              label="Título do E-mail"
              onChange={(e) => setSubject(e.target.value)}
            />
            <Editor
              apiKey="w56ccsq6o6q0fwmb6kj5a5b01cwsb2uqa0vvjcgendqerk4h"
              onInit={(_, editor) => {
                editorRef.current = editor;
              }}
              onEditorChange={(e) => setMessage(e)}
              value={message}
              initialValue="<p>Sua mensagem aqui.</p>"
            />
          </section>
          <section className="flex justify-end mt-4 gap-4">
            <Button
              leftIcon={<X size={16} />}
              type="button"
              className="!bg-grey-secundary !text-purple-secundary !w-[190px] text-xs font-normal"
              onClick={() => {
                setModalIsOpen(false);
                setMessage("");
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
