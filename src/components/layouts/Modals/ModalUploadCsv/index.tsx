import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { toast } from "@/utils/toast";
import { Check, CheckCircle, UploadSimple, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { formatFileSize, useCSVReader } from "react-papaparse";
import Image from "next/image";
import CloudImage from "@/assets/icons/cloud-add.svg";

interface IModalUploadCsvProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleUploadAccepted?: any;
  setFile?: any;
  file?: any;
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
        <div className="bg-white px-4 py-4 w-[430px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Adicionar contato
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="mt-4" />
          <Image src={CloudImage} alt="nuvem-upload" className="mx-auto mt-8" />
          {/* <input type="file" /> */}
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
                "error",
                "Algo deu errado. Cheque a extensão do arquivo e tente novamente."
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
                                {file.name}{" "}
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
                      <div className="gap-1 w-full items-center flex flex-col">
                        <Paragraph className="text-center font-medium">
                          Escolha um arquivo e arraste-o até aqui
                        </Paragraph>
                        <Paragraph className=" text-text-grey">
                          {" "}
                          .xlsx ou .csv até 50mb{" "}
                        </Paragraph>
                      </div>
                    ) : (
                      <div className="gap-1 w-full items-center flex flex-col">
                        <Paragraph className=" text-center font-medium">
                          Escolha um arquivo e arraste-o até aqui
                        </Paragraph>
                        <Paragraph className=" text-text-grey">
                          {" "}
                          .xlsx ou .csv até 50mb{" "}
                        </Paragraph>
                      </div>
                    )}
                  </div>
                  <section className="flex justify-end items-center gap-4 mt-[16px]">
                    <Button
                      leftIcon={<X size={24} />}
                      type="button"
                      className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                    >
                      Descartar Alterações
                    </Button>
                    <Button
                      leftIcon={<CheckCircle size={24} />}
                      type="submit"
                      className="!w-[109px] !h-[48px] font-medium"
                    >
                      Salvar
                    </Button>
                  </section>
                </>
              );
            }}
          </CSVReader>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
