import { Label, Paragraph } from "@/components";
import { CheckCircle } from "phosphor-react";

export const MassCommunicationInputMessage = ({
  message,
  setModalMessageIsOpen,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="font-semibold text-sm">Mensagem</Label>
      <button
        className="rounded flex items-center justify-between h-[40px] border p-3 w-full"
        onClick={() => setModalMessageIsOpen(true)}
        type="button"
      >
        <Paragraph className="text-primary text-ellipsis truncate overflow-hidden">
          {message ? message : "Personalize sua mensagem"}
        </Paragraph>
        <div className="min-w-[16px]">
          {message && <CheckCircle color="#00DEA3" />}
        </div>
      </button>
    </div>
  );
};
