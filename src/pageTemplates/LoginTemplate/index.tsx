import { Heading, Input, Line, Logo, Paragraph } from "@/components";
import { Button } from "@/components/Button";
import { LogoVariant } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/utils/toast";
import { validationSchema } from "@/validation/login";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Envelope, Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const LoginTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSignIn } = useAuth();
  const router = useRouter();

  const handleAuth = async (values: { email: string; password: string }) => {
    try {
      await handleSignIn(values.email, values.password);
      router.push("/dashboard");
      toast("success", "Bem vindo de volta!");
    } catch (err) {
      if (err.response.data.error === "Usuário/senha incorretos.") {
        toast("error", "Usuário/senha incorretos.");
        return;
      }

      toast(
        "error",
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    }
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
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
      <div className="w-[50%] bg-primary p-9 flex flex-col justify-between">
        <Logo variant={LogoVariant.Light} />
        <div>
          <Paragraph className="text-white font-normal">
            Seja um parceiro e facilite suas comunicações!
          </Paragraph>
          <Paragraph className="text-white font-normal">
            © call.flow - 2024
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[50%] px-20 relative">
        <Link
          href={"/signup"}
          className="absolute top-9 right-9 !font-semibold !text-sm"
        >
          Cadastre-se
        </Link>
        <Heading>Fazer Login</Heading>
        <Paragraph className="text-sm text-default-grey !font-poppins">
          Insira seu e-mail e senha abaixo para fazer login
        </Paragraph>
        <form className="w-[400px] mt-6" onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Digite seu e-mail"
            type="text"
            label="E-mail"
            className=" !font-semibold px-4 py-[10px]"
            error={formik.errors?.email as string}
            {...formik.getFieldProps("email")}
            iconRight={<Envelope size={16} />}
          />
          <Input
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            label="Senha"
            labelStyle="!text-sm !font-medium"
            className=" mt-[12px] px-4 py-[10px]"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            error={formik.errors?.password as string}
            iconRight={
              showPassword ? (
                <Eye
                  className="cursor-pointer"
                  size={16}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <EyeClosed
                  className="cursor-pointer"
                  size={16}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              )
            }
          />
          <Button className="!rounded-md !font-poppins !font-medium mt-2">
            Logar
          </Button>
          <div className="flex justify-center items-center gap-2 mt-3">
            <Line direction="horizontal" className=" text-default-grey" />
            <Paragraph>ou</Paragraph>
            <Line direction="horizontal" className=" text-default-grey" />
          </div>
          <Button
            className="!rounded-md bg-white !text-black !font-medium h-[40px] border mt-[18px] !font-poppins "
            leftIcon={<FcGoogle size={20} />}
          >
            Logar com o Google
          </Button>
          <Link
            href="/reset-password"
            className="w-full flex justify-end mb-8 text-primary font-medium text-xs mt-4"
          >
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  );
};
