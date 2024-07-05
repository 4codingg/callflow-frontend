import { Button, ButtonVariant } from '@/components/Button';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { toast } from '@/utils/toast';
import { CheckCircle, FileCsv, Trash, X, XCircle } from 'phosphor-react';
import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import Image from 'next/image';
import CloudImage from '@/assets/icons/cloud-add.svg';
import TickeCircle from '@/assets/icons/tick-circle.svg';
import { useContactsList } from '@/hooks/useContactsListDetail';

export const ModalUploadCsv = () => {
  const [pendingResults, setPendingResults] = useState([]);
  const [files, setFiles] = useState([]);

  const {
    handleUploadAccepted,
    setModalUploadCSVIsOpen,
    modalUploadCSVIsOpen,
  } = useContactsList();
  const { CSVReader } = useCSVReader();

  function handleDescarteResults() {
    setPendingResults([]);
    setFiles([]);
    setModalUploadCSVIsOpen(false);
  }

  function handleSalvedResults() {
    const filteredResults = pendingResults.map(fileResult => ({
      ...fileResult,
      data: fileResult.data.filter(row => row.some(cell => cell !== '' && cell !== null && cell !== undefined))
    }));
    handleUploadAccepted(filteredResults);
    handleUploadAccepted(pendingResults);
    setModalUploadCSVIsOpen(false);
    toast('success', 'Upload realizado com sucesso');
    setFiles([]);
    setPendingResults([]);
  }

  function handleDeleteUpload(fileName) {
    setPendingResults(pendingResults.filter((file) => file.name !== fileName));
    setFiles(files.filter((file) => file.name !== fileName));
  }
  return (
    <Modal.Root
      isOpen={modalUploadCSVIsOpen}
      setIsOpen={setModalUploadCSVIsOpen}
    >
      <Modal.Content className="w-[430px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Upload de planilha
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <CSVReader
            onUploadAccepted={(results, file) => {
              setPendingResults([...pendingResults, results]);
              setFiles([...files, file]);
            }}
            onUploadRejected={() =>
              toast(
                'error',
                'Algo deu errado. Cheque a extensão do arquivo e tente novamente.'
              )
            }
            multiple={false}
          >
            {({ getRootProps, ProgressBar }) => {
              return (
                <>
                  <div
                    {...getRootProps()}
                    className="w-full bg-white flex flex-col gap-4 items-center  mt-4 rounded-full"
                  >
                    <div className="gap-1 w-full items-center flex flex-col border-2 border-dashed border-medium-light-grey py-8 rounded-lg">
                      <Image src={CloudImage} alt="" />
                      <Paragraph className=" text-center font-medium">
                        Escolha um arquivo e arraste-o até aqui
                      </Paragraph>
                      <Paragraph className="text-default-grey">
                        .xlsx ou .csv até 50mb
                      </Paragraph>
                      <Button
                        className="!h-[24px] !w-[140px] text-xs font-normal mt-4 !border"
                        variant={ButtonVariant.Secondary}
                      >
                        Escolher arquivo
                      </Button>
                    </div>
                  </div>
                </>
              );
            }}
          </CSVReader>
          <div className="w-full flex flex-col items-center  gap-4 mt-6">
            {files.map((file) => (
              <div className="flex gap-4 w-full bg-light-grey px-4 py-3 rounded-3xl items-center relative">
                <FileCsv size={40} />
                <div className="flex flex-col gap-3 ">
                  <Paragraph className="!text-xs">{file.name}</Paragraph>
                  <Paragraph className="!text-xs flex gap-2 text-[#A9ACB4]">
                    {file.size} of {file.size} •
                    <Paragraph className="flex items-center gap-2 !text-xs">
                      <Image src={TickeCircle} alt="" />
                      Completed
                    </Paragraph>
                  </Paragraph>
                </div>
                <button
                  onClick={() => handleDeleteUpload(file.name)}
                  className="absolute top-3 right-4"
                >
                  <Trash size={16} color="#000" />
                </button>
              </div>
            ))}
          </div>
          <section className="flex justify-end items-center gap-4 mt-[16px]">
            <Button
              leftIcon={<X size={24} />}
              type="button"
              className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
              onClick={handleDescarteResults}
            >
              Descartar Alterações
            </Button>
            <Button
              leftIcon={<CheckCircle size={24} />}
              type="submit"
              className="!w-[109px] !h-[48px] font-medium"
              onClick={handleSalvedResults}
            >
              Salvar
            </Button>
          </section>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
