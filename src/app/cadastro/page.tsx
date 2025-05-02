"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthCookie from "@/lib/hooks/cookies";
import useVerify from "@/lib/hooks/verificacao";

// Componente de loading centralizado
const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Verificando autenticação..." }) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <p className="text-xl text-gray-500">{message}</p>
  </div>
);

// Promoção lateral com link para cadastro
const PromoSection: React.FC = () => (
  <aside className="w-1/3 h-screen bg-[#A3D6CB] flex flex-col items-center justify-center space-y-12 p-8">
    <div className="text-center space-y-4">
      <h3 className="text-4xl font-medium text-[#0A5546]">Bem-vindo ao Sistema Hospitalar</h3>
      <p className="text-3xl font-medium text-white">Faça seu cadastro ou efetue o login</p>
    </div>
    <Link href="/login">
      <button className="inline-block bg-white border border-[#114238] text-black font-medium text-3xl px-12 py-4 rounded shadow">
        Login
      </button>
    </Link>
  </aside>
);

// Formulário de registro
const RegisterForm: React.FC<{ onSubmit: (u: string, p: string) => void }> = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(credentials.username.trim(), credentials.password);
  };

  return (
    <section className="w-2/3 h-screen bg-[#F1FFFC] flex flex-col items-center justify-center space-y-16">
      <h1 className="text-6xl font-medium text-[#2B816E]">Crie sua conta</h1>
      <form onSubmit={submit} className="w-full max-w-xl flex flex-col items-center space-y-8">
        <input
          name="username"
          type="text"
          placeholder="Usuário"
          value={credentials.username}
          onChange={handleChange}
          required
          className="w-full p-6 text-3xl font-medium border-2 border-[#3C3C3C] rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full p-6 text-3xl font-medium border-2 border-[#3C3C3C] rounded"
        />
        <button
          type="submit"
          className="w-56 h-20 bg-[#A3D6CB] border border-[#114238] text-white font-medium text-3xl rounded shadow"
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
};

// Página de Registro
const RegisterPage: React.FC = () => {
  const { getAuthCookie, setAuthCookie } = useAuthCookie();
  const { createAcount } = useVerify();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Checa autenticação no mount
  useEffect(() => {
    (async () => {
      const token = await getAuthCookie();
      if (token) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    })();
  }, [getAuthCookie, router]);

  // Lida com registro de usuário
  const handleRegister = async (username: string, password: string) => {
    // supondo que useVerify retorna 'register' que retorna boolean
    if (createAcount(username)) {
      await setAuthCookie();
      router.replace("/");
    } else {
      alert("Usuário já existente ou registro falhou!");
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="flex h-screen w-screen">
      <PromoSection />
      <RegisterForm onSubmit={handleRegister} />
    </main>
  );
};

export default RegisterPage;
