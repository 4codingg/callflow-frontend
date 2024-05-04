import { MassCommunicationTemplate } from "@/components/layouts/MassCommunicationTemplate";
import { EMassCommunication } from "@/constants/massCommunication";

export const EmailsTemplate = () => {
  return <MassCommunicationTemplate type={EMassCommunication.Email} />;
};
