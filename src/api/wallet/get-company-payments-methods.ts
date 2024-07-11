import { IPaymentMethod } from "@/@types/PaymentMethod";
import api from "@/services/axios";

export async function getCompanyPaymentMethods() {
  const response = await api.get(`/transactions/get-company-payment-methods`);
  return response.data as IPaymentMethod[];
}
