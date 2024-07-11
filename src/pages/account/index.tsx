import { AccountTemplate } from "@/pageTemplates/AccountTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Account = () => <AccountTemplate />;

export default Account;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
