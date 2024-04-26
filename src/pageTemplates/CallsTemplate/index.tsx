import { MassCommunicationTemplate } from "@/components/layouts/MassCommunicationTemplate";
import { EMassCommunication } from "@/constants/massCommunication";

export const CallsTemplate = () => {
  return (
    <MassCommunicationTemplate
      type={EMassCommunication.Call}
      modalStepbyStepTitle="Siga as instruções para enviar ligações em massa"
    />
  );
};
