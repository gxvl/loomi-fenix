"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/src/components/Checkbox/checkbox";
import InputField from "@/src/components/InputField/inputField";
import { login } from "@/src/services/auth";
import { loginForm, loginFormSchema } from "@/src/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
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
        document.cookie = `authToken=${response.data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;

        const userInfo = {
          email: data.email,
          name: "Geraldo Loomi",
          role: "Consultor de Seguros",
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("authToken", response.data.access_token);

        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setLoginError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-between gap-10 px-10 py-20">
      <div className="flex h-full w-full flex-col justify-start gap-40">
        <h1 className="text-accent-blue text-5xl font-extrabold">Nortus</h1>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-2">
            <h4 className="text-3xl">Login</h4>
            <p className="font-inter text-lg">
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
                className="text-accent-blue transition-colors hover:text-white"
              >
                Esqueci minha senha
              </Link>
            </div>
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <Button type="submit" disabled={isLoading || !isValid}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          fill
          src={"login2.svg"}
          alt="Imagem de login"
          className="absolute"
        />
      </div>
    </main>
  );
}
