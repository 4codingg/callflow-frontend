import { LoginTemplate } from "@/pageTemplates/LoginTemplate";
import { canSSRGuest } from "@/utils/canSSRGuest";

const Login = () => <LoginTemplate />;

export default Login;

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
