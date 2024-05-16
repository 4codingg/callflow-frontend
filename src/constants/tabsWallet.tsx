import { IPaymentMethod } from "@/@types/PaymentMethod";

export enum ETabsWallet {
  Plan = "Plano",
  PaymentMethods = "Métodos de pagamentos",
  PaymentHistory = "Histórico de pagamentos",
}

export const TABS_WALLET = [
  ETabsWallet.PaymentMethods,
  ETabsWallet.Plan,
  ETabsWallet.PaymentHistory,
];

export const MOCK_PAYMENTS_METHODS: IPaymentMethod[] = [
  {
    id: "1",
    expiry: "03 / 2028",
    last4: "3333",
    brand: "mastercard",
    nickname: "Amarelinho",
    address: "Avenida Paulista 127",
    default: false,
  },
  {
    id: "2",
    expiry: "09 / 2028",
    last4: "1211",
    brand: "visa",
    nickname: "Visa Débito",
    address: "Avenida Paulista 127",
    default: false,
  },
  {
    id: "3",
    expiry: "03 / 2028",
    last4: "9812",
    brand: "visa",
    nickname: "Visa Crédito",
    address: "Rua Pereira Coutinho Filho 12",
    default: false,
  },
  {
    id: "4",
    expiry: "11 / 2025",
    last4: "4512",
    brand: "elo",
    nickname: "Elo Plus",
    address: "Avenida Paulista 127",
    default: true,
  },
];

export const MOCK_PAYMENTS_HISTORY = [
  {
    id: 1,
    date: "03/01/2024 14:32",
    last4: 3333,
    brand: "mastercard",
    type: "plan",
    list: null,
    price: 23.9,
  },
  {
    id: 2,
    date: "09/01/2024 14:32",
    last4: 3333,
    brand: "mastercard",
    type: "plan",
    list: null,
    price: 23.9,
  },
  {
    id: 3,
    date: "03/01/2024 14:32",
    last4: null,
    brand: null,
    type: "sms-mass",
    list: "CCFX",
    price: 31.95,
  },
  {
    id: 3,
    date: "11/01/2024 14:32",
    last4: null,
    brand: null,
    type: "email-mass",
    list: "Amplifi List",
    price: 3.95,
  },
];

export const MOCK_ADD_BALANCE = [1, 5, 10, 20, 50];
