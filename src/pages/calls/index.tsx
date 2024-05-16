import { CallsTemplate } from "@/pageTemplates/CallsTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Calls = () => <CallsTemplate />;

export default Calls;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
