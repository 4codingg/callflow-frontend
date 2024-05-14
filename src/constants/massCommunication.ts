import { sendCallMass } from "@/api/call/send-call-mass";
import { sendEmailMass } from "@/api/email/send-email-mass";
import { sendSMSMass } from "@/api/sms/send-sms-mass";

export enum EMassCommunication {
  SMS = "sms",
  Call = "call",
  Email = "email",
}

export interface IMassCommunicationTemplateProps {
  type: EMassCommunication;
}

export const LABELS_MASS_COMMUNICATION = {
  sms: {
    header: {
      title: "Enviar SMS em massa",
      description:
        "Selecione a lista de contatos, a mensagem a ser enviada e dispare sua lista em massa.",
    },
    success: {
      sent: "SMSs em massa enviados com sucesso!",
    },
  },
  call: {
    header: {
      title: "Enviar Ligações em massa",
      description:
        "Selecione a lista de contatos, a mensagem a ser enviada e dispare sua lista em massa.",
    },
    success: {
      sent: "Ligações em massa enviadas com sucesso!",
    },
  },
  email: {
    header: {
      title: "Enviar E-mails em massa",
      description:
        "Selecione a lista de contatos, a mensagem a ser enviada e dispare sua lista em massa.",
    },
    success: {
      sent: "E-mails em massa enviados com sucesso!",
    },
  },
};

export const FUNCTION_MASS_COMMUNICATION = {
  sms: sendSMSMass,
  call: sendCallMass,
  email: sendEmailMass,
};

export const MOCK_COST_REPORT = {
  contacts: {
    length: 50,
    costByMessage: 1.00,
    totalCost: 50
  },
  bonus: {
    length: 20,
    costByMessage: 1.00,
    totalCost: 20
  },
  total: 30.00
};
