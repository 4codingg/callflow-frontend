import { Button, ButtonVariant } from "@/components/Button";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { toast } from "@/utils/toast";
import { CheckCircle, FileCsv, Trash, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { formatFileSize, useCSVReader } from "react-papaparse";
import * as XLSX from "xlsx";
import Image from "next/image";
import CloudImage from "@/assets/icons/cloud-add.svg";
import TickeCircle from "@/assets/icons/tick-circle.svg";

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
  const [pendingResults, setPendingResults] = useState([]);
  const [files, setFiles] = useState([]);

  const { CSVReader } = useCSVReader();

  function handleDescarteResults() {
    setPendingResults([]);
    setFiles([]);
    setModalIsOpen(false);
  }

  function handleSalvedResults() {
    handleUploadAccepted(pendingResults);
    setModalIsOpen(false);
    toast("success", "Upload realizado com sucesso");
    setFiles([]);
    setPendingResults([]);
  }

  function handleDeleteUpload(fileName) {
    setPendingResults(pendingResults.filter((file) => file.name !== fileName));
    setFiles(files.filter((file) => file.name !== fileName));
  }

  function handleFileUpload(file) {
    const fileType = file.name.split(".").pop();

    if (fileType === "csv") {
      CSVReader.parse(file, {
        complete: (results) => {
          setPendingResults([...pendingResults, results]);
          setFiles([...files, file]);
        },
        error: () => {
          toast(
            "error",
            "Algo deu errado. Cheque a extensão do arquivo e tente novamente."
          );
        },
      });
    } else if (fileType === "xlsx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        if (typeof result !== "string") {
          const data = new Uint8Array(result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName],
            { header: 1 }
          );
          setPendingResults([...pendingResults, { data: worksheet }]);
          setFiles([...files, file]);
        }
      };
      reader.onerror = () => {
        toast(
          "error",
          "Algo deu errado. Cheque a extensão do arquivo e tente novamente."
        );
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast(
        "error",
        "Formato de arquivo não suportado. Por favor, envie um arquivo .csv ou .xlsx."
      );
    }
  }

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
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
          <div
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              handleFileUpload(file);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="w-full bg-white flex flex-col gap-4 items-center mt-4 rounded-full"
          >
            <div className="gap-1 w-full items-center flex flex-col border-2 border-dashed border-medium-light-grey py-8 rounded-lg">
              <Image src={CloudImage} alt="" />
              <Paragraph className=" text-center font-medium">
                Escolha um arquivo e arraste-o até aqui
              </Paragraph>
              <Paragraph className="text-default-grey">
                .xlsx ou .csv até 50mb
              </Paragraph>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleFileUpload(file);
                }}
                className="hidden"
              />
              <Button
                className="!h-[24px] !w-[140px] text-xs font-normal mt-4 !border"
                variant={ButtonVariant.Secondary}
                onClick={() => {
                  const fileInput = document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement;
                  if (fileInput) fileInput.click();
                }}
              >
                Escolher arquivo
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col items-center  gap-4 mt-6">
            {files.map((file) => (
              <div
                className="flex gap-4 w-full bg-light-grey px-4 py-3 rounded-3xl items-center relative"
                key={file.name}
              >
                <FileCsv size={40} />
                <div className="flex flex-col gap-3 ">
                  <Paragraph className="!text-xs">{file.name}</Paragraph>
                  <Paragraph className="!text-xs flex gap-2 text-[#A9ACB4]">
                    {formatFileSize(file.size)} •
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
              leftIcon={<XCircle size={24} />}
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
