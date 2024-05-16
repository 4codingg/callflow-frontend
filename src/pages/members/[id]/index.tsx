import { EditMemberTemplate } from "@/pageTemplates/MembersTemplate/EditMemberTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const EditMember = () => <EditMemberTemplate />;

export default EditMember;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
