import { useState } from "react";
import { Paragraph } from "../Paragraph";
import { getIconBrand } from "./PaymentMethodsTab";
import { formatCardNDropPayment } from "@/utils/formatCardDropPayment";

interface DataPaymentProps {
  id: number;
  icon: string;
  number: string;
  name: string;
}

interface DropPaymentProps {
  data: DataPaymentProps[];
}

export function DropdownPaymentMethods({ data }: DropPaymentProps) {
  const [selectedItem, setSelectedItem] = useState<DataPaymentProps | null>(
    null
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemId = parseInt(event.target.value);
    const selectedItem = data.find((item) => item.id === selectedItemId);
    setSelectedItem(selectedItem || null);
  };

  return (
    <div className="relative">
      <select
        className="h-auto appearance-none border border-gray-300 rounded-md py-2 pl-12 pr-4 bg-white text-sm font-poppins "
        onChange={handleSelectChange}
        value={selectedItem ? selectedItem.id : undefined}
      >
        <option value="">Selecione o método de pagamento</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {formatCardNDropPayment(item.number)} - {item.name}
          </option>
        ))}
      </select>
      {selectedItem && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div>{getIconBrand(selectedItem.icon)}</div>
        </div>
      )}
    </div>
  );
}
