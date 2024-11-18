"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ToggleButton from "../Togglebutton";

interface CardCriacaoProps {
  isOpen: boolean;
  onClose: () => void;
}

const CardCriacao: React.FC<CardCriacaoProps> = ({ isOpen, onClose }) => {
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
  //! Função fantasma... num faz nada
  const toggle = () => {};
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
            <header className="w-full flex justify-between items-center gap-4">
              <article className="flex gap-8 items-center">
                <button className="text-black" onClick={onClose}>
                  <MdClose size={40} />
                </button>
                <h1 className="text-5xl text-[#114238]">PRONTUÁRIO</h1>
                <div className="border-b-2 border-[#207865] w-44" />
                <ToggleButton toggleAtivo={toggle} ativo={false} />
              </article>
              <button className="text-black" onClick={onClose}>
                <div>
                  <div className="bg-[#207865] w-44 h-12 rounded-full flex justify-center items-center text-white text-2xl">
                    Salvar
                  </div>
                </div>
              </button>
            </header>
            <article className="flex justify-around">
              <div className="w-11/12 flex flex-col ">
                <article className="flex flex-col">
                  <label className="text-xl font-normal">Nome: </label>
                  <input type="text" className="h-14 w-full" />
                </article>
                <article className="flex">
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Idade: </label>
                    <input type="text" className="h-14 w-11/12" />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Gênero: </label>
                    <input type="text" className="h-14 w-full" />
                  </div>
                </article>
                <article className="flex">
                  <div className="flex w-1/2">
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Peso: </label>
                      <input type="text" className="h-14 w-11/12" />
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Altura: </label>
                      <input type="text" className="h-14 w-11/12" />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Telefone: </label>
                    <input type="text" className="h-14 w-full" />
                  </div>
                </article>
              </div>
            </article>
            <article className="flex justify-around">
              <div className="w-11/12 flex flex-col ">
                <h2 className="text-3xl">Exames Realizados</h2>
                <article className="flex">
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">
                      Nome do procedimemto:{" "}
                    </label>
                    <input type="text" className="h-14 w-11/12" />
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-xl font-normal">Resultados: </label>
                    <input type="text" className="h-14 w-full" />
                  </div>
                </article>
                <article className="flex flex-col">
                  <h2 className="text-3xl">Processos</h2>
                  <div className="flex">
                    <div className="flex w-1/2">
                      <div className="w-1/2 flex flex-col">
                        <label className="text-xl font-normal">Medicações: </label>
                        <input type="text" className="h-14 w-11/12" />
                      </div>
                      <div className="w-1/2 flex flex-col">
                        <label className="text-xl font-normal">Diagnóstico: </label>
                        <input type="text" className="h-14 w-11/12" />
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col">
                      <label className="text-xl font-normal">Doenças: </label>
                      <input type="text" className="h-14 w-full" />
                    </div>
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
