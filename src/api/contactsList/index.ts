import { updateContactsList } from '@/api/contactsList/update-contacts-list';
import { getContactsListDetail } from '@/api/contactsList/get-contacts-list-detail';
import { fetchAllContactsLists } from '@/api/contactsList/fetch-all-contacts-lists';
import { deleteContactsList } from '@/api/contactsList/delete-contacts-list';
import { deleteContact } from '@/api/contactsList/delete-contact-item';
import { createContactsList } from '@/api/contactsList/create-contacts-list';

export {
  createContactsList,
  deleteContact,
  deleteContactsList,
  fetchAllContactsLists,
  getContactsListDetail,
  updateContactsList
}