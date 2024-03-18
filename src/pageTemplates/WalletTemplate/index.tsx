import { Heading, LayoutWithSidebar } from '@/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import { Tabs } from '@/components/Tabs';
import {
  ETabsWallet,
  MOCK_PAYMENTS_HISTORY,
  MOCK_PAYMENTS_METHODS,
  TABS_WALLET,
} from '@/constants/tabsWallet';
import { TablePaymentMethods } from '@/components/layouts/Tables/TablePaymentMethods';
import { MyPlan } from '@/components/layouts/MyPlan';
import { TablePaymentsHistory } from '@/components/layouts/Tables/TablePaymentsHistory';

export const WalletTemplate = () => {
  const [tabActive, setTabActive] = useState(TABS_WALLET[0]);

  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <div className="mt-4">
        <Heading>Carteira</Heading>
        <div className="w-3/6 mt-4">
          <Tabs
            options={TABS_WALLET}
            optionActive={tabActive}
            onClick={(tab) => setTabActive(tab)}
          />
        </div>
        <div>
          {tabActive === ETabsWallet.Plan && (
            <div className="mt-4">
              <MyPlan />
            </div>
          )}
          {tabActive === ETabsWallet.PaymentMethods && (
            <div className="mt-4">
              <TablePaymentMethods paymentMethods={MOCK_PAYMENTS_METHODS} />
            </div>
          )}
          {tabActive === ETabsWallet.PaymentHistory && (
            <div className="mt-4">
              <TablePaymentsHistory history={MOCK_PAYMENTS_HISTORY} />
            </div>
          )}
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
