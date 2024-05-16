export interface ISubscription {
  id: string
  name: "Free" | "Plus" | "Premium",
  value: IPlanSubscriptionValue
}

export enum IPlanSubscriptionValue {
  Free = 'free',
  Plus = 'plus',
  Premium = 'premium',
}