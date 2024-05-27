import { Heading, LayoutWithSidebar, Paragraph } from "@/components";
import { useState } from "react";
import { Tabs } from "@/components/Tabs";
import { MyPlanTab } from "@/components/layouts/MyPlanTab";
import { PaymentMethodsTab } from "@/components/layouts/PaymentMethodsTab";
import { ModalAddPaymentMethod } from "@/components/layouts/Modals/ModalAddPaymentMethod";
import { ETabsWallet, TABS_WALLET } from "@/constants/tabs";
import { PaymentsHistoryTab } from "@/components/layouts/PaymentsHistoryTab";
import "react-credit-cards/es/styles-compiled.css";

export const WalletTemplate = () => {
  const [modalAddPaymentMethodIsOpen, setModalAddPaymentMethodIsOpen] =
    useState(false);
  const [tabActive, setTabActive] = useState(TABS_WALLET[0]);

  return (
    <>
      <LayoutWithSidebar>
        <div className="mt-4">
          <Heading>Carteira</Heading>
          <Paragraph className="text-default-grey">
            Gerencie suas finanças, revise seus métodos de pagamentos e
            acompanhe seus gastos.
          </Paragraph>

          <div className="w-3/4 mt-4">
            <Tabs
              options={TABS_WALLET}
              optionActive={tabActive}
              onClick={(tab) => setTabActive(tab)}
            />
          </div>
          <div>
            {tabActive === ETabsWallet.PaymentMethods && (
              <PaymentMethodsTab
                setModalAddPaymentMethodIsOpen={setModalAddPaymentMethodIsOpen}
              />
            )}
            {tabActive === ETabsWallet.Plan && <MyPlanTab />}
            {tabActive === ETabsWallet.PaymentHistory && <PaymentsHistoryTab />}
          </div>
        </div>
      </LayoutWithSidebar>
      <ModalAddPaymentMethod
        modalIsOpen={modalAddPaymentMethodIsOpen}
        setModalIsOpen={setModalAddPaymentMethodIsOpen}
      />
    </>
  );
};
