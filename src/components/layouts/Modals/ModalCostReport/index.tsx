import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { ArrowRight, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalModalCostReportProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}
interface MockProps {
  id: number;
  contatos: number;
  costByMessage: number | string;
  total: number;
}
export const CostReports = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalModalCostReportProps) => {
  const MOCK_COST_REPORT = [
    {
      id: 1,
      type: "contacts",
      contato: 50,
      costByMessage: "R$ 1 / mensagem",
      total: 50,
    },
    {
      id: 2,
      type: "bonus",
      contato: 20,
      costByMessage: "bonus",
      total: -20,
    },
  ];

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
          {MOCK_COST_REPORT.map((item) => (
            <section
              key={item.id}
              className="w-full h-16 bg-primary opacity-50 flex justify-between items-center m-auto text-white border-b-2 px-20"
            >
              <div>{item.contato}</div>
              <div>{item.costByMessage}</div>
              <div>{item.total}</div>
            </section>
          ))}
          <section className="w-full h-16 bg-primary opacity-50 flex justify-between items-center m-auto text-white border-b-2 px-20">
            <div>Total</div>
            <div> 30</div>
          </section>

          <section className="flex justify-end mt-8 ">
            <Button type="button" className="text-xs font-normal !w-20 !h-12  ">
              OK <ArrowRight size={18} />
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
