import { Heading, LayoutWithSidebar } from "@/components";
import { Button } from "@/components/Button";
import { InputRadioGroup } from "@/components/InputRadioGroup";
import { useRouter } from "next/router";
// import { MdOutlinePix } from "react-icons/md";

const options = [
  {
    label: "Pix",
    value: "pix",
  },
  {
    label: "Cartão de crédito",
    value: "credit-card",
  },
];

export const AddFundsTemplate = () => {
  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <Heading>Pagamentos:</Heading>
      <div className="mt-4"></div>
      <main className="flex flex-col w-full justify-center items-center p-5">
        <div className="flex justify-center items-center w-full ">
          <section className="flex justify-center items-center flex-col w-3/5 bg-white rounded-lg mt-2 pb-2 border-b-2 border-gray-200">
            <h4 className="mt-5"> Order #12123121_72726525</h4>
            <div className="w-3/5 justify-between flex mt-5 ">
              <h1 className="text-2xl font-medium ">
                69 <span className="text-gray-400"> $</span>
              </h1>
              <div className="flex flex-col items-center">
                <p className="text-base font-medium"> Description</p>
                <p className="text-sm font-normal"> Order Description </p>
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col bg-white w-5/6 p-8 rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800">
            {" "}
            Selecione o metodo de pagamento:
          </h1>
          <section className=" mt-14 flex justify-start items-center">
            <InputRadioGroup
              onChange={() => {}}
              defaultValue={`pix`}
              options={options}
            />
          </section>
          <Button className=" mt-8 py-3 bg-yellow-300 rounded-lg">
            {" "}
            Continue
          </Button>
        </div>
      </main>
    </LayoutWithSidebar>
  );
};
