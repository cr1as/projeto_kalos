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
        <div className="border-[1px] rounded-[3px] gap-4 border-[#207865] w-[23.625rem] h-56 bg-[#A3D6CB] hover:scale-105 duration-300 cursor-pointer hover:shadow-lg shadow-black p-4">
            <p className={`${fira_medium.className} text-[#1F6657] text-3xl`}>{tipo}</p>
            <div className={`flex flex-col gap-2 ${fira_regular.className}`}>
            <p>{nome_paciente}</p>
            <p>Data de nascimento: {data_nascimento}</p>
            <p>CPF: {cpf}</p>
            <p>RG: {rg}</p>
            </div>
        </div>
    )
}
export default RegistroCard;