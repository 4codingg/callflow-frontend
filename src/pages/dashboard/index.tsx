import { DashboardTemplate } from "@/pageTemplates/DashboardTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Dashboard = () => <DashboardTemplate />;

export default Dashboard;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
