/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Preview from "@/components/preview/PreviewFichas";
import MainLayout from "@/components/layouts/MainLayout";
import { pacientes } from "@/mock/registros";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setProntuarios(
      pacientes.filter(registro => registro.tipo === "Prontuário")
    );
  }, []);

  return (
    <MainLayout nav="Prontuários">
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
                especificacoesAdicionais={prontuario.especificacoesAdicionais}
                ativo={prontuario.ativo}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};
export default page;
