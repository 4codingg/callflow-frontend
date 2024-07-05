import { TableDefault } from '../Tables/TableDefault';
import { AccordionCard } from '@/components/AccordionCard';

interface IMassCommunicationContactsProps {
  contacts: any[];
}

export const MassCommunicationContacts = ({
  contacts,
}: IMassCommunicationContactsProps) => {
  return (
    <div className="w-full">
      <AccordionCard
        title="Contatos"
        description="Visualize os contatos a serem reproduzidos da lista de contatos"
      >
        <TableDefault
          content={contacts}
          disableEditItem
          disableAccessItem
          disableDeleteItem
        />
      </AccordionCard>
    </div>
  );
};
