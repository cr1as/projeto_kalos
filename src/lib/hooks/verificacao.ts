import { funcionarios } from "@/lib/mock/funcionarios";

interface UseVerify {
  login: (usuario: string, senha: string) => boolean;
  createAcount: (usuario: string) => boolean;
}

const useVerify = (): UseVerify => {
  const login = (usuario: string, senha: string) => {
    let verificado = false;

    funcionarios.forEach(funcionario => {
      if (funcionario.usuario === usuario && funcionario.senha === senha) {
        verificado = true;
      }
    });
    return verificado;
  };

  const createAcount = (usuario: string) => {
    let existe = true;
    funcionarios.forEach(funcionario => {
      if (funcionario.usuario === usuario) {
        existe = false;
      }
    });
    return existe;
  };
  return { login, createAcount };
};

export default useVerify;
