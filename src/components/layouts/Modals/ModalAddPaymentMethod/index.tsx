import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Line } from '@/components/Line';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import {
  formatCardExpiration,
  formatCardNumber,
  formatCvc,
} from '@/utils/formatCvc';
import { useFormik } from 'formik';
import { CheckCircle, CreditCard, Person, X, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import Cards from 'react-credit-cards';

interface IModalAddPaymentMethod {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalAddPaymentMethod = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddPaymentMethod) => {
  const handleForm = (values: any) => {
    console.log(values);
  };

  const { values, handleSubmit, setFieldValue, getFieldProps } = useFormik({
    initialValues: {
      cvc: '',
      expiry: '',
      focus: 'name',
      number: '',
      name: '',
      cardNickname: '',
    },
    onSubmit: handleForm,
  });

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-4 py-4 min-w-[500px]">
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
          <Line direction="horizontal" className="my-4" />
          <form onSubmit={handleSubmit}>
            <Cards
              cvc={values.cvc}
              expiry={values.expiry}
              focused={values.focus}
              name={values.name}
              number={values.number}
            />
            <Input
              {...getFieldProps('name')}
              label="Nome no cartão"
              placeholder="Jane Doe"
              labelStyle="mt-12"
            />
            <Input
              {...getFieldProps('email')}
              label="Email"
              placeholder="janedoe@gmail.com"
            />
            <Input
              {...getFieldProps('cardNickname')}
              placeholder="Apelido do seu cartão"
              iconRight={<Person />}
              disableError
              label="Dados do cartão"
            />
            <Input
              {...getFieldProps('number')}
              onChange={(e) =>
                setFieldValue('number', formatCardNumber(e.target.value))
              }
              value={values.number}
              placeholder="0000 0000 0000 0000"
              iconRight={<CreditCard />}
              maxLength={19}
              disableError
            />
            <div className="flex">
              <Input
                {...getFieldProps('expiry')}
                onChange={(e) =>
                  setFieldValue('expiry', formatCardExpiration(e.target.value))
                }
                value={values.expiry}
                placeholder="MM / YYYY"
                maxLength={9}
                disableError
              />
              <Input
                {...getFieldProps('cvc')}
                onChange={(e) =>
                  setFieldValue('cvc', formatCvc(e.target.value))
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
