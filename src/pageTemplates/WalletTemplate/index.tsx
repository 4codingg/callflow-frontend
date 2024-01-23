import {
  Card,
  Heading,
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
} from '@/components';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import { CreditCard, PlusCircle } from 'phosphor-react';
import { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import { USER_CARDS_MOCK } from '@/constants/userCards';
import Image from 'next/image';
import CardCredit from '@/assets/card-credit.jpg';
import { Tabs } from '@/components/Tabs';
import {
  ETabsWallet,
  MOCK_PAYMENTS_METHODS,
  TABS_WALLET,
} from '@/constants/tabsWallet';
import { TablePaymentMethods } from '@/components/layouts/TablePaymentMethods';

export const WalletTemplate = () => {
  const [tabActive, setTabActive] = useState(TABS_WALLET[0]);

  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <div className="mt-4">
        <Heading>Carteira</Heading>
        <Card className="mt-4 flex !w-[600px] items-center gap-4">
          <div className="flex flex-col">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Seu saldo
            </Paragraph>
            {/* <button className="flex items-center justify-center bg-primary rounded p-2 shadow-primary">
              <Plus color="#FFF" />
            </button> */}
            <div className="flex items-center mt-4">
              <Paragraph
                className="text-primary mr-2 font-medium"
                size={ParagraphSizeVariant.ExtraLarge}
              >
                R$
              </Paragraph>
              <Paragraph>Reais</Paragraph>
            </div>
            <Paragraph className="text-primary !text-2xl font-bold">
              19.203,11
            </Paragraph>
          </div>
          <Image
            src={CardCredit}
            alt=""
            height={100}
            className="mt-4 mx-auto flex"
          />
          <Button
            leftIcon={<PlusCircle size={16} color="#FFF" />}
            className="!w-[200px] !h-[40px]"
            onClick={() => router.push('/wallet/add-funds')}
          >
            Adicionar saldo
          </Button>
        </Card>
        <div className="w-3/6 mt-6">
          <Tabs
            options={TABS_WALLET}
            optionActive={tabActive}
            onClick={(tab) => setTabActive(tab)}
          />
        </div>
        <div>
          {tabActive === ETabsWallet.PaymentMethods && (
            <div className="mt-4">
              <TablePaymentMethods paymentMethods={MOCK_PAYMENTS_METHODS} />
            </div>
          )}
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
