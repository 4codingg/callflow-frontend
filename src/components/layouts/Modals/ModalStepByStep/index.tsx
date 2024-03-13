import { Button, ButtonVariant } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { INSTRUCTIONS, MOCK_CONTACTS } from "@/constants/contentCalls";
import { Contact } from "@/interfaces";
import Image from "next/image";
import { ArrowArcRight, ArrowRight, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import Rocket from "@/assets/icons/rocket-launch.svg";

interface IModalAddItemFromContactsProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalStepByStep = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddItemFromContactsProps) => {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [selectedContacts, setSelectedContacts] = useState<Contact[] | null>(
    []
  );

  const handleSelectContact = (contact: Contact) => {
    if (selectedContacts.find((sC) => sC.id === contact.id)) {
      const selectedContactsFiltered = selectedContacts.filter(
        (sC) => sC.id !== contact.id
      );
      setSelectedContacts([...selectedContactsFiltered]);
      return;
    }

    setSelectedContacts([...selectedContacts, contact]);
    console.log(selectedContacts);
  };

  const handleSave = () => {
    console.log("=============");
    console.log(selectedContacts);
    console.log("=============");
  };

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[700px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Enviando SMS em massa
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <form
            className="mt-6 flex flex-col gap-4 min-w-[600px] max-h-[80vh]"
            onSubmit={handleSave}
          >
            {INSTRUCTIONS.map((instruction) => {
              return (
                <div className="flex justify-start gap-4 items-center">
                  <section>
                    {" "}
                    <Image src={Rocket} alt="Foguete" />
                  </section>
                  <section className="flex flex-col gap-[4px]">
                    <Paragraph className="text-primary font-bold text-sm">
                      Passo {instruction.id}
                    </Paragraph>
                    <Paragraph className="font-normal">
                      {instruction.description}
                    </Paragraph>
                  </section>
                </div>
              );
            })}
            <section className="flex justify-end mt-[30px]">
              <Button
                type="button"
                className="text-xs font-normal !w-[144px] "
                onClick={handleSave}
              >
                OK, entendi <ArrowRight size={18} />
              </Button>
            </section>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
