import { Dropdown } from "@/components";
import { AccordionCard } from "@/components/AccordionCard";

interface IDestinationVariablesSectionProps {
  values: {
    variables: string[];
  };
  setFieldValue: any;
  getFieldProps: any;
}

export const DestinationVariablesSection = ({
  setFieldValue,
  values,
  getFieldProps,
}: IDestinationVariablesSectionProps) => {
  return (
    <div className="mt-6">
      <AccordionCard
        title="Variáveis de destino"
        description="Escolha as variáveis para utilizar como destino para os disparos."
      >
        <div className="flex flex-col">
          <div className="mt-4">
            <Dropdown
              labelDescription="Se existir, selecione a variável que você pensa em utilizar como destino para envios de SMS/Ligações."
              options={values.variables}
              placeholder="Escolha a variável de destino para SMS/Ligações"
              label="Variável de destino para SMS/Ligações"
              onValueChange={(value) =>
                setFieldValue("phoneDestinationVariable", value)
              }
              {...getFieldProps("phoneDestinationVariable")}
            />
          </div>
          <div className="mt-4">
            <Dropdown
              labelDescription="Se existir, selecione a variável que você pensa em utilizar como destino para envios de E-mails."
              options={values.variables}
              placeholder="Escolha a variável de destino para Email"
              label="Variável de destino para E-mail"
              onValueChange={(value) =>
                setFieldValue("emailDestinationVariable", value)
              }
              {...getFieldProps("emailDestinationVariable")}
            />
          </div>
        </div>
      </AccordionCard>
    </div>
  );
};
