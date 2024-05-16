import { AddFundsTemplate } from "@/pageTemplates/WalletTemplate/AddFundsTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const AddFunds = () => <AddFundsTemplate />;

export default AddFunds;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
