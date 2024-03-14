import React from "react";
import { Label } from "./Label";

interface SelectDadosProps {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface SelectProps {
  options: SelectDadosProps[];
  nameList: string[];
}

interface OptionsProps {
  list: string;
  label?: string;
}

const Select: React.FC<OptionsProps> = (list, label) => {
  return (
    <div className="flex flex-col w-full">
      <Label className="font-semibold font-poppinstext-default-grey">
        {" "}
        teste
      </Label>
      <select className="w-full font-normal text-grey-input h-[40px] bg-white rounded mt-2 outline-none ">
        <option>teste</option>
        <option>Contact2</option>
        <option>Contact3</option>
      </select>
    </div>
  );
};

export default Select;
