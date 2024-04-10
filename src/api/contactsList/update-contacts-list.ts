import api from "@/services/axios"

export interface UpdateContactsListBody {
  name?: string
  contacts?: any,
  contactsListId: string
}

export async function updateContactsList({
  name, contacts, contactsListId
}: UpdateContactsListBody) {
  const response = await api.put('/contacts-list/' + contactsListId, { name, contacts })
  return response.data;
}