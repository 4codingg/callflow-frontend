import { ISubscription } from "@/@types/Subscription";
import api from "@/services/axios";

export async function fetchSubscriptions() {
  const response = await api.get(`/subscriptions`);
  return response.data as ISubscription[];
}
