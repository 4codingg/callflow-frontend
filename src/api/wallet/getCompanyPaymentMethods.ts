import { creditCardMethods } from "@/@types/MethodPayment";
import api from "@/services/axios";

export async function getPaymentMethods() {
  const response = await api.get(`/transactions/get-company-payment-methods`);
  return response.data as creditCardMethods[];
}
