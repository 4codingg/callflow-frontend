import { Label } from "@/components/Label";
import { Paragraph } from "@/components/Paragraph";
import { ArrowRight } from "phosphor-react";

export const MassCommunicationCost = ({
  costReports,
  setModalCostReportIsOpen,
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label className="font-semibold text-sm">Custo</Label>
      <div className="flex items-center gap-4">
        <div className="bg-default-grey bg-opacity-30 rounded flex items-center justify-between gap-4 h-[40px] p-3 w-full">
          <Paragraph className="text-primary">
            R$ {costReports?.total}
          </Paragraph>
          <Paragraph className="text-black text-xs text-opacity-70">
            (R${costReports?.contacts?.costByMessage || "0,00"} / contato)
          </Paragraph>
        </div>
      </div>
      <button
        className="flex items-center gap-4"
        onClick={() => setModalCostReportIsOpen(true)}
      >
        <Paragraph className="text-primary">
          Checar relatório de custo
        </Paragraph>
        <ArrowRight color="#783EFD" weight="bold" />
      </button>
    </div>
  );
};
