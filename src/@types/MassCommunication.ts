interface BonusData {
  length: number;
  costByMessage: number;
  totalCost: number;
}

interface ContactData {
  length: number;
  costByMessage: number;
  totalCost: number;
}

export interface ICostReports {
  bonus: BonusData;
  contacts: ContactData;
  total: number;
}

export interface IMassCommunicationResponse {
  message: string,
  reportId: string
}
