interface CreditCard {
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
}

interface Fine {
  value: number;
  type: string;
}

interface Interest {
  value: number;
  type: string;
}

export interface ISubscription {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  price: number;
  nextDueDate: string;
  cycle: string;
  description: string | null;
  billingType: string;
  deleted: boolean;
  status: string;
  externalReference: string | null;
  creditCard: CreditCard;
  sendPaymentByPostalService: boolean;
  fine: Fine;
  interest: Interest;
  split: any;
  value: IPlanSubscriptionValue;
}

export enum IPlanSubscriptionValue {
  Free = "free",
  Plus = "plus",
  Premium = "premium",
}
