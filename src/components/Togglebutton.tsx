"use client";

import React, { useState } from "react";

interface ToggleButtonProps {
  toggleAtivo: () => void;
  ativo: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ ativo, toggleAtivo }) => {
  const [situacao, setSituacao] = useState(ativo ? true : false);

  const toggle = () => {
    setSituacao(!situacao); 
    toggleAtivo();
  };

  return (
    <div
      onClick={toggle}
      className={`w-16 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${situacao
        ? "bg-green-500"
        : "bg-red-500"}`}
    >
      <div
        className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300 ${situacao
          ? "translate-x-10"
          : ""}`}
      />
      <span
        className={`absolute text-red-300 font-bold text-sm transition-all duration-300 select-none ${situacao
          ? "ml-2"
          : "ml-8"}`}
      >
        {situacao ? "" : ""}
      </span>
    </div>
  );
};
export default ToggleButton;
