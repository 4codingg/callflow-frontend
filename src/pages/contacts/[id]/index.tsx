import { ContactsListDetailsTemplate } from "@/pageTemplates/ContactsListTemplate/ContactsListDetailsTemplate/index";
import { canSSRAuth } from "@/utils/canSSRAuth";

const ContactsListDetails = () => <ContactsListDetailsTemplate />;

export default ContactsListDetails;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
