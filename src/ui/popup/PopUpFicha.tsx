"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MdClose } from "react-icons/md";

export interface ViewFichaProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: string;
  nome: string;
  idade: string;
  genero: string;
  telefone: string;
  peso: string;
  altura: string;
  especificacoesAdicionais?: string;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
}

const ViewFicha: React.FC<ViewFichaProps> = ({
  isOpen,
  onClose,
  tipo,
  nome,
  idade,
  genero,
  altura,
  peso,
  telefone,
  rua,
  numero,
  cidade,
  bairro,
  especificacoesAdicionais,
}) => {
  const [visible, setVisible] = useState(isOpen);
  const [animating, setAnimating] = useState(false);

  // Sync modal visibility
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

  const handleClose = useCallback(() => {
    setAnimating(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${animating ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-ficha-title"
        className={`relative bg-[#A3D6CB] rounded-lg shadow-lg w-full max-w-3xl transform transition-transform duration-300 overflow-hidden ${animating ? 'scale-100' : 'scale-95'}`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 id="view-ficha-title" className="text-3xl font-semibold text-[#114238]">
            {tipo}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Fechar"
            className="text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207865]"
          >
            <MdClose size={28} />
          </button>
        </header>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] text-lg text-gray-800">
          {/* Dados Pessoais */}
          <section className="space-y-2">
            <h3 className="text-2xl font-medium text-[#114238]">Dados do Paciente</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {[
                ['Nome', nome],
                ['Idade', idade],
                ['Gênero', genero],
                ['Altura', `${altura}`],
                ['Peso', `${peso}`],
                ['Telefone', telefone],
              ].map(([label, value]) => (
                <React.Fragment key={label as string}>
                  <dt className="font-medium">{label}</dt>
                  <dd>{value || '—'}</dd>
                </React.Fragment>
              ))}
            </dl>
          </section>

          {/* Endereço */}
          <section className="space-y-2">
            <h3 className="text-2xl font-medium text-[#114238]">Endereço</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {[
                ['Cidade', cidade],
                ['Bairro', bairro],
                ['Rua', rua],
                ['Número', numero],
              ].map(([label, value]) => (
                <React.Fragment key={label as string}>
                  <dt className="font-medium">{label}</dt>
                  <dd>{value || '—'}</dd>
                </React.Fragment>
              ))}
            </dl>
          </section>

          {/* Observações */}
          <section className="space-y-2">
            <h3 className="text-2xl font-medium text-[#114238]">Observações</h3>
            <div className="p-4 bg-white rounded shadow-inner h-32 overflow-auto">
              {especificacoesAdicionais ? (
                <p>{especificacoesAdicionais}</p>
              ) : (
                <p className="text-gray-500">Nenhuma observação fornecida.</p>
              )}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ViewFicha;
