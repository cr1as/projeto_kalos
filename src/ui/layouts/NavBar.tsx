"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import Drawer from "../components/Drawer";
import CriacaoFicha from "../create/CriacaoFicha";
import CriacaoProntuario from "../create/CriacaoProntuario";

interface NavBarProps {
  nome: string;
}

const NavBar: React.FC<NavBarProps> = ({ nome }) => {
  // Drawer state
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Create-modal state
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = useCallback(() => setCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setCreateModalOpen(false), []);

  // Determine which modal to show
  const isProntuario = useMemo(() => nome === "Prontuários", [nome]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Optionally, emit event or callback
  }, []);

  return (
    <nav className="w-full h-28 flex bg-[#F1FFFC] px-6">
      {/* Left: Menu and Title */}
      <div className="flex items-center w-1/2">
        <button
          onClick={openDrawer}
          aria-label="Abrir menu"
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207865]"
        >
          <MdOutlineMenu size={32} />
        </button>
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />

        <Link href="/">
          <button className="ml-4 flex items-center">
            <h1 className="font-bold text-5xl text-[#114238]">{nome}</h1>
            <div className="ml-2 border-t-2 border-[#1F6657] w-32" />
          </button>
        </Link>
      </div>

      {/* Right: Create and Search */}
      <div className="flex items-center justify-end w-1/2 space-x-6">
        {/* Create Button */}
        <button
          onClick={openCreateModal}
          aria-label={`Criar novo ${isProntuario ? "Prontuário" : "Ficha"}`}
          className="flex items-center bg-[#A3D6CB] text-[#114238] font-medium text-xl px-4 py-2 rounded-full border-2 border-black hover:bg-[#94c4b4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207865]"
        >
          <FaSquarePlus size={20} />
          <span className="ml-2">
            {`Criar nova ${isProntuario ? "Prontuário" : "Ficha"}`}
          </span>
        </button>

        {/* Create Modal */}
        {isCreateModalOpen && (
          isProntuario ? (
            <CriacaoProntuario isOpen onClose={closeCreateModal} />
          ) : (
            <CriacaoFicha isOpen onClose={closeCreateModal} />
          )
        )}

        {/* Search Input */}
        <div className="flex items-center border border-black rounded-full overflow-hidden">
          <IoSearch size={24} color="#207865" className="p-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={`Pesquisar ${nome}...`}
            className="w-64 p-2 outline-none text-[#114238]"
            aria-label={`Pesquisar ${nome}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;