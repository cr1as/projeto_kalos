"use client";

import { useEffect, useState } from "react";
import ToggleButton from "../Togglebutton";
import { MdClose } from "react-icons/md";

interface ViewProps {
  isOpen: boolean;
  onClose: () => void;
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
  procedimento?: string[];
  resultados?: string[];
  diagnostico?: string[];
  doencas?: string[];
}

const PopUpProntuario: React.FC<ViewProps> = ({
  isOpen,
  onClose,
  ativo,
  altura,
  genero,
  idade,
  nome,
  peso,
  telefone,
  medicacoes,
  procedimento,
  resultados,
  diagnostico,
  doencas,
  tipo
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [situacao, setSituacao] = useState(ativo ? true : false);
  const toggle = () => {
    setSituacao(!situacao);
  };

  useEffect(
    () => {
      if (isOpen) {
        setIsVisible(true);
        setTimeout(() => {
          setIsAnimating(true);
        }, 10);
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }
    },
    [isOpen]
  );

  return (
    <div>
      <div
        className={`fixed inset-0 z-0 flex items-center justify-center ${isVisible
          ? "block"
          : "hidden"}`}
        role="dialog"
        aria-labelledby="medical-record-title"
        aria-hidden={!isVisible}
      />
      <div
        className={`absolute inset-0 bg-black/15 transition-opacity duration-300 ease-in-out justify-center items-center flex ${isAnimating
          ? "opacity-100"
          : "opacity-0"}`}
        aria-hidden="true"
      >
        <article
          className={`relative h-[40rem] w-[70rem] overflow-auto bg-[#A3D6CB] border-2 rounded-[3px] border-[#114238] shadow-xl transition-transform duration-300 ease-in-out ${isAnimating
            ? ""
            : ""}`}
        >
          <section className="p-4 w-full h-full flex flex-col gap-2">
            <header className="flex flex-row w-full justify-between items-center">
              <section className="flex flex-row items-center w-1/2 gap-6 justify-between">
                <h2 className="text-5xl font-bold text-[#114238]">
                  {tipo}
                </h2>
                <div className="border-b border-2 border-[#1F6657] w-44" />
                <div className="flex gap-6 w-1/2 items-center">
                  <div className="w-1/2 flex justify-center text-3xl">
                    {situacao ? <p>Ativo</p> : <p>Inativo</p>}
                  </div>
                  <div className="w-1/2">
                    <ToggleButton ativo={situacao} toggleAtivo={toggle} />
                  </div>
                </div>
              </section>
              <button onClick={onClose} className="text-black">
                <MdClose size={40} />
              </button>
            </header>
            <main className="w-full h-full text-2xl text-black flex flex-col gap-4">
              <section
                className="flex gap-6 flex-col w-full text-2xl font-medium"
                id="infos do paciente"
              >
                <section>
                  <p>
                    Nome do Paciente: {nome}
                  </p>
                </section>
                <section className="grid grid-cols-2 gap-4">
                  <p>
                    Idade: {idade}
                  </p>
                  <p>
                    Genero: {genero}
                  </p>
                </section>
                <section className="grid grid-cols-3 gap-4">
                  <p>
                    Altura: {altura}
                  </p>
                  <p>
                    Peso: {peso}
                  </p>
                  <p>
                    Telefone: {telefone}
                  </p>
                </section>
              </section>
              <div className="border-b border-2 border-[#1F6657] w-full" />
              <section className="flex flex-col gap-8 w-full" id="exames">
                <h2 className="text-4xl font-medium text-[#114238]">
                  Exames Realizados
                </h2>
                <table className="w-full border-2 border-black bg-white">
                  <thead>
                    <tr>
                      <th className="w-1/2">Nome do procedimento</th>
                      <th className="w-1/2">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td className="w-1/2 border-2 border-black p-4">
                        {procedimento && procedimento.length > 0
                          ? procedimento.map(
                              item =>
                                item &&
                                <p key={item}>
                                  {item}
                                </p>
                            )
                          : <p>Sem procedimentos registrados...</p>}
                      </td>
                      <td className="w-1/2 border-2 border-black p-4">
                        {resultados && resultados.length > 0
                          ? resultados.map(
                              item =>
                                item &&
                                <p key={item}>
                                  {item}
                                </p>
                            )
                          : <p>Sem procedimentos registrados...</p>}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="border-b border-2 border-[#1F6657] w-full" />
                <section className="flex flex-col gap-8 w-full" id="exames">
                  <h2 className="text-4xl font-medium text-[#114238]">
                    Processos
                  </h2>
                  <table className="table-fixed border border-black bg-white w-full">
                    <colgroup>
                      <col className="w-1/4" />
                      <col className="w-1/4" />
                      <col className="w-2/4" />
                    </colgroup>
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-black p-2">Medicações</th>
                        <th className="border border-black p-2">Diagnóstico</th>
                        <th className="border border-black p-2">Doenças</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-4">
                          {medicacoes && medicacoes.length > 0
                            ? medicacoes.map(
                                (item, index) =>
                                  item &&
                                  <p key={index}>
                                    {item}
                                  </p>
                              )
                            : <p className="text-gray-500">
                                Nenhuma medicação registrada
                              </p>}
                        </td>

                        <td className="border border-black p-4">
                          {diagnostico && diagnostico.length > 0
                            ? diagnostico.map(
                                (item, index) =>
                                  item &&
                                  <p key={index}>
                                    {item}
                                  </p>
                              )
                            : <p className="text-gray-500">
                                Nenhuma medicação registrada
                              </p>}
                        </td>
                        <td className="border border-black p-4">
                          {doencas && doencas.length > 0
                            ? doencas.map(
                                (item, index) =>
                                  item &&
                                  <p key={index}>
                                    {item}
                                  </p>
                              )
                            : <p className="text-gray-500">
                                Nenhum diagnóstico registrado
                              </p>}
                        </td>
                        <td className="border border-black p-4">
                          <p className="text-gray-500">Informações ausentes</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </section>
            </main>
          </section>
        </article>
      </div>
    </div>
  );
};
export default PopUpProntuario;
