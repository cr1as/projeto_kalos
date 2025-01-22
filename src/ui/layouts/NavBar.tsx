"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import searchIcon from "@/icons/search_icon.svg";
import { FaSquarePlus } from "react-icons/fa6";
import CriacaoFicha from "../create/CriacaoFicha";
import CriacaoProntuario from "../create/CriacaoProntuario";
import { MdOutlineMenu } from "react-icons/md";
import Drawer from "../components/Drawer";
interface navBarProps {
  nome: string;
}

const NavBar: React.FC<navBarProps> = ({ nome }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [criar, setCriar] = useState(false);
  const [type, setType] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const criarProntuario = () => {
    setCriar(true);
  };

  const fecharProntuario = () => {
    setCriar(false);
  };

  useEffect(() => {
    if (nome === "Prontuários") setType(true);
    else setType(false);
    return () => {
      closeDrawer();
    };
  }, [nome]);

  const Render: React.FC = () => {
    return type ? (
      <CriacaoProntuario isOpen={criar} onClose={fecharProntuario} />
    ) : (
      <CriacaoFicha isOpen={criar} onClose={fecharProntuario} />
    );
  };

  return (
    <header className="w-full h-28 flex flex-row bg-[#F1FFFC]">
      <div className="w-1/2 h-full flex">
        <div className="w-1/4 h-full flex justify-center items-center">
          <button onClick={openDrawer}>
          <MdOutlineMenu size={40}/>
          </button>
        </div>
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
        <div className="w-3/4 h-full flex items-center gap-2">
          <Link href="/">
            <h1 className={`font-bold text-5xl text-[#114238] `}>
              {nome}
            </h1>
          </Link>
          <div className="border-t border-2 border-[#1F6657] w-44" />
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-between">
        <button
          className="bg-[#A3D6CB] w-60 h-11 rounded-full flex justify-between p-2 items-center border-2 border-black"
          onClick={criarProntuario}
        >
          <p className="text-xl font-medium text-[#114238]">
            {`Criar nov${type ? "o Prontuário" : "a Ficha"}`}
          </p>
          <FaSquarePlus color="#114238" size={18} />
        </button>
        <Render />
        <div className="m-10 flex items-center border border-black rounded-full w-[25rem] overflow-hidden">
          <div className="p-2">
            <Image
              alt="search icon"
              src={searchIcon}
              width={35}
              height={35}
              className="text-[#114238]"
            />
          </div>
          <input
            type="text"
            placeholder={`Pesquisar ${nome}...`}
            className={`w-full p-2 text-center outline-none text-[#114238] bg-transparent`}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
