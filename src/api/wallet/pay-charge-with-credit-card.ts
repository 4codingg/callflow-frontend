import api from "@/services/axios";

interface IPayChargeWithCreditCardProps {
  chargeId: string
}

interface IPayChargeWithCreditCardResponse {
  message: string
}

export const payChargeWithCreditCard = async (data: IPayChargeWithCreditCardProps) => {
  const response = await api.post(`/transactions/pay-charge-with-credit-card`, data);
  return response.data as IPayChargeWithCreditCardResponse;
}