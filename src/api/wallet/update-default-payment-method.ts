import api from "@/services/axios";

interface IUpdateDefaultPaymentMethod {
  paymentMethodId: string
}

export async function updateDefaultPaymentMethod(body: IUpdateDefaultPaymentMethod) {
  const response = await api.post(`/transactions/default-payment-method`, body);
  return response.data;
}
