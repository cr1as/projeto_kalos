/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import MainLayout from  "@/ui/layouts/MainLayout";
import FichaRecentes from "@/ui/cards/FichaRecentes";
import { pacientes } from "@/mock/registros";
import useAuthCookie from "@/hooks/cookies";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useAuthCookie();
  const router = useRouter();

  useEffect(
    () => {
      const checkToken = async () => {
        const auth = await token.getAuthCookie();
        setIsAuthenticated(!!auth);

        setIsLoading(false);
      };

      checkToken();
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    },
    [isAuthenticated, isLoading, router, token]
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-xl text-gray-500">Verificando autenticação...</p>
      </div>
    );
  }
  return (
    <MainLayout nav="Recém acessados">
      <div className="w-full flex justify-center">
        <div className="w-4/5 grid grid-cols-3 gap-10 justify-items-center">
          {pacientes.map(registro =>
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
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
