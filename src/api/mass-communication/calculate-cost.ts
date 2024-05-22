import api from "@/services/axios"

export interface CalculateCostMassCommunicationBody {
  type: "sms" | "email" | "call",
  contactsListLength: number
}

export async function calculateCostMassCommunication(data: CalculateCostMassCommunicationBody) {
  const response = await api.post('/calculate-cost', data)
  return response.data;
}