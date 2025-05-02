"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/ui/layouts/MainLayout";
import PreviewCard from "@/ui/cards/CardPreview";
import useAuthCookie from "@/lib/hooks/cookies";
import { pacientes } from "@/lib/mock/registros";

interface Paciente {
  uid: number;
  tipo: string;
  nome: string;
  idade: string;
  genero: string;
  telefone: string;
  peso: string;
  altura: string;
  especificacoesAdicionais: string;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
  ativo: boolean;
  medicacoes: string[];
  diagnostico: string[];
  procedimento: string[];
  resultados: string[];
  doencas: string[];
}

// Spinner de loading genérico
const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Verificando autenticação..." }) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <p className="text-xl text-gray-500">{message}</p>
  </div>
);

// Fallback para usuário não autenticado
const NoAuthFallback: React.FC = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <p className="text-3xl font-semibold text-[#2B816E]">Você precisa estar logado para ver esta página.</p>
    <button
      onClick={() => (window.location.href = "/login")}
      className="px-8 py-4 bg-[#A3D6CB] text-white text-2xl rounded shadow"
    >
      Fazer Login
    </button>
  </div>
);

const ProntuariosPage: React.FC = () => {
  const { getAuthCookie } = useAuthCookie();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Checar autenticação
  useEffect(() => {
    (async () => {
      const token = await getAuthCookie();
      setIsAuthenticated(!!token);
      setIsLoading(false);
      if (!token) router.replace("/login");
    })();
  }, [getAuthCookie, router]);

  // Filtra e mapeia registros garantindo tipo Paciente
  const prontuarios: Paciente[] = useMemo(() => {
    return pacientes
      .filter(p => p.tipo === "Prontuário")
      .map(p => ({ ...p, ativo: false } as Paciente));
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <NoAuthFallback />;

  return (
    <MainLayout nav="Prontuários">
      <div className="py-8 px-4">
        {prontuarios.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Nenhum prontuário encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prontuarios.map(prontuario => (
              <PreviewCard
                key={prontuario.uid}
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
                ativo={prontuario.ativo}
                medicacoes={prontuario.medicacoes}
                diagnostico={prontuario.diagnostico}
                procedimento={prontuario.procedimento}
                resultados={prontuario.resultados}
                doencas={prontuario.doencas}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProntuariosPage;