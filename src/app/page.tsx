"use client";

import MainLayout from "@/components/layouts/MainLayout";
import FichaRecentes from "@/components/cards/FichaRecentes";
import { pacientes } from "@/mock/registros";

const page: React.FC = () => { 

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
export default page;