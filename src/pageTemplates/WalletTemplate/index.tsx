import { CreditCardIcon } from '@/assets/icons/credit-card';
import { Heading, LayoutWithSidebar } from '@/components';
import { Button } from '@/components/Button';
import { InputRadioGroup } from '@/components/InputRadioGroup';
import { useRouter } from 'next/router';
import { CreditCard } from 'phosphor-react';

export const WalletTemplate = () => {
  const options = [
    {
      label: 'Pix',
      value: 'pix',
      icon: () => <CreditCard />,
    },
    {
      label: 'Cartão de crédito',
      value: 'credit-card',
    },
  ];

  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <Heading>Carteira</Heading>
      <div className="mt-4">
        <Button onClick={() => router.push('/wallet/add-funds')}>
          Adicionar dinheiro
        </Button>
        <InputRadioGroup
          onChange={() => {}}
          defaultValue={'pix'}
          options={options}
        />
      </div>
    </LayoutWithSidebar>
  );
};
