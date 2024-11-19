"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useVerify from "@/hooks/verificacao";
import useAuthCookie from "@/hooks/cookies";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useAuthCookie();
  const verify = useVerify();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(
    () => {
      const checkToken = async () => {
        const auth = await token.getAuthCookie();
        setIsAuthenticated(!!auth);
        setIsLoading(false);
      };

      checkToken();
      if (!isLoading && isAuthenticated) {
        router.push("/");
      }
    },
    [isAuthenticated, isLoading, router, token]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verify.createAcount(formData.username)) {
      token.setAuthCookie();
      router.push("/");
    } else {
      alert("USUÁRIO JÁ EXISTENTE!");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl text-gray-500">Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen flex">
      <div className="flex items-center justify-center w-4/12 h-screen bg-[#A3D6CB]">
        <section className="flex flex-col gap-14">
          <div className="flex flex-col justify-center items-center gap-6">
            <h3 className="text-[#0A5546] text-4xl font-medium">
              Bem-vindo ao Sistema Hospitalar
            </h3>
            <p className="font-medium text-white text-3xl">
              Faça seu Login ou crie uma conta
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="font-medium text-white text-2xl">
              Já tem uma conta? Faça o login
            </p>
            <Link href="/login">
              <button className="bg-[#F5F5F5] border-[1px] border-[#114238] text-black font-medium text-3xl w-56 h-20 rounded-sm shadow-xl">
                login
              </button>
            </Link>
          </div>
        </section>
      </div>
      <div className="w-8/12 h-screen bg-[#F1FFFC]">
        <section className="w-full h-full flex flex-col justify-center items-center gap-24">
          <div>
            <h1 className="text-6xl font-medium text-[#2B816E]">
              Faça seu cadastro
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-24"
          >
            <div className="flex flex-col justify-center gap-6">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuário"
                className="p-6 text-3xl font-medium w-[35.5rem] h-20 border-[#3C3C3C] border-2"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
                className="p-6 text-3xl font-medium w-[35.5rem] h-20 border-[#3C3C3C] border-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#A3D6CB] border-[1px] border-[#114238] text-white font-medium text-3xl w-56 h-20 rounded-sm shadow-xl"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Page;
