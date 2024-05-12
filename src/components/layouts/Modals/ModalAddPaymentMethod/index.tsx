import { ICreatePaymentMethodBody } from "@/@types/MethodPayment";
import { createPaymentMethod } from "@/api/wallet/createPaymentMethod";
import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Line } from "@/components/Line";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { useCompany } from "@/hooks/useCompany";
import {
  formatCardExpiration,
  formatCardNumber,
  formatCvc,
} from "@/utils/formatCvc";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { CheckCircle, CreditCard, Person, X, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import Cards from "react-credit-cards";

interface IModalAddPaymentMethod {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalAddPaymentMethod = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddPaymentMethod) => {
  const { mutateAsync: createPaymentMethodFn } = useMutation({
    mutationFn: createPaymentMethod,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleForm = async (body: ICreatePaymentMethodBody) => {
    try {
      setIsLoading(true);
      await createPaymentMethodFn({
        ...body,
      });

      toast("success", "Metodo de pagamento adicionado com sucesso");
    } catch (error) {
      toast("error", "Erro ao criar membro.");
      console.log(error);
      setIsLoading(false);
    }
  };

  const { values, handleSubmit, setFieldValue, getFieldProps } = useFormik({
    initialValues: {
      nickname: "",
      remoteIp: "0000000",
      creditCard: {
        holderName: "",
        number: "",
        expiryMonth: "",
        expiryYear: "",
        ccv: "",
      },
      creditCardHolderInfo: {
        name: "",
        email: "",
        cpfCnpj: "",
        postalCode: "",
        addressNumber: "",
        address: "",
        phone: "",
      },
    },
    onSubmit: handleForm,
  });

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content className="min-w-[500px]">
        <div className="bg-white py-4 ">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph
              size={ParagraphSizeVariant.Medium}
              className=" text-purple-secundary !font-medium "
            >
              Adicionar metodo de pagamento
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6 !h-6">
                <XCircle size={24} color="#000" />
              </Button>
            </Modal.Close>
          </header>
          <Line direction="horizontal" className="my-4" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Cards
              cvc={values.creditCard.ccv}
              expiry={values.creditCard.expiryYear}
              name={values.creditCard.holderName}
              number={values.creditCard.number}
            />
            <Input
              {...getFieldProps("creditCard.holderName")}
              label="Nome no cartão"
              placeholder="Jane Doe"
              labelStyle="mt-12"
            />
            <Input
              {...getFieldProps("creditCardHolderInfo.email")}
              label="Email"
              placeholder="janedoe@gmail.com"
            />
            <Input
              {...getFieldProps("nickname")}
              placeholder="Apelido do seu cartão"
              iconRight={<Person />}
              disableError
              label="Apelido do cartão"
            />
            <Input
              {...getFieldProps("creditCard.number")}
              onChange={(e) =>
                setFieldValue(
                  "creditCard.number",
                  formatCardNumber(e.target.value)
                )
              }
              value={values.creditCard.number}
              placeholder="0000 0000 0000 0000"
              iconRight={<CreditCard />}
              maxLength={19}
              disableError
            />
            <div className="flex gap-4">
              <Input
                {...getFieldProps("creditCard.expiryYear")}
                onChange={(e) =>
                  setFieldValue(
                    "creditCard.expiryYear",
                    formatCardExpiration(e.target.value)
                  )
                }
                value={values.creditCard.expiryYear}
                placeholder="MM / YYYY"
                maxLength={9}
                disableError
              />
              <Input
                {...getFieldProps("creditCard.cvc")}
                onChange={(e) =>
                  setFieldValue("creditCard.cvc", formatCvc(e.target.value))
                }
                placeholder="CVC"
                maxLength={3}
                disableError
              />
            </div>
            <section className="flex justify-end items-center gap-4 mt-8">
              <Button
                leftIcon={<X size={24} />}
                type="button"
                className="!bg-grey-secundary !text-purple-secundary !w-[213px] !h-[48px] font-medium"
                onClick={() => {}}
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
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
