import { MetricsTemplate } from "@/pageTemplates/MetricsTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Metrics = () => <MetricsTemplate />;

export default Metrics;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
