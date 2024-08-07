import { ICreatePaymentMethodBody } from "@/@types/PaymentMethod";
import api from "@/services/axios";

export async function createPaymentMethod(body: ICreatePaymentMethodBody) {
  const response = await api.post(`/transactions/payment-method`, body);
  return response.data as ICreatePaymentMethodBody;
}
