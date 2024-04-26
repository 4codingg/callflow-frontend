import { MassCommunicationTemplate } from "@/components/layouts/MassCommunicationTemplate";
import { EMassCommunication } from "@/constants/massCommunication";

export const MessagesTemplate = () => {
  return (
    <MassCommunicationTemplate
      type={EMassCommunication.SMS}
      modalStepbyStepTitle="Siga as instruções para enviar mensagens em massa."
    />
  );
};
