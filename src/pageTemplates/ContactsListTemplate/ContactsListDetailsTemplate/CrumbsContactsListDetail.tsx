import { Breadcrumb } from "@/components";

export const CrumbsContactsListDetail = ({ contactsListDetailName }) => {
  const getCrumbs = (contactsListDetailName: string) => {
    return [
      {
        label: "Lista de Contatos",
        path: "/contacts",
      },
      {
        label: contactsListDetailName || "",
      },
    ];
  };

  return <Breadcrumb crumbs={getCrumbs(contactsListDetailName || "")} />;
};
