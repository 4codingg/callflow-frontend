import { ICostReports } from "@/@types/MassCommunication";
import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { MOCK_COST_REPORT } from "@/constants/massCommunication";
import { ArrowRight, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalModalCostReportProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  costReports: ICostReports
}

export const ModalCostReports = ({
  setModalIsOpen,
  modalIsOpen,
  costReports
}: IModalModalCostReportProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[700px]">
        <div className="bg-white py-4">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Checar relatório de custo
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4 mb-8" />
          <section className="w-full h-16 bg-primary flex justify-between items-center text-white border-b border-white px-8">
            <Paragraph className="text-white font-semibold">
              {costReports?.contacts?.length} contatos
            </Paragraph>
            <Paragraph className="text-white font-semibold w-[200px]">
              R$ {costReports?.contacts?.costByMessage} / mensagem
            </Paragraph>
            <Paragraph className="text-white font-semibold">
              R$ {costReports?.contacts?.totalCost}
            </Paragraph>
          </section>
          <section className="w-full h-16 bg-primary flex justify-between items-center text-white border-b border-white px-8">
            <Paragraph className="text-white font-semibold">
              {costReports?.bonus?.length} contatos
            </Paragraph>
            <Paragraph className="text-white font-semibold w-[200px]">
              Bônus
            </Paragraph>
            <Paragraph className="text-white font-semibold">
              R$ {costReports?.bonus?.totalCost}
            </Paragraph>
          </section>
          <section className="w-full h-16 bg-primary flex justify-between items-center text-white px-8">
            <Paragraph className="text-white font-semibold">
              Custo total
            </Paragraph>
            <Paragraph className="text-white font-semibold">
              R$ {costReports?.total}
            </Paragraph>
          </section>

          <section className="flex justify-end mt-8 ">
            <Button
              type="button"
              className="text-xs font-normal !w-20 !h-12  "
              onClick={() => setModalIsOpen(false)}
            >
              OK <ArrowRight size={18} />
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
