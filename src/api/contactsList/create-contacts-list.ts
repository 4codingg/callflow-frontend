import api from "@/services/axios"

export interface CreateContactsListBody {
  name: string,
  variables: string[],
  emailDestinationVariable: string,
  phoneDestinationVariable: string,
}

export async function createContactsList(data: CreateContactsListBody) {
  const response = await api.post('/contacts-list', data)
  return response.data;
}