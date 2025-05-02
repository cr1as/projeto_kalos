"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface cardEdicaoProps {
  isOpen: boolean;
  onClose: () => void;
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

const CardEdicao: React.FC<cardEdicaoProps> = ({
  isOpen,
  onClose,
  nome,
  idade,
  genero,
  telefone,
  peso,
  altura,
  medicacoes,
  procedimento,
  resultados,
  diagnostico,
  doencas
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

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
        }, 10);
      }
    },
    [isOpen]
  );

  return (
    <div
      className={`fixed inset-0 z-0 flex items-center justify-center ${isVisible
        ? "block"
        : "hidden"}`}
    >
      <div
        className={`absolute inset-0  bg-white/50 transition-opacity duration-300 ease-in-out ${isAnimating
          ? "opacity-100"
          : "opacity-0"}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={`relative h-[40rem] overflow-auto w-[80rem] bg-[#A3D6CB]  border-2 rounded-[3px] border-[#114238] shadow-xl transition-transform duration-300 ease-in-out ${isAnimating
          ? ""
          : ""}`}
      >
        <div className="p-4 w-full h-full ">
          <div className="w-full h-full overflow-auto">
            <header className="w-full flex justify-between items-center gap-4">
              <article className="flex gap-4">
                <button className="text-black" onClick={onClose}>
                  <MdClose size={40} />
                </button>
                <h1 className="text-5xl text-[#114238]">PRONTUÁRIO</h1>
              </article>

              <button className="text-black" onClick={onClose}>
                <div>
                  <div className="bg-[#207865] w-44 h-12 rounded-full flex justify-center items-center text-white text-2xl">
                    Cadastrar
                  </div>
                </div>
              </button>
            </header>
            <article className="flex justify-center text-black">
              <div className="w-11/12 flex flex-col ">
                <article className="flex flex-col">
                  <label className="text-xl font-normal">Nome</label>
                  <input
                    type="text"
                    className="h-14 w-full"
                    placeholder={nome}
                  />
                </article>
                <article className="flex">
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Idade</label>
                    <input
                      type="text"
                      className="h-14 w-11/12"
                      placeholder={idade}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Gênero</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      placeholder={genero}
                    />
                  </div>
                </article>
                <article className="flex">
                  <div className="flex w-1/2">
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Peso</label>
                      <input
                        type="text"
                        className="h-14 w-11/12"
                        placeholder={peso}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Altura</label>
                      <input
                        type="text"
                        className="h-14 w-11/12"
                        placeholder={altura}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Telefone</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      placeholder={telefone}
                    />
                  </div>
                </article>

                {/*
                ! - - - - - - - - - -
                */}
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
    <tr>
      <td className="border-2 border-black p-4">
        {/* Coluna de Procedimento */}
        <div className="flex flex-col space-y-2">
          {procedimento && procedimento.length > 0
            ? procedimento.map((item, index) => (
                item && (
                  <input
                    key={index}
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder={item}
                  />
                )
              ))
            : <p>Sem procedimentos registrados...</p>}
        </div>
      </td>
      <td className="border-2 border-black p-4">
        {/* Coluna de Resultados */}
        <div className="flex flex-col space-y-2">
          {resultados && resultados.length > 0
            ? resultados.map((item, index) => (
                item && (
                  <input
                    key={index}
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder={item}
                  />
                )
              ))
            : <p>Sem resultados registrados...</p>}
        </div>
      </td>
    </tr>
  </tbody>
</table>

                  {/*
                ! - - - - - - - - - -
                */}
                  <div className="border-b border-2 border-[#1F6657] w-full" />
                  <section className="flex flex-col gap-8 w-full" id="exames">
                    <h2 className="text-4xl font-medium text-[#114238]">
                      Processos
                    </h2>
                    <table className="w-full border-2 border-black bg-white">
  <thead>
    <tr>
      <th className="w-1/4">Medicações</th>
      <th className="w-1/4">Diagnóstico</th>
      <th className="w-2/4">Doenças</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-2 border-black p-4">
        {/* Coluna de Medicações */}
        <div className="flex flex-col space-y-2">
          {medicacoes && medicacoes.length > 0
            ? medicacoes.map((item, index) => (
                item && (
                  <input
                    key={index}
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder={item}
                  />
                )
              ))
            : <p className="text-gray-500">Nenhuma medicação registrada</p>}
        </div>
      </td>
      <td className="border-2 border-black p-4">
        {/* Coluna de Diagnóstico */}
        <div className="flex flex-col space-y-2">
          {diagnostico && diagnostico.length > 0
            ? diagnostico.map((item, index) => (
                item && (
                  <input
                    key={index}
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder={item}
                  />
                )
              ))
            : <p className="text-gray-500">Nenhum diagnóstico registrado</p>}
        </div>
      </td>
      <td className="border-2 border-black p-4">
        {/* Coluna de Doenças */}
        <div className="flex flex-col space-y-2">
          {doencas && doencas.length > 0
            ? doencas.map((item, index) => (
                item && (
                  <input
                    key={index}
                    className="p-2 border border-gray-400 rounded-md"
                    placeholder={item}
                  />
                )
              ))
            : <p className="text-gray-500">Nenhuma doença registrada</p>}
        </div>
      </td>
    </tr>
  </tbody>
</table>


                  </section>
                </section>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEdicao;
