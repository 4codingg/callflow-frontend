import api from "@/services/axios";

export interface UpdateContactsListBody {
  name?: string;
  contacts?: any;
  contactsListId: string;
  phoneDestinationVariable?: string;
  emailDestinationVariable?: string;
}

export async function updateContactsList({
  name,
  contacts,
  contactsListId,
  phoneDestinationVariable,
  emailDestinationVariable,
}: UpdateContactsListBody) {
  const response = await api.put("/contacts-list/" + contactsListId, {
    name,
    phoneDestinationVariable,
    emailDestinationVariable,
    contacts,
  });
  return response.data;
}
