import api from "@/services/axios"

export interface CreateContactsListBody {
  message: string,
  destinationVariable: string,
  contactsListId: string
}

export async function sendSMSMass({
  message,
  destinationVariable,
  contactsListId
}: CreateContactsListBody) {
  const response = await api.post('/send-sms-mass', {
    message,
    destinationVariable,
    contactsListId
  })
  return response.data;
}