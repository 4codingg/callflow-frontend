import { IMassCommunicationResponse } from "@/@types/MassCommunication";
import api from "@/services/axios"

export interface ScheduleCommunicationBody {
  message: string,
  destinationVariable: string,
  contactsListId: string,
  subject?: string,
  type: "sms" | "email" | "call",
  reproduceAt: string
}

export async function scheduleMassCommunication({
  message,
  destinationVariable,
  contactsListId,
  subject,
  type,
  reproduceAt
}: ScheduleCommunicationBody) {
  const response = await api.post('/schedule', {
    message,
    destinationVariable,
    contactsListId,
    subject,
    type,
    reproduceAt
  })
  return response.data as IMassCommunicationResponse;
}