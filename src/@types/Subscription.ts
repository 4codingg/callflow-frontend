export interface ISubscription {
  name: "Free" | "Plus" | "Premium",
  value: IPlanSubscriptionValue
}

export enum IPlanSubscriptionValue {
  Free = 'free',
  Plus = 'plus',
  Premium = 'premium',
}