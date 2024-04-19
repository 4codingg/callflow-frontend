import api from "@/services/axios"

export interface SendCallMassBody {
  message: string,
  destinationVariable: string,
  contactsListId: string
}

export async function sendCallMass({
  message,
  destinationVariable,
  contactsListId
}: SendCallMassBody) {
  const response = await api.post('/send-call-mass', {
    message,
    destinationVariable,
    contactsListId
  })
  return response.data;
}