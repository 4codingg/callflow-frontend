import { PlansTemplate } from "@/pageTemplates/PlansTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Plans = () => <PlansTemplate />;

export default Plans;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
