"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";
import ToggleButton from "../components/Togglebutton";

interface CardCriacaoProntuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProntuarioFormData) => void;
}

export interface ProntuarioFormData {
  nome: string;
  idade: number;
  genero: string;
  peso: number;
  altura: number;
  telefone: string;
  ativo: boolean;
  procedimento: string;
  resultados: string;
  medicacoes: string;
  diagnostico: string;
  doencas: string;
}

const initialData: ProntuarioFormData = {
  nome: "",
  idade: 0,
  genero: "",
  peso: 0,
  altura: 0,
  telefone: "",
  ativo: false,
  procedimento: "",
  resultados: "",
  medicacoes: "",
  diagnostico: "",
  doencas: "",
};

const CardCriacaoProntuario: React.FC<CardCriacaoProntuarioProps> = ({ isOpen, onClose, onSave }) => {
  const [visible, setVisible] = useState(isOpen);
  const [anim, setAnim] = useState(false);
  const [form, setForm] = useState<ProntuarioFormData>(initialData);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnim(true));
    } else {
      setAnim(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'ativo' ? prev.ativo : e.target.type === 'number' ? Number(value) : value }));
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
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${anim ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative bg-[#A3D6CB] rounded-lg shadow-lg w-full max-w-4xl p-6 transition-transform duration-300 ${anim ? 'scale-100' : 'scale-95'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <header className="flex items-center justify-between">
            <h2 id="dialog-title" className="text-3xl font-semibold text-[#114238]">Novo Prontuário</h2>
            <button type="button" onClick={onClose} aria-label="Fechar" className="text-black hover:text-gray-700">
              <MdClose size={28} />
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="nome" className="text-lg">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="idade" className="text-lg">Idade</label>
                <input
                  id="idade"
                  name="idade"
                  type="number"
                  min={0}
                  required
                  value={form.idade}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="genero" className="text-lg">Gênero</label>
                <input
                  id="genero"
                  name="genero"
                  type="text"
                  required
                  value={form.genero}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="peso" className="text-lg">Peso (kg)</label>
                <input
                  id="peso"
                  name="peso"
                  type="number"
                  step="0.1"
                  required
                  value={form.peso}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="altura" className="text-lg">Altura (m)</label>
                <input
                  id="altura"
                  name="altura"
                  type="number"
                  step="0.01"
                  required
                  value={form.altura}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="telefone" className="text-lg">Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded focus:ring-[#207865]"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-lg mb-2">Ativo</label>
              <ToggleButton ativo={form.ativo} onToggle={handleToggle} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="procedimento" className="text-lg">Procedimento Realizado</label>
              <input
                id="procedimento"
                name="procedimento"
                type="text"
                required
                value={form.procedimento}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:ring-[#207865]"
              />
            </div>
            <div>
              <label htmlFor="resultados" className="text-lg">Resultados</label>
              <input
                id="resultados"
                name="resultados"
                type="text"
                required
                value={form.resultados}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:ring-[#207865]"
              />
            </div>
            <div>
              <label htmlFor="medicacoes" className="text-lg">Medicações</label>
              <input
                id="medicacoes"
                name="medicacoes"
                type="text"
                required
                value={form.medicacoes}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:ring-[#207865]"
              />
            </div>
            <div>
              <label htmlFor="diagnostico" className="text-lg">Diagnóstico</label>
              <input
                id="diagnostico"
                name="diagnostico"
                type="text"
                required
                value={form.diagnostico}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:ring-[#207865]"
              />
            </div>
            <div>
              <label htmlFor="doencas" className="text-lg">Doenças</label>
              <input
                id="doencas"
                name="doencas"
                type="text"
                required
                value={form.doencas}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded focus:ring-[#207865]"
              />
            </div>
          </div>

          <footer className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border rounded hover:bg-gray-100"
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

export default CardCriacaoProntuario;