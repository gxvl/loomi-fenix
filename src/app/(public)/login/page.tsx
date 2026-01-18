"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/src/components/Checkbox/checkbox";
import InputField from "@/src/components/InputField/inputField";
import { loginFormSchema, loginForm } from "@/src/validations/login";
import { login } from "@/src/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<loginForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = async (data: loginForm) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await login(data);

      if (response.status === 201 && response.data.access_token) {
        localStorage.setItem("authToken", response.data.access_token);

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setLoginError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex py-20 gap-10 items-center px-10 h-screen justify-between">
      <div className="flex h-full flex-col gap-40 w-full justify-start">
        <h1 className="text-5xl text-accent-blue font-extrabold">Nortus</h1>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-2">
            <h4 className="text-3xl">Login</h4>
            <p className="text-lg font-inter">
              Entre com suas credenciais para acessar a sua conta.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <InputField
              placeholder="Usuário"
              required
              name="email"
              register={register}
              labelMessage="Insira o seu e-mail, CPF ou passaporte."
              formErrors={errors}
            />
            <InputField
              suffix={
                isPasswordVisible ? (
                  <EyeClosed
                    color="#777A84"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="cursor-pointer"
                  />
                ) : (
                  <Eye
                    color="#777A84"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="cursor-pointer"
                  />
                )
              }
              placeholder="Senha"
              required
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              register={register}
              formErrors={errors}
            />
            <div className="flex justify-between">
              <Checkbox label="Lembrar meu usuário" />
              <Link
                href="#"
                className="text-accent-blue hover:text-white transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <Button type="submit" disabled={isLoading || !isValid}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
      <div className="relative w-full h-full">
        <Image
          fill
          src={"login2.svg"}
          alt="Imagem de login"
          className="absolute"
        />
        <Button
          variant={"secondary"}
          className="absolute w-40 top-[5%] right-[5%] flex items-center gap-2 px-4 py-2 cursor-pointer z-10"
        >
          <Headset size={20} />
          Ajuda
        </Button>
      </div>
    </main>
  );
}
