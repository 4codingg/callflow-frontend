import api from "@/services/axios"

export interface SendEmailMassBody {
  message: string,
  destinationVariable: string,
  contactsListId: string,
  subject: string
}

export async function sendEmailMass({
  message,
  destinationVariable,
  contactsListId,
  subject
}: SendEmailMassBody) {
  const response = await api.post('/send-email-mass', {
    message,
    destinationVariable,
    contactsListId,
    subject
  })
  return response.data;
}