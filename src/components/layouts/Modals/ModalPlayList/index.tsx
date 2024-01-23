import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Dispatch, SetStateAction } from 'react';

interface IModalPlayListProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  item: any;
}

export const ModalPlayList = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalPlayListProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-8 min-w-[400px]">
          <div className="flex items-center justify-between">
            <Button>Cancelar</Button>
            <Button>Reproduzir</Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
