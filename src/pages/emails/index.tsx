import { EmailsTemplate } from "@/pageTemplates/EmailsTemplates";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Emails = () => <EmailsTemplate />;

export default Emails;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
