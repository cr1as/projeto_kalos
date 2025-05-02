"use client"
import { useCallback, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import PopUpProntuario from "../popup/PopUpProntuario";
import PopUpFicha from "../popup/PopUpFicha";
import EdicaoFicha from "../edit/EdicaoFicha";
import EdicaoProntuario from "../edit/EdicaoProntuario";

//! PROPS
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
  medicacoes?: string[];
  diagnostico?: string[];
  procedimento?: string[];
  resultados?: string[];
  doencas?: string[];
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
  diagnostico,
  medicacoes,
  procedimento,
  resultados,
  doencas,
}) => {
  //! VARIÁVEIS DO COMPONENTE
  const [isActived, setActived] = useState("");
  const isAtivoPresent = ativo !== undefined;

  //! FUNÇÕES DO COMPONENTE
  useEffect(() => {
    if (isAtivoPresent) {
      setActived(ativo ? "Ativo" : "Inativo");
    }
  }, [ativo, isAtivoPresent]);

  //! VARIÁVEIS DO MODAL
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);

  //!FUNÇÕES DO MODAL
  const openView = useCallback(() => setView(true), []);
  const closeView = useCallback(() => setView(false), []);
  const openEdit = useCallback(() => setEdit(true), []);
  const closeEdit = useCallback(() => setEdit(false), []);

  //!RENDER
  return (
    <article className="border-[1px] rounded-[3px] gap-4 border-[#207865] w-[42rem] h-56 bg-[#A3D6CB] duration-300 hover:shadow-lg shadow-black p-4 flex flex-row">
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
                <div className="h-full border-l-[3px] border-[#1F6657]" />
              </>
            )}
            <button
              className="h-14 w-14 bg-transparent hover:bg-[#1F6657]/50 duration-200 rounded-full flex justify-center items-center"
              onClick={openView}
              aria-label="Visualizar detalhes"
            >
              <BsEye color="#114238" size={40} />
            </button>
            {view && (
              tipo === "Prontuário" ? (
                <PopUpProntuario
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
                  ativo={ativo}
                  medicacoes={medicacoes}
                  diagnostico={diagnostico}
                  procedimento={procedimento}
                  resultados={resultados}
                  doencas={doencas}
                />
              ) : (
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
              )
            )}
            <div className="h-full border-l-[3px] border-[#1F6657]" />
            <div
              className="h-14 w-14 bg-transparent hover:bg-[#1F6657]/50 duration-200 rounded-full flex justify-center items-center"
              aria-label="Editar detalhes"
              onClick={openEdit}
            >
              <RiEditBoxLine color="#114238" size={40} />
            </div>
            {edit && (
              tipo === "Prontuário" ? (
                <EdicaoProntuario
                  altura={altura}
                  peso={peso}
                  telefone={telefone}
                  rua={rua}
                  numero={numero}
                  cidade={cidade}
                  bairro={bairro}
                  especificacoesAdicionais={especificacoesAdicionais}
                  isOpen={edit}
                  onClose={closeEdit}
                  nome={nome}
                  idade={idade}
                  genero={genero}
                  diagnostico={diagnostico}
                  medicacoes={medicacoes}
                  procedimento={procedimento}
                  resultados={resultados}
                  doencas={doencas}
                />
              ) : (
                <EdicaoFicha
                  altura={altura}
                  peso={peso}
                  telefone={telefone}
                  rua={rua}
                  numero={numero}
                  cidade={cidade}
                  bairro={bairro}
                  especificacoesAdicionais={especificacoesAdicionais}
                  isOpen={edit}
                  onClose={closeEdit}
                  nome={nome}
                  idade={idade}
                  genero={genero}
                />
              )
            )}
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