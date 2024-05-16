import { WalletTemplate } from "@/pageTemplates/WalletTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Wallet = () => <WalletTemplate />;

export default Wallet;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
