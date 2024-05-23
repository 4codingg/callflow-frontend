import api from "@/services/axios";

export async function deleteCardPaymentMethod(cardPaymentMethodId: string) {
  const response = await api.delete(`/transactions/payment-method`, {
    data: { cardPaymentMethodId },
  });
  return response.data;
}
