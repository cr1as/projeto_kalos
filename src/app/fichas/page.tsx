/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import MainLayout from  "@/ui/layouts/MainLayout";
import { pacientes } from "@/lib/mock/registros";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthCookie from "@/lib/hooks/cookies";
import { useRouter } from "next/navigation";
import Preview from "@/ui/cards/CardPreview";

interface Paciente {
  nome: string;
  idade: string;
  genero: string;
  telefone: string;
  peso: string;
  altura: string;
  especificacoesAdicionais?: string;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
  tipo: string;
  ativo?: boolean;
}

const page: React.FC = () => {
  const [prontuarios, setProntuarios] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useAuthCookie();
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const auth = await token.getAuthCookie();
      setIsAuthenticated(!!auth);
      setIsLoading(false);
    };

    checkToken();
  }, [token]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    setProntuarios(
      pacientes.filter(registro => registro.tipo === "Ficha Médica")
    );
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl text-gray-500">Verificando autenticação...</p>
      </div>
    );
  }
  

  return (
    <div>
      {!isAuthenticated
        ? <div className="h-screen w-screen flex justify-center items-center flex-col gap-24">
            <h1 className="text-6xl font-medium text-[#2B816E]">
              VOCÊ AINDA NÃO TEM LOGIN!
            </h1>
            <Link href={"/login"}>
              <button className="h-16 w-80 bg-[#A3D6CB] rounded-sm text-3xl font-semibold">
                LOGIN
              </button>
            </Link>
          </div>
        : <MainLayout nav="Fichas Médica">
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-2 gap-10 justify-items-center">
                {prontuarios.map(prontuario => {
                  return (
                    <Preview
                      key={prontuario.nome}
                      tipo={prontuario.tipo}
                      nome={prontuario.nome}
                      genero={prontuario.genero}
                      idade={prontuario.idade}
                      altura={prontuario.altura}
                      peso={prontuario.peso}
                      telefone={prontuario.telefone}
                      cidade={prontuario.cidade}
                      bairro={prontuario.bairro}
                      rua={prontuario.rua}
                      numero={prontuario.numero}
                      especificacoesAdicionais={
                        prontuario.especificacoesAdicionais
                      }
                    />
                  );
                })}
              </div>
            </div>
          </MainLayout>}
    </div>
  );
};
export default page;
