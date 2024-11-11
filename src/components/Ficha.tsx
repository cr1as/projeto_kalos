import { Fira_Sans_Extra_Condensed } from "next/font/google";

interface RegistroCardProps {
    tipo: string;
    nome_paciente: string;
    data_nascimento: string;
    cpf: string;
    rg: string;
}

const fira_medium = Fira_Sans_Extra_Condensed({
    subsets: ["latin"],
    display: "swap",
    weight: "500",
    style: "normal"
  });
  
  const fira_regular = Fira_Sans_Extra_Condensed({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    style: "normal"
  });
  


const RegistroCard: React.FC<RegistroCardProps> = ({cpf, data_nascimento,nome_paciente,rg,tipo}) => {
    return (
        <div className={`border-[1px] rounded-[3px] gap-4 border-[#207865] w-[42rem] h-56 bg-[#A3D6CB] hover:scale-105 duration-300 cursor-pointer hover:shadow-lg shadow-black p-4 flex flex-row ${fira_regular.className}`}>
            <div className={`flex flex-col gap-2 w-1/2`}>
            <p className={`${fira_medium.className} text-[#1F6657] text-3xl`}>{tipo}</p>
            <p className="text-2xl">{nome_paciente}</p>
            <p className="text-2xl">Data de nascimento: {data_nascimento}</p>
            <p className="text-2xl">CPF: {cpf}</p>
            <p className="text-2xl">RG: {rg}</p>
            </div>
            <div className="w-1/2 flex flex-col text-white justify-end ">
            <p className="text-2xl">{"Criado em: xx/xx/xxxx"}</p>
            <p className="text-2xl">{"Modificado em: xx/xx/xxxx"}</p>

            </div>
        </div>
    )
}
export default RegistroCard;