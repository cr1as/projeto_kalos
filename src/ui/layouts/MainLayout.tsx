"use client";

import React, { useState } from "react";
import NavBar from "./NavBar";
import Drawer from "../components/Drawer";


interface MainLayoutProps {
  nav: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ nav, children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <button
            onClick={handleDrawerOpen}
            aria-label="Abrir menu"
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207865]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <NavBar nome={nav} />
          <div className="w-6" /> {/* placeholder for spacing */}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
