import {
  Button,
  Card,
  Heading,
  Input,
  LayoutWithSidebar,
  Line,
  Paragraph,
  Tabs,
} from "@/components";
import { ETabsAccount, ETabsWallet, TABS_ACCOUNT } from "@/constants/tabs";
import { useState } from "react";
import { CompanyAccount } from "./CompanyAccount";
import { PersonalAccount } from "./PersonalAccount";

export const AccountTemplate = () => {
  const [tabActive, setTabActive] = useState(TABS_ACCOUNT[0]);

  return (
    <LayoutWithSidebar>
      <div className="mt-4">
        <Heading>Conta</Heading>
        <Paragraph className="text-default-grey">
          Gerencie sua conta, notificações e configurações do sistema.
        </Paragraph>
      </div>
      <div className="w-3/4 mt-4">
        <Tabs
          options={TABS_ACCOUNT}
          optionActive={tabActive}
          onClick={(tab) => setTabActive(tab)}
        />
      </div>
      {tabActive === ETabsAccount.PersonalAccount && <PersonalAccount />}
      {tabActive === ETabsAccount.CompanyAccount && <CompanyAccount />}
    </LayoutWithSidebar>
  );
};
