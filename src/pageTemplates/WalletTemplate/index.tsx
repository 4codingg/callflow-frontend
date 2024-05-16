import {
  EmptyState,
  Heading,
  LayoutWithSidebar,
  Paragraph,
} from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Tabs } from "@/components/Tabs";
import {
  ETabsWallet,
  MOCK_PAYMENTS_HISTORY,
  TABS_WALLET,
} from "@/constants/tabsWallet";
import { MyPlanTab } from "@/components/layouts/MyPlanTab";
import { TablePaymentsHistory } from "@/components/layouts/Tables/TablePaymentsHistory";
import { PaymentMethodsTab } from "@/components/layouts/PaymentMethodsTab";
import "react-credit-cards/es/styles-compiled.css";
import { ModalAddPaymentMethod } from "@/components/layouts/Modals/ModalAddPaymentMethod";
import Empty from "@/assets/empty-state.png";

export const WalletTemplate = () => {
  const [modalAddPaymentMethodIsOpen, setModalAddPaymentMethodIsOpen] =
    useState(false);
  const [tabActive, setTabActive] = useState(TABS_WALLET[0]);

  const router = useRouter();

  return (
    <>
      <LayoutWithSidebar>
        <div className="mt-4">
          <Heading>Carteira</Heading>
          <Paragraph className="text-default-grey">
            Gerencie suas finanças, revise seus métodos de pagamentos e
            acompanhe seus gastos.
          </Paragraph>

          <div className="mt-6"></div>

          <div className="w-3/6 mt-4">
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
            {tabActive === ETabsWallet.PaymentHistory && (
              <div className="mt-4">
                {MOCK_PAYMENTS_HISTORY?.length == 0 ? (
                  <EmptyState
                    description="Ainda não temos hitórico de pagamentos"
                    textButton="Adicionar forma de pagamento"
                    title="Nenhum histórico"
                    icon={Empty}
                  />
                ) : (
                  <>
                    <TablePaymentsHistory history={MOCK_PAYMENTS_HISTORY} />{" "}
                  </>
                )}
              </div>
            )}
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
