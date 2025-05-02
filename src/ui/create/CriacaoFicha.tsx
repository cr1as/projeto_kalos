"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";

interface CardCriacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
}

const fields = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'idade', label: 'Idade', type: 'number' },
  { name: 'genero', label: 'Gênero', type: 'text' },
  { name: 'peso', label: 'Peso (kg)', type: 'number' },
  { name: 'altura', label: 'Altura (m)', type: 'number' },
  { name: 'telefone', label: 'Telefone', type: 'tel' },
  { name: 'rua', label: 'Rua', type: 'text' },
  { name: 'numero', label: 'Número', type: 'text' },
  { name: 'cidade', label: 'Cidade', type: 'text' },
  { name: 'bairro', label: 'Bairro', type: 'text' },
  { name: 'observacoes', label: 'Observações', type: 'text' },
];

const CardCriacao: React.FC<CardCriacaoProps> = ({ isOpen, onClose, onSubmit }) => {
  const [visible, setVisible] = useState(isOpen);
  const [animating, setAnimating] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Sync open/close animations
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${animating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative bg-[#A3D6CB] rounded-lg shadow-lg w-full max-w-4xl transition-transform duration-300 ease-in-out transform ${animating ? 'scale-100' : 'scale-95'}`}
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <header className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-[#114238]">Criar Ficha Médica</h2>
            <button type="button" onClick={onClose} aria-label="Fechar" className="text-black hover:text-gray-700">
              <MdClose size={28} />
            </button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ name, label, type }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="text-lg font-medium text-gray-800">{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#207865]"
                />
              </div>
            ))}
          </div>

          <footer className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-lg font-medium text-white bg-[#207865] rounded hover:bg-[#1a6b57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#145a43]"
            >
              Cadastrar
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CardCriacao;
