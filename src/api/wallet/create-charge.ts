import api from "@/services/axios";

interface ICreateChargeProps {
  value: number,
  billingType: "CREDIT_CARD"
}

interface ICreateChargeResponse {
  message: string,
  charge: string
}

export const createCharge = async (data: ICreateChargeProps) => {
  const response = await api.post(`/transactions/create-charge`, data);
  return response.data as ICreateChargeResponse;
}