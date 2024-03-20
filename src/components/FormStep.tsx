import { CaretRight, Check } from "phosphor-react";
import { Paragraph } from "./Paragraph";

interface DotStepsProps {
  quantity: number;
  description: string;
  className?: string;
}

interface DataProps {
  data: DotStepsProps[];
  validity?: boolean;
}
export const FormStep = (props: DataProps) => {
  return (
    <div className="flex font-poppins justify-center items-center my-8">
      {props.data.map((item, index) => (
        <div key={index} className="flex gap-2">
          {props.validity && index === 0 ? (
            <div className="rounded-full h-6 w-6 flex justify-center items-center bg-green text-white font-bold text-sm ml-2">
              <Check size={20} />
            </div>
          ) : (
            <div className="rounded-full h-6 w-6 flex justify-center items-center bg-primary text-white font-bold text-sm ml-2">
              {item.quantity}
            </div>
          )}

          <Paragraph className="!font-bold text-default-grey">
            {item.description}
          </Paragraph>
          {index === props.data.length - 1 ? null : <CaretRight size={24} />}
        </div>
      ))}
    </div>
  );
};
