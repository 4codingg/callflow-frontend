import api from "@/services/axios"

export interface GetContactsListDetailProps {
  contactsListId: string
}

interface Contact {
  data: any,
  id: string
}

export interface GetContactsListDetailResponse {
  id: string,
  companyId?: string,
  createdAt?: string,
  updatedAt?: string,
  contacts: Contact[],
  variables: string[],
  name?: string,
  phoneDestinationVariable: string,
  emailDestinationVariable
}

export async function getContactsListDetail({
  contactsListId
}: GetContactsListDetailProps) {
  const response = await api.get('/contacts-list/' + contactsListId)
  return response.data as GetContactsListDetailResponse;
}