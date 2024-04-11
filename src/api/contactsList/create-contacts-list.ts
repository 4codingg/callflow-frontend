import api from "@/services/axios"

export interface CreateContactsListBody {
  name: string
  variables: string[]
}

export async function createContactsList({
  name, variables
}: CreateContactsListBody) {
  const response = await api.post('/contacts-list', { name, variables })
  return response.data;
}