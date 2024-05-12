export interface creditCardMethods {
  last4: string;
  name: string;
  brand: string;
  billingAddress: string;
  cardExpiration: string;
  id: string | number;
}

// export interface creditCardMethods {
//   id: string;
//   nickname: string;
//   cardNameholder: string;
//   last4: string;
//   expiry: string;
//   default: boolean;
//   address: string;
//   brand: string;
//   zipcode: string;
//   token: string;
//   createdAt: Date | null;
//   updatedAt: Date | null;
// }

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
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    address: string;
    phone: string;
  };
}
