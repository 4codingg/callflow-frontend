import api from "@/services/axios"

interface Contact {
  data: any,
  id: string
}

export interface GetContactsListDetailResponse {
  id: string,
  companyId: string,
  createdAt: string,
  updatedAt: string,
  contacts: Contact[],
  variables: string[],
  name: string
}

export async function fetchAllContactsLists() {
  const response = await api.get('/contacts-lists')
  return response.data as GetContactsListDetailResponse[];
}