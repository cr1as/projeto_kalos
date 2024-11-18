"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthCookie from "@/hooks/cookies";
import useVerify from "@/hooks/verificacao";

const Page: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useAuthCookie();
  const verify = useVerify();
   
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {

    const checkToken = async () => {
      const auth = await token.getAuthCookie();
      setIsAuthenticated(!!auth); 
      setIsLoading(false); 
    };

    checkToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verify.login(formData.username, formData.password)) {
      setLogin(true);
      token.setAuthCookie();
    } else {
      alert("USUÁRIO OU SENHA INCORRETOS!");
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
    <div>
      {!isAuthenticated ? (
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
                  Não tem uma conta? Cadastre-se
                </p>
                <Link href="/cadastro">
                  <button className="bg-[#F5F5F5] border-[1px] border-[#114238] text-black font-medium text-3xl w-56 h-20 rounded-sm shadow-xl">
                    cadastro
                  </button>
                </Link>
              </div>
            </section>
          </div>
          <div className="w-8/12 h-screen bg-[#F1FFFC]">
            {login ? (
              <div className="w-full h-full flex flex-col justify-center items-center gap-24">
                <h2>LOGIN BEM SUCEDIDO</h2>
                <Link href={"/"}>
                  <button className="h-32 w-80 bg-[#A3D6CB] rounded-sm hover:scale-105 hover:shadow-lg hover:shadow-slate-500 duration-200">
                    LOGIN
                  </button>
                </Link>
              </div>
            ) : (
              <section className="w-full h-full flex flex-col justify-center items-center gap-24">
                <div>
                  <h1 className="text-6xl font-medium text-[#2B816E]">
                  Faça seu login
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
            )}
          </div>
        </main>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center flex-col gap-24">
          <h1 className="text-6xl font-medium text-[#2B816E]">
            VOCÊ JÁ TEM UM LOGIN ATIVO
          </h1>
          <Link href={"/"}>
            <button className="h-16 w-80 bg-[#A3D6CB] rounded-sm text-3xl font-semibold">
              ENTRAR
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
