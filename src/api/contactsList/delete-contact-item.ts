import api from "@/services/axios"

export interface DeleteContactProps {
  contactId: string
}

export async function deleteContact({
  contactId
}: DeleteContactProps) {
  const response = await api.delete('/contact/' + contactId)
  return response.data;
}