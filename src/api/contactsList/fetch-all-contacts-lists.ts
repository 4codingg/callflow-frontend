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

interface IFetchAllContactsListProps {
  fetchNameOnly?: boolean
}

export async function fetchAllContactsLists(data?: IFetchAllContactsListProps) {
  const response = await api.get('/contacts-lists', {
    params: data
  })
  return response.data as GetContactsListDetailResponse[];
}