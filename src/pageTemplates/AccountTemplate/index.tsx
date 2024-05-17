import { Heading, LayoutWithSidebar, Paragraph } from "@/components";

export const AccountTemplate = () => {
  return (
    <LayoutWithSidebar>
      <div className="mt-4">
        <Heading>Conta</Heading>
        <Paragraph className="text-default-grey">
          Gerencie suas conta, notificações e configurações do sistema.
        </Paragraph>
      </div>
    </LayoutWithSidebar>
  );
};
