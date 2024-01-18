import { Input } from "@/components";
import {
  formatCvc,
  formatCardNumber,
  formatCardExpiration,
} from "@/utils/formatCvc";
import { CreditCard } from "phosphor-react";
import Cards from "react-credit-cards";

export const CreditCardCheckout = ({ values, handleChange, setFieldValue }) => {
  return (
    <form>
      <Cards
        cvc={values.cvc}
        expiry={values.expiry}
        focused={values.focus}
        name={values.name}
        number={values.number}
      />
      <Input
        onChange={handleChange("name")}
        label="Nome no cartão"
        placeholder="Jane Doe"
        onFocus={handleChange("focus")}
      />
      <Input
        onChange={handleChange("email")}
        label="Email"
        placeholder="janedoe@gmail.com"
        onFocus={handleChange("focus")}
      />
      <Input
        onChange={(e) =>
          setFieldValue("number", formatCardNumber(e.target.value))
        }
        label="Dados do cartão"
        placeholder="0000 0000 0000 0000"
        iconRight={<CreditCard />}
        onFocus={handleChange("focus")}
      />
      <div className="flex gap-4">
        <Input
          onChange={(e) =>
            setFieldValue("expiry", formatCardExpiration(e.target.value))
          }
          placeholder="MM / YYYY"
          onFocus={handleChange("focus")}
        />
        <Input
          onChange={(e) => setFieldValue("cvc", formatCvc(e.target.value))}
          placeholder="CVC"
          maxLength={3}
          onFocus={handleChange("focus")}
        />
      </div>
    </form>
  );
};
