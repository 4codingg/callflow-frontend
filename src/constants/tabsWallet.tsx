export enum ETabsWallet {
  Plan = 'Plano',
  PaymentMethods = 'Métodos de pagamentos',
  PaymentHistory = 'Histórico de pagamentos',
}

export const TABS_WALLET = [
  ETabsWallet.PaymentMethods,
  ETabsWallet.Plan,
  ETabsWallet.PaymentHistory,
];

export const MOCK_PAYMENTS_METHODS = [
  {
    id: 1,
    cardExpiration: '03 / 2028',
    last4: '3333',
    brand: 'mastercard',
    name: 'Amarelinho',
    billingAddress: 'Avenida Paulista 127',
  },
  {
    id: 2,
    cardExpiration: '09 / 2028',
    last4: '1211',
    brand: 'visa',
    name: 'Visa Débito',
    billingAddress: 'Avenida Paulista 127',
  },
  {
    id: 3,
    cardExpiration: '03 / 2028',
    last4: '9812',
    brand: 'visa',
    name: 'Visa Crédito',
    billingAddress: 'Rua Pereira Coutinho Filho 12',
  },
  {
    id: 4,
    cardExpiration: '11 / 2025',
    last4: '4512',
    brand: 'elo',
    name: 'Elo Plus',
    billingAddress: 'Avenida Paulista 127',
  },
];

export const MOCK_PAYMENTS_HISTORY = [
  {
    id: 1,
    date: '03/01/2024 14:32',
    last4: 3333,
    brand: 'mastercard',
    type: 'plan',
    list: null,
    price: 23.9,
  },
  {
    id: 2,
    date: '09/01/2024 14:32',
    last4: 3333,
    brand: 'mastercard',
    type: 'plan',
    list: null,
    price: 23.9,
  },
  {
    id: 3,
    date: '03/01/2024 14:32',
    last4: null,
    brand: null,
    type: 'sms-mass',
    list: 'CCFX',
    price: 31.95,
  },
  {
    id: 3,
    date: '11/01/2024 14:32',
    last4: null,
    brand: null,
    type: 'email-mass',
    list: 'Amplifi List',
    price: 3.95,
  },
];
