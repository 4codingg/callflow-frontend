
import { CreditCardBrand } from '@/components/CreditCardBrand';
import { Labelbox } from '@/components/Labelbox';
import { MessageCell } from '@/components/MessageCell';
import { Paragraph } from '@/components/Paragraph';
import { Status } from '@/components/Status';
import { formatDateToDDMMYYYYHHMM } from '@/utils/formatDateToDDMMYYYYHHMM';
import { formatNumberToStringBR } from '@/utils/formatNumberToStringBR';
import { useState } from 'react';

export const TableCellContent = ({ item, title }) => {
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState()

  if (title === 'variables') {
    return (
      <div className="flex gap-1 flex-wrap">
        {item[title].map((variable, index) => {
          return (
            <Labelbox
              className="!px-2 py-1"
              classNameLabel="text-[10px] font-normal"
              label={variable}
              key={index}
            />
          );
        })}
      </div>
    );
  }

  if (title === 'last4') {
    return item.last4 ? (
      <div className="flex items-center gap-2">
        <CreditCardBrand brand={item.brand} />
        <Paragraph>**** **** **** {item.last4}</Paragraph>
      </div>
    ) : (
      <div>-</div>
    );
  }

  if (title === 'createdAt' || title === 'processedAt') {
    return formatDateToDDMMYYYYHHMM(item[title]);
  }

  if (title === 'cost') {
    const cost = 'R$ ' + formatNumberToStringBR(item[title]);
    return cost;
  }

  if (title === 'historyType') {
    if (item[title] === 'sms') {
      return 'Envio de SMS em massa';
    }
    if (item[title] === 'email') {
      return 'Envio de E-mail em massa';
    }
    if (item[title] === 'call') {
      return 'Envio de Ligações em massa';
    }
    if (item[title] === 'balance') {
      return 'Reabastecimento de Saldo';
    }

    return item[title];
  }

  if (title === 'status') {
    return <Status value={item[title]} />;
  }

  if (title === 'message') {
    return <MessageCell item={item[title]} modalIsOpen={modalMessageIsOpen} setModalIsOpen={setModalMessageIsOpen} />


  }

  return item[title];
};
