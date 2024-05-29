import { Line, Paragraph } from "@/components";
import { NotePencil, Trash } from "phosphor-react";

export const DropdownActions = ({ setModalEditNameContactsListIsOpen }) => {
  const actions = [
    {
      icon: <NotePencil color="#01DDA3" size={16} />,
      color: "#01DDA3",
      label: "Editar nome da Lista",
      action: () => setModalEditNameContactsListIsOpen(true),
    },
    {
      icon: <Trash color="#3F3F3F" size={16} />,
      color: "#3F3F3F",
      label: "Deletar Lista",
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
