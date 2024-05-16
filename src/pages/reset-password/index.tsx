import { ResetPasswordTemplate } from "@/pageTemplates/ResetPasswordTemplate/index";
import { canSSRGuest } from "@/utils/canSSRGuest";

const ResetPassword = () => <ResetPasswordTemplate />;

export default ResetPassword;

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
