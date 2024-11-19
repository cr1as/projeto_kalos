/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Preview from "@/components/cards/CardPreview";
import MainLayout from "@/components/layouts/MainLayout";
import useAuthCookie from "@/hooks/cookies";
import { pacientes } from "@/mock/registros";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    const registrosFiltrados = pacientes
      .filter(registro => registro.tipo === "Prontuário")
      .map(registro => ({
        ...registro,
        ativo: registro.ativo && false,
      }));

    setProntuarios(registrosFiltrados as Paciente[]);
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router, token]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl text-gray-500">Verificando autenticação...</p>
      </div>
    );
  }

  return (

        <MainLayout nav="Prontuários">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 gap-10 justify-items-center">
          {prontuarios.map(prontuario => (
            <Preview
            key={prontuario.uid} 
            diagnostico={prontuario.diagnostico}
            procedimento={prontuario.procedimento}
            resultados={prontuario.resultados}
            doencas={prontuario.doencas}
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
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
