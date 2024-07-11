export interface IPaymentMethod {
  last4: string;
  brand: string;
  address: string;
  expiry: string;
  nickname: string;
  id: string;
  default: boolean;
}

export interface ICreatePaymentMethodBody {
  nickname: string;
  remoteIp: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    email: string;
    phone?: string;
  };
}

export interface IPaymentHistory {
  id: string;
  companyId: string;
  cost: number;
  paymentMethod: string | null;
  type: string;
  createdAt: string;
  updatedAt: string;
  contactsListId: string;
  creditCardMethodId: string | null;
}
