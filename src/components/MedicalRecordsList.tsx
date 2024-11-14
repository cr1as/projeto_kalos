"use client";

import { useState } from "react";
import ViewMedicalRecord from "./ViewCard";

interface MedicalRecordsListProps {
  tipo: string;
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
}

const MedicalRecordsList: React.FC<MedicalRecordsListProps> = ({
  tipo,
  nome,
  idade,
  genero,
  altura,
  telefone,
  peso,
  especificacoesAdicionais,
  rua,
  numero,
  cidade,
  bairro
}) => {
  const [view, setView] = useState(false);
  const openView = () => {
    setView(true);
  };

  return (
    <div onClick={openView} className="text-start">
      <div className="border-[1px] rounded-[3px] gap-4 border-[#207865] w-[23.625rem] h-56 bg-[#A3D6CB] duration-300 hover:shadow-lg shadow-black p-4">
        <p className={`text-[#1F6657] text-3xl`}>
          {tipo}
        </p>
        <div className={`flex flex-col gap-2`}>
          <p>
            Nome: {nome}
          </p>
          <p>
            Gênero: {genero}
          </p>
          <p>
            Idade: {idade}
          </p>
          <p>
            Altura: {altura}
          </p>
        </div>
      </div>
      <ViewMedicalRecord
        tipo={"FICHA MÉDICA"}
        altura={altura}
        peso={peso}
        telefone={telefone}
        rua={rua}
        numero={numero}
        cidade={cidade}
        bairro={bairro}
        especificacoesAdicionais={especificacoesAdicionais}
        isOpen={view}
        onClose={() => setView(false)}
        nome={nome}
        idade={idade}
        genero={genero}
      />
    </div>
  );
};
export default MedicalRecordsList;
