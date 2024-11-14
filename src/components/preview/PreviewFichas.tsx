import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import View from "../ViewCard";

interface PreviewProps {
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
  ativo?: boolean;
}

const Preview: React.FC<PreviewProps> = ({
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
  ativo,
}) => {
  const [isActived, setActived] = useState("");
  const [view, setView] = useState(false);

  // Variável auxiliar que verifica se 'ativo' está definido
  const isAtivoPresent = ativo !== undefined;

  useEffect(() => {
    if (isAtivoPresent) {
      setActived(ativo ? "Ativo" : "Inativo");
    }
  }, [ativo, isAtivoPresent]);

  const openView = () => {
    setView(true);
  };

  return (
    <article
      className="border-[1px] rounded-[3px] gap-4 border-[#207865] w-[42rem] h-56 bg-[#A3D6CB] duration-300 hover:shadow-lg shadow-black p-4 flex flex-row"
    >
      <section className="flex flex-col gap-2 w-1/2">
        <p className="text-[#1F6657] text-3xl">{tipo}</p>
        <p className="text-2xl">Nome: {nome}</p>
        <p className="text-2xl">Gênero: {genero}</p>
        <p className="text-2xl">Idade: {idade}</p>
        <p className="text-2xl">Altura: {altura}</p>
      </section>
      <section className="w-1/2 h-full flex flex-col text-white">
        <header className="h-1/2 flex justify-end">
          <div className="flex h-10 w-full items-center justify-between">
            {isAtivoPresent && (
              <>
                {ativo ? (
                  <p className="flex text-2xl gap-2">
                    Status: <span className="text-[#159646]"> {isActived} </span>
                  </p>
                ) : (
                  <p className="flex text-2xl gap-2">
                    Status: <span className="text-[#962E15]"> {isActived} </span>
                  </p>
                )}
              </>
            )}
            <div className="h-full border-l-[3px] border-[#1F6657]" />
            <button
              className="h-14 w-14 bg-transparent hover:bg-[#1F6657]/50 duration-200 rounded-full flex justify-center items-center"
              onClick={openView}
              aria-label="Visualizar detalhes"
            >
              <BsEye color="#114238" size={40} />
            </button>
            {view && (
              <View
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
            )}
            <div className="h-full border-l-[3px] border-[#1F6657]" />
            <button
              className="h-14 w-14 bg-transparent hover:bg-[#1F6657]/50 duration-200 rounded-full flex justify-center items-center"
              aria-label="Editar detalhes"
            >
              <RiEditBoxLine color="#114238" size={40} />
            </button>
          </div>
        </header>
        <footer className="h-1/2 flex flex-col justify-end">
          <p className="text-2xl">{"Criado em: xx/xx/xxxx"}</p>
          <p className="text-2xl">{"Modificado em: xx/xx/xxxx"}</p>
        </footer>
      </section>
    </article>
  );
};

export default Preview;
