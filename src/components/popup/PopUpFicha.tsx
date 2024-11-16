"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";


interface ViewProps {
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

const ViewFichaRecentes: React.FC<ViewProps> = ({
  isOpen,
  onClose,
  tipo,
  altura,
  bairro,
  cidade,
  genero,
  idade,
  nome,
  numero,
  peso,
  rua,
  telefone,
  especificacoesAdicionais
}) => {


  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);


  useEffect(
    () => {
      if (isOpen) {
        setIsVisible(true);
        setTimeout(() => {
          setIsAnimating(true);
        }, 10);
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }
    },
    [isOpen]
  );

  return (
    <div>
      <div
        className={`fixed inset-0 z-0 flex items-center justify-center ${isVisible
          ? "block"
          : "hidden"}`}
        role="dialog"
        aria-labelledby="medical-record-title"
        aria-hidden={!isVisible}
      />
      <div
        className={`absolute inset-0 bg-black/15 transition-opacity duration-300 ease-in-out justify-center items-center flex ${isAnimating
          ? "opacity-100"
          : "opacity-0"}`}
        aria-hidden="true"
      >
        <article
          className={`relative h-[40rem] w-[70rem] overflow-auto bg-[#A3D6CB] border-2 rounded-[3px] border-[#114238] shadow-xl transition-transform duration-300 ease-in-out ${isAnimating
            ? ""
            : ""}`}
        >
        <section className="p-8 w-full h-full">
          <header className="w-full">
            <nav className="flex h-12 w-full justify-between items-center">
              <h1
                className="text-5xl font-bold text-[#114238]"
              >
                TESTE{tipo}
              </h1>
              <button
  onClick={() => {
    console.log("Fechar popup");
    onClose();
  }}
  className="text-black"
>
  <MdClose size={40} />
</button>

            </nav>
          </header>
          <main className="w-full h-full text-2xl text-black">
            <section className="my-6">
              <div className="text-4xl ">
                <p>
                  <strong>Nome do paciente:</strong> {nome}
                </p>
                <p>
                  <strong>Idade:</strong> {idade}
                </p>
                <p>
                  <strong>Gênero:</strong> {genero}
                </p>
                <p>
                  <strong>Altura:</strong> {altura}
                </p>
                <p>
                  <strong>Peso:</strong> {peso}
                </p>
                <p>
                  <strong>Telefone:</strong> {telefone}
                </p>
              </div>
            </section>

            <div className="w-full border-b border-black my-4" />

            <section>
              <h2 className="text-4xl font-bold text-[#114238]">Endereço</h2>
              <div className="text-4xl grid grid-cols-2 gap-4 my-6">
                <p>
                  <strong>Cidade:</strong> {cidade}
                </p>
                <p>
                  <strong>Bairro:</strong> {bairro}
                </p>
                <p>
                  <strong>Rua:</strong> {rua}
                </p>
                <p>
                  <strong>Número:</strong> {numero}
                </p>
              </div>
            </section>

            <div className="w-full border-b border-black my-4" />

            <section>
              <h2 className=" text-[#114238] text-4xl font-bold">Observações do paciente:</h2>
              <div className="h-16 bg-white p-4 my-5 shadow-xl border-2 border-black/50">
              {especificacoesAdicionais ?
                <p>
                  {especificacoesAdicionais}
                </p>
                :
                <>
                </>
                }
                </div>
            </section>
          </main>
        </section>
      </article>
    </div>
    </div>
  );
};

export default ViewFichaRecentes;
