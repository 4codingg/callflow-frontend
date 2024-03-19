import { Heading, Input, Line, Logo, Paragraph } from "@/components";
import { Button, ButtonVariant } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { validationSchema } from "@/validation/login";
import { useFormik } from "formik";
import Link from "next/link";
import { Envelope, Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const LoginTemplate = () => {
  const [error, setError] = useState(null);
  const handleAuth = async (values) => {
    try {
      console.log("Autenticando com:", values);
    } catch (error) {
      setError(
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) =>
      handleAuth({ email: values.email, password: values.password }),
  });

  return (
    <div className="h-[100vh] w-full flex  flex-wrap justify-between">
      <div className="w-[50%] bg-primary text-white py-[32px] px-[36px]">
        {" "}
        <Logo />
      </div>
      <div className="flex flex-col items-center justify-center w-[50%] px-20 relative">
        <Link href={"/signup"} className="absolute top-9 right-9 !font-bold">
          Cadastre-se
        </Link>
        <Heading>Fazer Login</Heading>
        <Paragraph className="text-sm text-grey-five !font-poppins">
          {" "}
          Insira seu e-mail e senha abaixo para fazer login
        </Paragraph>
        <form className="w-[393px] mt-[23px]" onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Enter your email"
            type="text"
            label="Email"
            className=" !font-semibold mt-[12px] px-4 py-[10px]"
            error={formik.errors?.email as string}
            {...formik.getFieldProps("email")}
            iconRight={<Envelope size={16} />}
          />

          <Input
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            label="Password"
            className="font-semibold mt-[12px] px-4 py-[10px]"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            error={formik.errors?.password as string}
            iconRight={
              showPassword ? (
                <Eye
                  size={16}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <EyeClosed
                  size={16}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              )
            }
          />

          <Button className="!rounded-md !font-poppins !font-medium ">
            Logar
          </Button>
          <section className="flex justify-center items-center gap-[9px] mt-[13px]">
            <Line direction="horizontal" className=" text-grey-five" />
            <Paragraph> ou</Paragraph>
            <Line direction="horizontal" className=" text-grey-five" />
          </section>
          <Button
            className="!rounded-md bg-white !text-black !font-medium h-[40px] border mt-[18px] !font-poppins "
            leftIcon={<FcGoogle size={20} />}
          >
            Logar com o Google
          </Button>
          <Link
            href="/reset-password"
            className="w-full flex justify-end mb-8 text-primary font-medium text-sm mt-[16px]"
          >
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  );
};
