import { SignupTemplate } from "@/pageTemplates/SignupTemplate/index";
import { canSSRGuest } from "@/utils/canSSRGuest";

const Signup = () => <SignupTemplate />;

export default Signup;

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
