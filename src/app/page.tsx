"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/ui/layouts/MainLayout";
import FichaRecentes from "@/ui/cards/FichaRecentes";
import useAuthCookie from "@/lib/hooks/cookies";
import { pacientes } from "@/lib/mock/registros";

// Componente de loading padrão
const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Verificando autenticação..." }) => (
  <div className="flex h-screen w-screen items-center justify-center">
    <p className="text-xl text-gray-500">{message}</p>
  </div>
);

// Fallback para não autenticados
const NoAuthFallback: React.FC = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <p className="text-3xl font-semibold text-[#2B816E]">É preciso fazer login para acessar.</p>
    <button
      className="px-8 py-4 bg-[#A3D6CB] text-white text-2xl rounded shadow"
      onClick={() => window.location.replace("/login")}
    >
      Fazer Login
    </button>
  </div>
);

// Seção de Fichas Recentes
const RecentsSection: React.FC = () => {
  const recentList = useMemo(() => pacientes, []);

  if (recentList.length === 0) {
    return <p className="text-center text-xl text-gray-600">Nenhuma ficha recente.</p>;
  }

  return (
    <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {recentList.map(registro => (
        <FichaRecentes
          key={registro.uid ?? registro.nome}
          tipo={registro.tipo}
          nome={registro.nome}
          genero={registro.genero}
          idade={registro.idade}
          altura={registro.altura}
          peso={registro.peso}
          telefone={registro.telefone}
          cidade={registro.cidade}
          bairro={registro.bairro}
          rua={registro.rua}
          numero={registro.numero}
          especificacoesAdicionais={registro.especificacoesAdicionais}
        />
      ))}
    </div>
  );
};

const RecentsPage: React.FC = () => {
  const { getAuthCookie } = useAuthCookie();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  // Checar autenticação ao montar
  useEffect(() => {
    (async () => {
      const token = await getAuthCookie();
      setAuth(!!token);
      setLoading(false);
      if (!token) router.replace("/login");
    })();
  }, [getAuthCookie, router]);

  if (loading) return <LoadingScreen />;
  if (!auth) return <NoAuthFallback />;

  return (
    <MainLayout nav="Recém acessados">
      <div className="flex justify-center py-8">
        <RecentsSection />
      </div>
    </MainLayout>
  );
};

export default RecentsPage;
