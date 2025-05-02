"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";
import ToggleButton from "../components/Togglebutton";

// Dados do formulário de edição de prontuário
export interface ProntuarioEditData {
  nome: string;
  idade: number;
  genero: string;
  telefone: string;
  peso: number;
  altura: number;
  ativo: boolean;
  procedimento: string[];
  resultados: string[];
  medicacoes: string[];
  diagnostico: string[];
  doencas: string[];
}

interface CardEdicaoProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProntuarioEditData;
  onSave: (data: ProntuarioEditData) => void;
}

const CardEdicaoProntuario: React.FC<CardEdicaoProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [visible, setVisible] = useState(isOpen);
  const [animating, setAnimating] = useState(false);
  const [form, setForm] = useState<ProntuarioEditData>(initialData);

  // Controle de abertura/fechamento com animação
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

  // Sincroniza valores iniciais ao abrir
  useEffect(() => {
    if (isOpen) setForm(initialData);
  }, [initialData, isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: keyof ProntuarioEditData) => {
    const { name, value, type } = e.target;
    setForm(prev => {
      // Arrays de strings
      if (field && typeof index === 'number') {
        const arr = [...(prev[field] as string[])];
        arr[index] = value;
        return { ...prev, [field]: arr } as ProntuarioEditData;
      }
      // Outros campos
      return ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      } as unknown as ProntuarioEditData);
    });
  }, []);

  const handleToggle = useCallback(() => {
    setForm(prev => ({ ...prev, ativo: !prev.ativo }));
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
        aria-labelledby="edicao-prontuario-title"
        className={`relative bg-[#A3D6CB] rounded-lg shadow-lg w-full max-w-5xl p-6 transform transition-transform duration-300 ${animating ? 'scale-100' : 'scale-95'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-6 overflow-auto max-h-[90vh]">
          <header className="flex items-center justify-between">
            <h2 id="edicao-prontuario-title" className="text-3xl font-semibold text-[#114238]">Editar Prontuário</h2>
            <button type="button" onClick={onClose} aria-label="Fechar modal" className="text-black hover:text-gray-700">
              <MdClose size={28} />
            </button>
          </header>

          {/* Informações básicas e toggle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['nome','idade','genero','telefone','peso','altura'].map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-lg font-medium text-gray-800 capitalize">{key}</label>
                <input
                  id={key}
                  name={key}
                  type={['idade','peso','altura'].includes(key) ? 'number' : 'text'}
                  value={(form as any)[key]}
                  onChange={handleChange as any}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#207865]"
                  required
                />
              </div>
            ))}
            <div className="flex flex-col items-center py-4">
              <label className="text-lg font-medium text-gray-800 mb-2">Ativo</label>
              <ToggleButton ativo={form.ativo} onToggle={handleToggle} />
            </div>
          </div>

          {/* Tabelas de procedimentos, resultados etc */}
          {(['procedimento','resultados','medicacoes','diagnostico','doencas'] as (keyof ProntuarioEditData)[]).map((field) => (
            <section key={field} className="space-y-2">
              <h3 className="text-2xl font-medium text-[#114238] capitalize">{field}</h3>
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="border p-2">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {(form[field] as string[]).map((item, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleChange(e, idx, field)}
                          className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#207865]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}

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

export default CardEdicaoProntuario;