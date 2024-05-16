import { CreateMemberTemplate } from "@/pageTemplates/MembersTemplate/CreateMemberTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const CreateMember = () => <CreateMemberTemplate />;

export default CreateMember;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
