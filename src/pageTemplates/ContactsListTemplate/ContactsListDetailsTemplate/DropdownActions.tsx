import { Line, Paragraph } from '@/components';

import { NotePencil, Trash } from 'phosphor-react';

export const DropdownActions = ({ setModalEditContactsListIsOpen }) => {

  const actions = [
    {
      icon: <NotePencil color="#01DDA3" size={16} />,
      color: '#01DDA3',
      label: 'Editar dados da Lista',
      action: () => setModalEditContactsListIsOpen(true),
    },
    {
      icon: <Trash color="#3F3F3F" size={16} />,
      color: '#3F3F3F',
      label: 'Deletar Lista',
      action: () => alert('colocar função de deletar aqui')
    },
  ];

  return (
    <>
      {actions.map((action, index) => {
        const isLastItem = actions.length === index + 1;
        return (
          <>
            <button
              onClick={action.action}
              className="flex gap-2  items-center"
            >
              {action.icon}
              <Paragraph style={{ color: action.color }}>
                {action.label}
              </Paragraph>
            </button>
            {!isLastItem && <Line direction="horizontal" />}
          </>
        );
      })}
    </>
  );
};
