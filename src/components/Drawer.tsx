"use client";

import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import useAuthCookie from "@/hooks/cookies";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const componentes_drawer = [
  {
    rota: "/",
    nome_apresetacao: "Recém Acessados"
  },
  {
    rota: "/fichas",
    nome_apresetacao: "Fichas Médicas"
  },
  {
    rota: "/prontuarios",
    nome_apresetacao: "Prontuários"
  }
];

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const token = useAuthCookie();
  const deslogar = () => {
    token.removeAuthCookie();
    onClose();
  }
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
    <div className={`fixed inset-0 z-0 ${isVisible ? "block" : "hidden"}`}>
      <div
        className={`fixed inset-0 bg-gradient-to-r from-gray-950 via-gray-950/50 to-transparent transition-opacity duration-300 ease-in-out ${isAnimating
          ? "opacity-100"
          : "opacity-0"}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 flex flex-col h-full bg-[#A3D6CB] border-r-4 border-[#114238] shadow-xl transition-transform duration-300 ease-in-out w-[25rem] ${isAnimating
          ? "translate-x-0"
          : "-translate-x-full"}`}
      >
        <div className="p-4">
          <div className="flex w-full justify-end m-2">
            <button className="text-black" onClick={onClose}>
              <MdClose size={40} />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className=" h-full flex flex-col p-4 gap-12">
            {componentes_drawer.map(componente => {
              return (
                <li
                  key={componente.nome_apresetacao}
                  className="list-none flex items-center duration-200"
                >
                  <IoMdArrowDropright size={40} color="white" />
                  <a href={componente.rota}>
                    <p className="text-3xl">
                      {componente.nome_apresetacao}
                    </p>
                  </a>
                </li>
              );
            })}
          </div>
          
        </div>
        <div className="h-1/2">
          <div className="h-full flex flex-col justify-end items-center">
            <button onClick={deslogar} className="h-14 w-32 bg--500 flex items-center justify-center gap-8">
              <p className="text-2xl text-white">sair</p> <IoMdExit color="white" size={40}/> </button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Drawer;
