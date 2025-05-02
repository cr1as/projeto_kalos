"use client";

import React, { FC } from "react";

interface ToggleButtonProps {
  ativo: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ ativo, onToggle }) => {
  const isActive = ativo;

  return (
    <>
      <button
        aria-pressed={isActive}
        onClick={onToggle}
        title={isActive ? "Active" : "Inactive"}
        className={`relative inline-flex items-center w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <span
          className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
            isActive ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </button>
    </>
  );
};

export default ToggleButton;
