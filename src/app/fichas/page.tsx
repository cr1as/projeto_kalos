"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainLayout from "@/ui/layouts/MainLayout";
import PreviewCard from "@/ui/cards/CardPreview";
import useAuthCookie from "@/lib/hooks/cookies";
import { pacientes } from "@/lib/mock/registros";

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

const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Verificando autenticação..." }) => (
  <div className="h-screen w-screen flex items-center justify-center">
    <p className="text-xl text-gray-500">{message}</p>
  </div>
);

const NoAuthFallback: React.FC = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
    <h1 className="text-5xl font-semibold text-[#2B816E]">Você precisa fazer login</h1>
    <Link href="/login">
      <a className="px-8 py-4 bg-[#A3D6CB] text-white text-2xl rounded shadow">Login</a>
    </Link>
  </div>
);

const PatientListPage: React.FC = () => {
  const { getAuthCookie } = useAuthCookie();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth once on mount
  useEffect(() => {
    (async () => {
      const token = await getAuthCookie();
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    })();
  }, [getAuthCookie]);

  // Redirect if not authenticated after loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const prontuarios = useMemo(() => {
    return pacientes.filter(p => p.tipo === "Ficha Médica");
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) return <NoAuthFallback />;

  return (
    <MainLayout nav="Fichas Médicas">
      <div className="py-8 px-4">
        {prontuarios.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Nenhuma ficha médica encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prontuarios.map(prontuario => (
              <PreviewCard
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
                especificacoesAdicionais={prontuario.especificacoesAdicionais}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PatientListPage;