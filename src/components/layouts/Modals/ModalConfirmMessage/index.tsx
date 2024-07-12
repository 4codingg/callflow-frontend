import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { ArrowRight, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/Label';
import { GetContactsListDetailResponse } from '@/api/contactsList/get-contacts-list-detail';
import { ICostReports } from '@/@types/MassCommunication';
import paperPlaneAnimation from '@/assets/animations/paper-plane-animation.json';
import LottieWrapper from '@/components/LottieWrapper';
interface IModalConfirmMessageProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  contactsListDetail: GetContactsListDetailResponse;
  message: string;
  destinationVariable: string;
  handleSendMassCommunication: () => Promise<void>;
  isLoading: boolean;
  costReports: ICostReports;
}

export const ModalConfirmMessage = ({
  setModalIsOpen,
  modalIsOpen,
  contactsListDetail,
  handleSendMassCommunication,
  message,
  destinationVariable,
  isLoading,
  costReports,
}: IModalConfirmMessageProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[700px]">
        <div className="bg-white py-4">
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
          <form className="mt-6 flex flex-col gap-6 min-w-[600px] max-h-[80vh] ">
            <div className="flex flex-col w-full gap-3">
              <Label className="font-semibold text-sm">Lista de Contatos</Label>
              <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                <Paragraph className="text-opacity-70">
                  {contactsListDetail?.name}
                </Paragraph>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Label className="font-semibold text-sm">
                Variável de Destino
              </Label>
              <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                <Paragraph className="text-opacity-70">
                  {destinationVariable}
                </Paragraph>
              </div>
            </div>
            <section className="flex gap-[16px]">
              <div className="flex flex-col w-full gap-3">
                <Label className="font-semibold text-sm">Contatos</Label>
                <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                  <Paragraph className="text-opacity-70">
                    {contactsListDetail?.contacts?.length || 0} contatos na
                    lista
                  </Paragraph>
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <Label className="font-semibold text-sm">Custo</Label>
                <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
                  <Paragraph className="text-primary">
                    R$ {costReports?.total}
                  </Paragraph>
                  <Paragraph className="text-black text-xs text-opacity-70">
                    R$
                    {(
                      costReports?.total / contactsListDetail?.contacts?.length
                    ).toFixed(2)}
                    / contato
                  </Paragraph>
                </div>
              </div>
            </section>{' '}
            <div className="flex flex-col gap-3">
              <Label className="font-semibold text-sm">Mensagem</Label>
              <div className="p-3 border rounded min-h-[100px] w-full text-sm">
                <Paragraph>{message}</Paragraph>
              </div>
            </div>
            {isLoading ? (
              <div className=" flex justify-center items-start">
                <LottieWrapper
                  animationData={paperPlaneAnimation}
                  loop={true}
                  style={{ width: 200, height: 200 }}
                />
              </div>
            ) : (
              <section className="flex justify-end mt-[17px]">
                <Button
                  type="button"
                  className="text-xs font-normal !w-[197px] h-[48px] "
                  onClick={handleSendMassCommunication}
                >
                  Confirmar e Enviar <ArrowRight size={18} />
                </Button>
              </section>
            )}
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
