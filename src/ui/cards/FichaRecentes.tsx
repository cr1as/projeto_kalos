"use client";

import { useState, useCallback } from "react";
import PopUpFicha from "../popup/PopUpFicha";

interface FichaRecentesProps {
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

const FichaRecentes: React.FC<FichaRecentesProps> = ({
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
  bairro,
}) => {
  const [view, setView] = useState(false);

  const openView = useCallback(() => setView(true), []);
  const closeView = useCallback(() => setView(false), []);

  return (
    <div className="text-start">
      <div
        role="button"
        aria-label={`Abrir detalhes de ${nome}`}
        onClick={openView}
        className="border-[1px] rounded-[3px] gap-4 border-[#207865] w-[23.625rem] h-56 bg-[#A3D6CB] duration-300 hover:shadow-lg shadow-black p-4 cursor-pointer"
      >
        <p className="text-[#1F6657] text-3xl">{tipo}</p>
        <div className="flex flex-col gap-2">
          <p>Nome: {nome}</p>
          <p>Gênero: {genero}</p>
          <p>Idade: {idade}</p>
          <p>Altura: {altura}</p>
        </div>
      </div>

      {view && (
        <PopUpFicha
          tipo={tipo}
          altura={altura}
          peso={peso}
          telefone={telefone}
          rua={rua}
          numero={numero}
          cidade={cidade}
          bairro={bairro}
          especificacoesAdicionais={especificacoesAdicionais}
          isOpen={view}
          onClose={closeView}
          nome={nome}
          idade={idade}
          genero={genero}
        />
      )}
    </div>
  );
};

export default FichaRecentes;