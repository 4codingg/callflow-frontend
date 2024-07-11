import api from "@/services/axios"

export interface DeleteContactsListProps {
  contactsListId: string
}

export async function deleteContactsList({
  contactsListId
}: DeleteContactsListProps) {
  const response = await api.delete('/contacts-list/' + contactsListId)
  return response.data;
}