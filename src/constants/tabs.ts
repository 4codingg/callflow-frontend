
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

export enum ETabsAccount {
  PersonalAccount = "Conta pessoal",
  CompanyAccount = "Conta da empresa"
}

export const TABS_ACCOUNT = [
  ETabsAccount.PersonalAccount,
  ETabsAccount.CompanyAccount,
];

export enum TABS_PAYMENT_TAB {
  MethodPayment = 1,
  Payment = 2,
}

export enum METHOD_PAYMENTS {
  Pix = 'pix',
  Ticket = 'ticket',
  CreditCard = 'credit-card',
}
