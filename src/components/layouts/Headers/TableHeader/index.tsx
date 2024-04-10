import { Heading } from '@/components/Heading';
import { Tipbox } from '@/components/Tipbox';
import { Warning } from 'phosphor-react';

interface ITableHeaderProps {
  title: string;
  dataIsPending?: boolean;
}

export const TableHeader = ({ title, dataIsPending }: ITableHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <Heading>{title}</Heading>
      <div className="flex items-center ml-auto w-2/3 justify-end gap-12">
        {dataIsPending && (
          <Tipbox className="!py-2 !w-[500px]" iconLeft={<Warning size={20} />}>
            Você tem dados pendentes, salve-os para não perdê-los.
          </Tipbox>
        )}
      </div>
    </div>
  );
};
