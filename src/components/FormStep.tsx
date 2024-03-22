import clsx from "clsx";
import { CaretRight, Check } from "phosphor-react";
import { Paragraph } from "./Paragraph";

interface DotStepsProps {
  description?: string;
  className?: string;
  value?: string;
}

interface DataProps {
  data: DotStepsProps[];
  activeStep: any;
  setActiveStep?: any;
}

export const FormStep = ({ data, activeStep, setActiveStep }: DataProps) => {
  function HandleActiveCicle(item, index) {
    const activeStepIndex = data.findIndex((item) => item.value === activeStep);
    if (index < activeStepIndex) {
      setActiveStep(item.value);
    }
  }

  return (
    <div className="flex font-poppins justify-center items-center my-8">
      {data.map((item, index) => {
        const isActive = item.value === activeStep;
        const activeStepIndex = data.findIndex(
          (item) => item.value === activeStep
        );

        return (
          <div key={index} className="flex gap-2 items-center">
            {!isActive && activeStepIndex > index && (
              <div className="rounded-full h-6 w-6 flex justify-center items-center bg-green text-white font-bold text-sm ml-2">
                <Check size={20} />
              </div>
            )}
            {(isActive || activeStepIndex < index) && (
              <div className="rounded-full h-6 w-6 flex justify-center items-center bg-primary text-white font-bold text-sm ml-2">
                {index + 1}
              </div>
            )}
            <Paragraph
              onClick={() => HandleActiveCicle(item, index)}
              className={clsx("font-normal text-default-grey cursor-pointer", {
                "!font-bold": isActive,
              })}
            >
              {item.description}
            </Paragraph>
            {index === data.length - 1 ? null : <CaretRight size={24} />}
          </div>
        );
      })}
    </div>
  );
};
