import { Button, ButtonVariant } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { toast } from '@/utils/toast';
import { Check, UploadSimple, X, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatFileSize, useCSVReader } from 'react-papaparse';

interface IModalUploadCsvProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleUploadAccepted: any;
  setFile: any;
  file: any;
}

export const ModalUploadCsv = ({
  setModalIsOpen,
  modalIsOpen,
  handleUploadAccepted,
  setFile,
  file,
}: IModalUploadCsvProps) => {
  const [uploadWasRejected, setUploadWasRejected] = useState(false);

  const { CSVReader } = useCSVReader();

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-8 min-w-[500px]">
          <Modal.Close className="ml-auto flex">
            <button className="!w-6">
              <XCircle size={24} />
            </button>
          </Modal.Close>
          <CSVReader
            onUploadAccepted={(results, file) => {
              handleUploadAccepted(results);
              setFile(file);
            }}
            onDragOver={(event: DragEvent) => {
              event.preventDefault();
            }}
            onDragLeave={(event: DragEvent) => {
              event.preventDefault();
            }}
            onUploadRejected={() =>
              toast(
                'error',
                'Algo deu errado. Cheque a extensão do arquivo e tente novamente.'
              )
            }
            noClick
            multiple={false}
          >
            {({ getRootProps, ProgressBar }) => {
              return (
                <>
                  <div
                    {...getRootProps()}
                    className="w-full bg-white mt-4 flex flex-col gap-4 items-center  py-8 rounded-full"
                  >
                    {file ? (
                      <>
                        <div className="flex flex-col items-center gap-4">
                          <Check color="#00DEA3" size={40} />
                          <Paragraph size={ParagraphSizeVariant.Large}>
                            File uploaded
                          </Paragraph>
                          <div className="flex rounded-lg ">
                            <div className="bg-light-grey w-[300px] py-2 px-4 rounded-tl-full rounded-bl-full">
                              <Paragraph className="">
                                {file.name}{' '}
                                <span className="text-default-grey">
                                  ({formatFileSize(file.size)})
                                </span>
                              </Paragraph>
                              <span></span>
                            </div>
                            <button
                              className="bg-red bg-opacity-50 px-3 rounded-tr-full rounded-br-full"
                              onClick={() => {
                                setFile(null);
                                // setResults([]);
                              }}
                            >
                              <X size={16} color="#E85959" />
                            </button>
                          </div>
                          <div className="">
                            <ProgressBar />
                          </div>
                        </div>
                      </>
                    ) : uploadWasRejected ? (
                      <div className="gap-4 w-full items-center flex flex-col">
                        <UploadSimple size={40} color="#783EFD" />
                        <Paragraph>
                          Arraste arquivos até aqui ou{' '}
                          <span className="text-primary">clique aqui</span> para
                          fazer upload de um arquivo.
                        </Paragraph>
                      </div>
                    ) : (
                      <div className="gap-4 w-full items-center flex flex-col">
                        <UploadSimple size={40} color="#783EFD" />
                        <Paragraph>
                          Arraste arquivos com a{' '}
                          <span className="text-primary">extensão CSV</span> até
                          aqui ou
                          <span className="text-primary">
                            {' '}
                            clique aqui
                          </span>{' '}
                          para fazer upload de um arquivo.
                        </Paragraph>
                      </div>
                    )}
                  </div>
                </>
              );
            }}
          </CSVReader>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
