import api from "@/services/axios"

export interface CreateScheduleBody {
  message: string,
  destinationVariable: string,
  contactsListId: string,
  subject?: string,
  type: "sms" | "email" | "call",
  reproduceAt: string
}

export async function sendScherduleMass({
  message,
  destinationVariable,
  contactsListId,
  subject, 
  type, 
  reproduceAt
}: CreateScheduleBody) {
  const response = await api.post('/schedule', {
    message,
    destinationVariable,
    contactsListId,
    subject,
    type,
    reproduceAt
   
  })
  return response.data;
}