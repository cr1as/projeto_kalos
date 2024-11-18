/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import FichaRecentes from "@/components/cards/FichaRecentes";
import { pacientes } from "@/mock/registros";
import useAuthCookie from "@/hooks/cookies";
import Link from "next/link";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const token = useAuthCookie();

  useEffect(() => {
    const checkToken = async () => {
      const auth = await token.getAuthCookie();
      setIsAuthenticated(!!auth); 
      setIsLoading(false); 
    };

    checkToken();
  }, [token]);

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
        <div className="h-screen w-screen flex justify-center items-center flex-col gap-24">
          <h1 className="text-6xl font-medium text-[#2B816E]">
            VOCÊ AINDA NÃO TEM LOGIN!
          </h1>
          <Link href={"/login"}>
            <button className="h-16 w-80 bg-[#A3D6CB] rounded-sm text-3xl font-semibold">
              LOGIN
            </button>
          </Link>
        </div>
      ) : (
        <MainLayout nav="Recém acessados">
          <div className="w-full flex justify-center">
            <div className="w-4/5 grid grid-cols-3 gap-10 justify-items-center">
              {pacientes.map((registro) => (
                <FichaRecentes
                  key={registro.nome}
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
          </div>
        </MainLayout>
      )}
    </div>
  );
};

export default Page;
