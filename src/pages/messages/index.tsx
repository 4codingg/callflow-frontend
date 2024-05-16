import { MessagesTemplate } from "@/pageTemplates/MessagesTemplate";
import { canSSRAuth } from "@/utils/canSSRAuth";

const Messages = () => <MessagesTemplate />;

export default Messages;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
