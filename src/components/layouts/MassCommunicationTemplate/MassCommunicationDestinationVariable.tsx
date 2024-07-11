import { Label } from "@/components/Label";
import { Paragraph } from "@/components/Paragraph";

export const MassCommunicationDestinationVariable = ({ destination }) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label className="font-semibold text-sm">Variável de Destino</Label>
      <div className="bg-default-grey bg-opacity-30 rounded-sm flex items-center justify-between h-[40px] p-3 w-full">
        <Paragraph className="text-opacity-70">{destination}</Paragraph>
      </div>
    </div>
  );
};
