"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MdClose } from "react-icons/md";

interface EdicaoFichaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FichaFormData) => void;
  initialData: FichaFormData;
}

export interface FichaFormData {
  nome: string;
  idade: number;
  genero: string;
  telefone: string;
  peso: number;
  altura: number;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
  observacoes?: string;
}

const EdicaoFicha: React.FC<EdicaoFichaProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [visible, setVisible] = useState(isOpen);
  const [animating, setAnimating] = useState(false);
  const [form, setForm] = useState<FichaFormData>(initialData);

  // Sync open/close with animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset form when initialData changes
  useEffect(() => {
    if (isOpen) setForm(initialData);
  }, [initialData, isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    } as unknown as FichaFormData));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  }, [form, onSave]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${animating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edicao-ficha-title"
        className={`relative bg-[#A3D6CB] rounded-lg shadow-xl w-full max-w-4xl transform transition-transform duration-300 ${animating ? 'scale-100' : 'scale-95'}`}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <header className="flex items-center justify-between">
            <h2 id="edicao-ficha-title" className="text-3xl font-semibold text-[#114238]">Editar Ficha Médica</h2>
            <button type="button" onClick={onClose} aria-label="Fechar modal" className="text-black hover:text-gray-700">
              <MdClose size={28} />
            </button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(form).map(([key, value]) => {
              // Skip observacoes field label logic
              const label = key === 'observacoes' ? 'Observações' : key.charAt(0).toUpperCase() + key.slice(1);
              const type = key === 'idade' || key === 'peso' || key === 'altura' ? 'number' : 'text';

              return (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="text-lg font-medium text-gray-800">{label}</label>
                  <input
                    id={key}
                    name={key}
                    type={type}
                    value={value as any}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#207865]"
                  />
                </div>
              );
            })}
          </div>

          <footer className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#207865] text-white rounded hover:bg-[#1a6b57] focus:ring-2 focus:ring-offset-2 focus:ring-[#145a43]"
            >
              Salvar
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EdicaoFicha;