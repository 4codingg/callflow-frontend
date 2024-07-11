import { ContactsListTemplate } from "@/pageTemplates/ContactsListTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const ContactsList = () => <ContactsListTemplate />;

export default ContactsList;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
