"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { IoMdArrowDropright, IoMdExit } from "react-icons/io";
import useAuthCookie from "@/lib/hooks/cookies";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", label: "Recém Acessados" },
  { href: "/fichas", label: "Fichas Médicas" },
  { href: "/prontuarios", label: "Prontuários" },
];

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(isOpen);
  const [animating, setAnimating] = useState(false);
  const { removeAuthCookie } = useAuthCookie();
  
  // Sync visibility and animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleSignOut = useCallback(() => {
    removeAuthCookie();
    onClose();
  }, [removeAuthCookie, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${animating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`relative bg-[#A3D6CB] w-64 max-w-full h-full shadow-xl transition-transform duration-300 ease-in-out ${animating ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar navigation"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-4 right-4 p-2 text-black hover:text-white focus:outline-none"
        >
          <MdClose size={24} />
        </button>

        {/* Navigation List */}
        <nav className="mt-16 flex flex-col space-y-4 px-6">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} onClick={onClose} className="flex items-center gap-2 text-2xl text-white hover:text-gray-200">
              <IoMdArrowDropright size={28} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div className="mt-auto mb-8 px-6">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-2xl text-white hover:text-gray-200 focus:outline-none"
          >
            <IoMdExit size={28} />
            Sair
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Drawer;
