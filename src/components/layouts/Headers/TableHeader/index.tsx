import { Button, ButtonSizeVariant, ButtonVariant } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { EStatus } from '@/constants/contentCalls';
import clsx from 'clsx';
import { CheckCircle, Trash, Warning } from 'phosphor-react';

interface ITableHeaderProps {
  title: string;
  status?: EStatus;
  lastPlay?: string;
  handleResetList?: () => void;
  saveButtonIsAble?: boolean;
  showActions?: boolean;
}

export const TableHeader = ({
  title,
  status,
  lastPlay,
  handleResetList,
  showActions,
  saveButtonIsAble = false,
}: ITableHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <Heading>{title}</Heading>
      <div className="flex items-center ml-auto w-2/3 justify-end gap-12">
        {status && (
          <div className="flex ">
            <Paragraph className="flex items-center gap-2">
              Status: {getStatusComponent(EStatus.Completed)}
            </Paragraph>
          </div>
        )}
        {lastPlay && (
          <div className="flex ">
            <Paragraph className="flex items-center gap-2">
              Última reprodução: <span className="font-bold">{lastPlay}</span>
            </Paragraph>
          </div>
        )}
        {showActions && (
          <div className="items-center flex gap-2">
            <Button
              className="!h-8 m-auto font-normal !w-[200px] text-xs"
              onClick={() => {}}
              leftIcon={<CheckCircle size={16} color="#FFF" />}
              size={ButtonSizeVariant.Small}
              disabled={!saveButtonIsAble}
            >
              Salvar lista
            </Button>
            <Button
              className="!w-8 !h-8 rounded-full py-0 "
              onClick={handleResetList}
            >
              <Trash color="#FFF" size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusComponent = (status: EStatus) => {
  const iconsVariant = {
    [EStatus.Completed]: <CheckCircle color="#00DEA3" size={16} />,
    [EStatus.Pending]: <Warning color="#BA2100" size={16} />,
  };

  const statusBackground = {
    [EStatus.Completed]: 'bg-[#00DEA3] bg-opacity-10',
    [EStatus.Pending]: 'bg-[##BA2100] bg-opacity-10',
  };

  const labelStyle = {
    [EStatus.Completed]: '!text-[#00DEA3] font-medium',
    [EStatus.Pending]: '!text-[##BA2100] font-medium',
  };

  const statusLabel = {
    [EStatus.Completed]: 'Finalizada',
    [EStatus.Pending]: 'Pendente',
  };

  return (
    <div
      className={clsx(
        'flex items-center py-2 px-4 rounded-full gap-2',
        statusBackground[status]
      )}
    >
      {iconsVariant[status]}
      <Paragraph className={labelStyle[status]}>
        {statusLabel[status]}
      </Paragraph>
    </div>
  );
};
