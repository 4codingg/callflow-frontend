export enum ETabsWallet {
  Plan = 'Plano',
  PaymentMethods = 'Métodos de pagamentos',
  PaymentHistory = 'Histórico de pagamentos',
}

export const TABS_WALLET = [
  ETabsWallet.Plan,
  ETabsWallet.PaymentMethods,
  ETabsWallet.PaymentHistory,
];

export const MOCK_PAYMENTS_METHODS = [
  {
    id: 1,
    cardExpiration: '03 / 2028',
    last4: 3333,
    brand: 'mastercard',
    name: 'Amarelinho',
    billingAddress: 'Avenida Paulista 127',
  },
  {
    id: 2,
    cardExpiration: '09 / 2028',
    last4: 3333,
    brand: 'visa',
    name: 'Visa Débito',
    billingAddress: 'Avenida Paulista 127',
  },
  {
    id: 3,
    cardExpiration: '03 / 2028',
    last4: 3333,
    brand: 'visa',
    name: 'Visa Crédito',
    billingAddress: 'Rua Pereira Coutinho Filho 12',
  },
  {
    id: 3,
    cardExpiration: '11 / 2025',
    last4: 3333,
    brand: 'elo',
    name: 'Elo Plus',
    billingAddress: 'Avenida Paulista 127',
  },
];
