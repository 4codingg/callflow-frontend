import { MassCommunicationTemplate } from "@/components/layouts/MassCommunicationTemplate";
import { EMassCommunication } from "@/constants/massCommunication";

export const CallsTemplate = () => {
  return <MassCommunicationTemplate type={EMassCommunication.Call} />;
};
