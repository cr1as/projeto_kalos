"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface CardCriacaoProps {
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
}

const CardCriacao: React.FC<CardCriacaoProps> = ({
  isOpen,
  onClose,
  nome,
  idade,
  genero,
  telefone,
  peso,
  altura,
  especificacoesAdicionais,
  rua,
  numero,
  cidade,
  bairro
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
        className={`absolute inset-0 bg-white/50 transition-opacity duration-300 ease-in-out ${isAnimating
          ? "opacity-100"
          : "opacity-0"}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={`relative h-11/12 w-[80rem] bg-[#A3D6CB]  border-2 rounded-[3px] border-[#114238] shadow-xl transition-transform duration-300 ease-in-out ${isAnimating
          ? ""
          : ""}`}
      >
        <div className="p-4 w-full h-full">
          <div className="w-full h-full ">
            <nav className="w-full flex justify-between items-center gap-4">
              <article className="flex gap-4">
                <button className="text-black" onClick={onClose}>
                  <MdClose size={40} />
                </button>
                <h1 className="text-5xl text-[#114238]">FICHA MÉDICA</h1>
              </article>

              <button className="text-black" onClick={onClose}>
                <div>
                  <div className="bg-[#207865] w-44 h-12 rounded-full flex justify-center items-center text-white text-2xl">
                    Cadastrar
                  </div>
                </div>
              </button>
            </nav>
            <article className="flex justify-center">
              <div className="w-11/12 flex flex-col ">
                <article className="flex flex-col">
                  <label className="text-xl font-normal">Nome</label>
                  <input type="text" className="h-14 w-full" content={nome} />
                </article>
                <article className="flex">
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Idade</label>
                    <input
                      type="text"
                      className="h-14 w-11/12"
                      content={idade}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Gênero</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      content={genero}
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
                        content={peso}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Altura</label>
                      <input
                        type="text"
                        className="h-14 w-11/12"
                        content={altura}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Telefone</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      content={telefone}
                    />
                  </div>
                </article>
                <article>
                  <h2 className="text-3xl font-medium my-4">Endereço</h2>
                </article>
                <article className="flex">
                  <div className="w-3/4 flex flex-col">
                    <label className="text-xl font-normal">Rua</label>
                    <input type="text" className="h-14 w-11/12" content={rua} />
                  </div>
                  <div className="w-1/4 flex flex-col">
                    <label className="text-xl font-normal">Número</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      content={numero}
                    />
                  </div>
                </article>
                <article className="flex">
                  <div className="w-2/3 flex flex-col">
                    <label className="text-xl font-normal">Cidade</label>
                    <input
                      type="text"
                      className="h-14 w-11/12"
                      content={cidade}
                    />
                  </div>
                  <div className="w-1/3 flex flex-col">
                    <label className="text-xl font-normal">Bairro</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      content={bairro}
                    />
                  </div>
                  <div />
                </article>
                <article>
                  <div className="w-full">
                    <label className="text-xl font-normal">Observações</label>
                    <input
                      type="text"
                      className="h-14 w-full"
                      content={especificacoesAdicionais}
                    />
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCriacao;
